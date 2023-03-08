import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBudgetService } from './category-budget.service';

describe('CategoryBudgetService', () => {
  let service: CategoryBudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryBudgetService],
    }).compile();

    service = module.get<CategoryBudgetService>(CategoryBudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
