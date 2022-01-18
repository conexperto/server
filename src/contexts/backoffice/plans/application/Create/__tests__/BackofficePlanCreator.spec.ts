import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Connection } from 'typeorm';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanCreator } from '../BackofficePlanCreator';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('BackofficePlanCreator', () => {
  let database: Connection;
  let creator: BackofficePlanCreator;

  beforeEach(async () => {
    let moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLitePlanRepository, BackofficePlanCreator],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    creator = moduleRef.get<BackofficePlanCreator>(BackofficePlanCreator);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    it('should create a plan', async () => {
      const mock = {
        planId: BackofficePlanIdFixture.random(),
        planPrice: BackofficePlanPriceFixture.random(),
        planDuration: BackofficePlanDurationFixture.random(),
        planCoin: BackofficePlanCoinFixture.random(),
      };
      await creator.run(mock);

      const result = await database.manager.findOne(PlanEntity, {
        id: mock.planId.value,
      });

      expect(result).not.toBeUndefined();
      expect(result.id).toBe(mock.planId.value);
    });
  });
});
