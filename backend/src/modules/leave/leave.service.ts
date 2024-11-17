import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { LeaveStatus, UserRole } from '@prisma/client';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createLeaveDto: CreateLeaveDto) {
    const startDate = new Date(createLeaveDto.startDate);
    const endDate = new Date(createLeaveDto.endDate);

    await this.validateLeaveRequest(userId, startDate, endDate);

    return this.prisma.leave.create({
      data: {
        ...createLeaveDto,
        startDate,
        endDate,
        userId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(userId: number, userRole: UserRole) {
    if (userRole === UserRole.ADMIN) {
      return this.prisma.leave.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return this.prisma.leave.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number, userId: number, userRole: UserRole) {
    const leave = await this.prisma.leave.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }

    if (userRole !== UserRole.ADMIN && leave.userId !== userId) {
      throw new BadRequestException('You can only view your own leaves');
    }

    return leave;
  }

  async update(
    id: number,
    userId: number,
    userRole: UserRole,
    updateLeaveDto: UpdateLeaveDto,
  ) {
    const leave = await this.findOne(id, userId, userRole);

    if (updateLeaveDto.startDate || updateLeaveDto.endDate) {
      await this.validateLeaveRequest(
        userId,
        new Date(updateLeaveDto.startDate || leave.startDate),
        new Date(updateLeaveDto.endDate || leave.endDate),
      );
    }

    return this.prisma.leave.update({
      where: { id },
      data: updateLeaveDto,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number, userRole: UserRole) {
    await this.findOne(id, userId, userRole);
    await this.prisma.leave.delete({ where: { id } });
  }

  async getLeaveSummary(userId: number) {
    const year = new Date().getFullYear();
    const yearStart = new Date(Date.UTC(year, 0, 1));
    const yearEnd = new Date(Date.UTC(year, 11, 31));

    const leaves = await this.prisma.leave.findMany({
      where: {
        userId,
        status: LeaveStatus.APPROVED,
        startDate: {
          gte: yearStart,
        },
        endDate: {
          lte: yearEnd,
        },
      },
    });

    const totalDays = leaves.reduce((acc, leave) => {
      const days =
        Math.ceil(
          (new Date(leave.endDate).getTime() -
            new Date(leave.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;
      return acc + days;
    }, 0);

    return {
      totalLeaveBalance: 12,
      leavesUsed: totalDays,
      remainingLeaves: 12 - totalDays,
      leaveHistory: leaves,
    };
  }

  private async validateLeaveRequest(
    userId: number,
    startDate: Date,
    endDate: Date,
  ) {
    if (startDate > endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    if (startDate < new Date()) {
      throw new BadRequestException(
        'Cannot create leave request for past dates',
      );
    }

    const year = startDate.getFullYear();
    const yearStart = new Date(Date.UTC(year, 0, 1));
    const yearEnd = new Date(Date.UTC(year, 11, 31));

    const leavesInYear = await this.prisma.leave.findMany({
      where: {
        userId,
        status: LeaveStatus.APPROVED,
        startDate: {
          gte: yearStart,
        },
        endDate: {
          lte: yearEnd,
        },
      },
    });

    const totalDays = leavesInYear.reduce((acc, leave) => {
      const days =
        Math.ceil(
          (new Date(leave.endDate).getTime() -
            new Date(leave.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;
      return acc + days;
    }, 0);

    if (totalDays > 12) {
      throw new BadRequestException(
        'Exceeded maximum allowed leaves for the year',
      );
    }

    const month = startDate.getMonth();
    const monthStart = new Date(Date.UTC(year, month, 1));
    const monthEnd = new Date(Date.UTC(year, month + 1, 0));

    const leavesInMonth = await this.prisma.leave.count({
      where: {
        userId,
        status: LeaveStatus.APPROVED,
        startDate: {
          gte: monthStart,
        },
        endDate: {
          lte: monthEnd,
        },
      },
    });

    if (leavesInMonth > 0) {
      throw new BadRequestException(
        'Already have an approved leave in this month',
      );
    }
  }
}
