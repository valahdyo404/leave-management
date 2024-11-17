import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      role: UserRole.ADMIN,
    },
  });

  const employeePassword = await bcrypt.hash('employee123', 10);
  const john = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: employeePassword,
      dateOfBirth: new Date('1992-03-15'),
      gender: 'male',
      role: UserRole.EMPLOYEE,
    },
  });

  await prisma.leave.createMany({
    skipDuplicates: true,
    data: [
      {
        reason: 'Annual vacation',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-05'),
        status: 'APPROVED',
        userId: john.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
