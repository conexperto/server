import { v4 } from 'uuid';
import { BackofficePlanId } from '../BackofficePlanId';

export class BackofficeMethodIdFixture {
  static create(value: string): BackofficePlanId {
    return new BackofficePlanId(value);
  }

  static random(): BackofficePlanId {
    return this.create(v4());
  }
}
