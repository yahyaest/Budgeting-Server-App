import { Test, TestingModule } from '@nestjs/testing';
import { GoalTransactionService } from './goal-transaction.service';

describe('GoalTransactionService', () => {
  let service: GoalTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalTransactionService],
    }).compile();

    service = module.get<GoalTransactionService>(GoalTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
