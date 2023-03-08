import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBudgetController } from './category-budget.controller';

describe('CategoryBudgetController', () => {
  let controller: CategoryBudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryBudgetController],
    }).compile();

    controller = module.get<CategoryBudgetController>(CategoryBudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
