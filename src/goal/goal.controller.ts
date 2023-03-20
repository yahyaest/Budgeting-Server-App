import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateGoalDto, UpdateGoalDto } from './dto';
import { GoalService } from './goal.service';

@UseGuards(JwtGuard)
@Controller('api/goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('')
  async getGoals(@Query() query: Object) {
    try {
      return await this.goalService.getGoalsWithParams(query);
    } catch (error) {
      throw new HttpException('No Goals found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getGoal(@Param('id') id: string) {
    try {
      const goal = await this.goalService.getGoalById(id);
      if (!goal) {
        throw new Error('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addGoal(@Body() createGoalDto: CreateGoalDto) {
    try {
      return await this.goalService.addGoal(createGoalDto);
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    try {
      return await this.goalService.updateGoal(
        id,
        updateGoalDto,
      );
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteGoal(@Param('id') id: string) {
    try {
      const goal = await this.goalService.removeGoal(id);
      if (!goal) {
        throw new Error('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
  }
}
