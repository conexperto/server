import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Connection } from 'typeorm';
import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { BackofficeSQLiteAdminRepository } from '../../../infrastructure/persistence/BackofficeSQLiteAdminRepository';
import { BackofficeAdminCreator } from '../BackofficeAdminCreator';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('BackofficeAdminCreator', () => {
  let database: Connection;
  let creator: BackofficeAdminCreator;

  beforeEach(async () => {
    let moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteAdminRepository, BackofficeAdminCreator],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    creator = moduleRef.get<BackofficeAdminCreator>(BackofficeAdminCreator);
  });

  afterEach(async () => {
    await database.close();
  });

  it('should create a admin', async () => {
    const admin = {
      adminId: BackofficeAdminIdFixture.random(),
      adminEmail: BackofficeAdminEmailFixture.random(),
      adminDisplayName: BackofficeAdminDisplayNameFixture.random(),
      adminPhoneNumber: BackofficeAdminPhoneNumberFixture.random(),
      adminPhotoURL: BackofficeAdminPhotoURLFixture.random(),
      adminName: BackofficeAdminNameFixture.random(),
      adminLastname: BackofficeAdminLastnameFixture.random(),
      adminRole: BackofficeAdminRoleFixture.random(),
    };
    await creator.run(admin);

    const result = await database.manager.findOne(AdminEntity, {
      uid: admin.adminId.value,
    });

    expect(result).not.toBeUndefined();
    expect(result.uid).toBe(admin.adminId.value);
  });
});