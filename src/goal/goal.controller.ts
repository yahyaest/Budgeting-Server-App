import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DataAccessGuard, JwtGuard } from 'src/auth/guard';
import { CreateGoalDto, UpdateGoalDto } from './dto';
import { GoalService } from './goal.service';
import { CustomRequest } from 'src/user/models/request.models';

@UseGuards(JwtGuard)
@Controller('api/goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getGoals(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role !== 'ADMIN') {
        query.userId = user.id;
      }
      return await this.goalService.getGoalsWithParams(query);
    } catch (error) {
      throw new HttpException('No Goals found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getGoal(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const goal = await this.goalService.getGoalById(id);
      if (!goal) {
        throw new Error('Goal not found');
      }

      if (user.id !== goal.userId && user.role !== 'ADMIN') {
        throw new Error('Goal belong to another user');
      }
      return goal;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addGoal(@Body() createGoalDto: CreateGoalDto) {
    try {
      return await this.goalService.addGoal(createGoalDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const goal = await this.goalService.getGoalById(id);

      if (!goal) {
        throw new Error('Goal not found');
      }

      if (user.id !== goal.userId && user.role !== 'ADMIN') {
        throw new Error('Goal belong to another user');
      }
      return await this.goalService.updateGoal(id, updateGoalDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteGoal(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const goal = await this.goalService.getGoalById(id);
      if (!goal) {
        throw new Error('Goal not found');
      }

      if (user.id !== goal.userId && user.role !== 'ADMIN') {
        throw new Error('Goal belong to another user');
      }
      return await this.goalService.removeGoal(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
