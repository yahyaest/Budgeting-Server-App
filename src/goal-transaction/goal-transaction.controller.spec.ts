import { Test, TestingModule } from '@nestjs/testing';
import { GoalTransactionController } from './goal-transaction.controller';

describe('GoalTransactionController', () => {
  let controller: GoalTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalTransactionController],
    }).compile();

    controller = module.get<GoalTransactionController>(GoalTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
