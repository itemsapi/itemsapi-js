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
    return this.instance.post('/search', data)
  }

  facet(data) {

    return this.instance.get('/facet', {
      params: data
    })
  }

  aggregation(data) {
    return this.facet(data);
  }

  addItems(data) {
    return this.instance({
      method: 'post',
      url: '/items',
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
  }

  getItem(id) {
    return this.instance.get(`/items/${id}`);
  }

  updateItem(id, data) {
    return this.instance.post(`/items/${id}/update`, data);
  }

  partialUpdateItem(id, data) {
    return this.instance.post(`/items/${id}/partial`, data);
  }

  deleteItem(id) {
    return this.instance.delete(`/items/${id}`);
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
