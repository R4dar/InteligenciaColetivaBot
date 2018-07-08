const assert = require('assert');
const app = require('../../src/app');

describe('\'bot\' service', () => {
  it('registered the service', () => {
    const service = app.service('bot');

    assert.ok(service, 'Registered the service');
  });
});
