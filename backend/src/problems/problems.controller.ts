import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { TenantGuard } from '../authentication/guards/tenant.guard';
import { AdminGuard } from '../authentication/guards/admin.guard';

@Controller('problems')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  async create(@Req() req, @Body() body) {
    console.log('body', body);

    const createProblemDto = new CreateProblemDto(
      body.problemDepartment,
      body.subject,
      body.description,
      body.photoDisplayURL,
      body.createdAt,
    );

    createProblemDto.tenant = (
      await this.usersService.findOne(req.user.username)
    ).tenant; // Hardcode TEST TEST TEST

    return this.problemsService.create(createProblemDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll(@Request() req: any) {
    console.log('user in controller', req.user);

    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }
}
