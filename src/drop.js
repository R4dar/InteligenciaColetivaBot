const logger = require('winston');

class Drop {
  constructor (service) {
    this.service = service;
  }

  findAll (fn) {
    let service = this.service;
    return service.find({}).then((res) => {
      if(res.total > 0) {
        return Promise.all(res.data.map(item => {
          if (fn(item)){
            logger.debug('Removing Object '+item._id);
            return service.remove({ _id: item._id });
          }
        }));
      }
    });
  }
}

module.exports = function(service, fn) {
  const drop = new Drop(service);
  return drop.findAll(function(item){
    return fn(item);
  });
};
