import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BudgetModule } from './budget/budget.module';
import { CategoryBudgetModule } from './category-budget/category-budget.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    CategoryModule,
    BudgetModule,
    CategoryBudgetModule,
    ImageModule,
  ],
})
export class AppModule {}
