import * as faker from 'faker';
import { BackofficeAdminEmail } from '../BackofficeAdminEmail';

export class BackofficeAdminEmailMock {
  static create(value: string): BackofficeAdminEmail {
    return new BackofficeAdminEmail(value);
  }

  static random(): BackofficeAdminEmail {
    return this.create(faker.internet.email());
  }
}
