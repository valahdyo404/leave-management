import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('leaves')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  create(@CurrentUser('id') userId: number, @Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(userId, createLeaveDto);
  }

  @Get()
  findAll(@CurrentUser('id') userId: number, @CurrentUser('role') userRole: UserRole) {
    return this.leaveService.findAll(userId, userRole);
  }

  @Get('summary')
  getLeaveSummary(@CurrentUser('id') userId: number) {
    return this.leaveService.getLeaveSummary(userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser('id') userId: number,
    @CurrentUser('role') userRole: UserRole,
  ) {
    return this.leaveService.findOne(+id, userId, userRole);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser('id') userId: number,
    @CurrentUser('role') userRole: UserRole,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ) {
    return this.leaveService.update(+id, userId, userRole, updateLeaveDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: number,
    @CurrentUser('role') userRole: UserRole,
  ) {
    return this.leaveService.remove(+id, userId, userRole);
  }
}
