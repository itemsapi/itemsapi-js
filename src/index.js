/*
 * Author: Mateusz Rzepa
 * Copyright: 2015-2020, ItemsAPI
 */
const AxiosWrapper = require('./axios');
const axios = require('axios');

class Index extends AxiosWrapper {

  constructor(config) {
    super(config);
  }

  search(data) {

    data.facets_fields = data.facets_fields ? data.facets_fields.join(',') : undefined;
    data.filters = data.filters ? JSON.stringify(data.filters) : undefined;
    data.not_filters = data.not_filters ? JSON.stringify(data.not_filters) : undefined;

    return this.instance.get('/search', {
      params: data
    })
  }

  addItems(data) {
    return this.instance.post('/items', data);
  }

  //addItemsFromFile(data) {
    //return this.instance.post('/index', data);
  //}

  reset() {
    return this.instance.post('/reset');
  }

  getConfig() {
    return this.instance.get('/configuration');
  }

  updateConfig(data) {
    return this.instance.post('/configuration', data);
  }
}

module.exports = Index;
