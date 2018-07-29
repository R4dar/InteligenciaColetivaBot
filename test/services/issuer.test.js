const assert = require('assert');
const app = require('../../src/app');

describe('\'issuer\' service', () => {
  it('registered the service', () => {
    const service = app.service('issuer');

    assert.ok(service, 'Registered the service');
  });
});
