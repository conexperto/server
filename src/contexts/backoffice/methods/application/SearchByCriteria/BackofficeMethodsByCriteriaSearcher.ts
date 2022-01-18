import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLiteMethodRepository } from '../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodsResponse } from '../BackofficeMethodsResponse';

@Injectable()
export class BackofficeMethodsByCriteriaSearcher {
  constructor(private readonly repository: BackofficeSQLiteMethodRepository) {}

  async run(
    filters: Filters,
    order?: Order,
    limit?: number,
    offset?: number,
  ): Promise<BackofficeMethodsResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const methods = await this.repository.find(criteria);

    return new BackofficeMethodsResponse(methods);
  }
}
