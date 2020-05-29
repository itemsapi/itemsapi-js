/*
 * Author: Mateusz Rzepa
 * Copyright: 2015-2020, ItemsAPI
 */
const AxiosWrapper = require('./axios');
const Index = require('./index');

class ItemsAPI extends AxiosWrapper {

  constructor(config) {
    super(config);
    this.config = config;
  }

  getIndex() {
    return new Index(this.config);
  }
}

module.exports = ItemsAPI;
