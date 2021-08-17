require('dotenv').config();
import { AulaClient } from '../src';

describe('login', () => {
  let client: AulaClient;

  beforeEach(() => {
    client = new AulaClient(process.env.USERNAME!, process.env.PASSWORD!);
  });

  it('should be able to log in', async () => {
    await client.login();
    await client.request({
      method: 'presence.getDailyOverview',
      childIds: client.childIds,
    });
  });
});
