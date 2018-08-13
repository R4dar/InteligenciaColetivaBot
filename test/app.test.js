// eslint-disable no-unused-vars
const rp = require('request-promise');
const url = require('url');
const app = require('../src/app');
require('should');

const port = app.get('port') || 3000;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('Feathers application tests', () => {
  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  describe('Public pages of API', () => {
    it('starts and shows the index page', () => {
      return rp({ url: getUrl('/'), headers: { 'Accept': 'text/html' }}).then(res => {
        res.should.be.ok();
      });
    });

    it('starts and shows the swagger page', () => {
      return rp({ url: getUrl('/swagger'), headers: { 'Accept': 'text/html' }}).then(res => {
        res.should.be.ok();
      });
    });
  });
});
