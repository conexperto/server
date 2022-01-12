import { Injectable } from '@nestjs/common';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeSQLiteAdminRepository } from '../../infrastructure/persistence/BackofficeSQLiteAdminRepository';

@Injectable()
export class BackofficeAdminDeleter {
  constructor(
    private readonly repository: BackofficeSQLiteAdminRepository,
  ) {}

  async run(adminId: BackofficeAdminId[]): Promise<void> {
    const ids = adminId.map((obj) => obj.value);
    await this.repository.remove(ids);
  }
}
