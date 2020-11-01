/*
 * Author: Mateusz Rzepa
 * Copyright: 2015-2020, ItemsAPI
 */
const AxiosWrapper = require('./axios');
const axios = require('axios');

class Index extends AxiosWrapper {

  constructor(name, config) {
    super(config);
    this.name = name;
  }

  search(data) {

    data.facets_fields = data.facets_fields ? data.facets_fields.join(',') : undefined;
    return this.instance.post(`/${this.name}/search`, data)
  }

  facet(data) {

    return this.instance.get(`/${this.name}/facet`, {
      params: data
    })
  }

  aggregation(data) {
    return this.facet(data);
  }

  addItems(data) {
    return this.instance({
      method: 'post',
      url: `/${this.name}/items`,
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
  }

  getItem(id) {
    return this.instance.get(`/${this.name}/items/${id}`);
  }

  updateItem(id, data) {
    return this.instance.post(`/${this.name}/items/${id}/update`, data);
  }

  partialUpdateItem(id, data) {
    return this.instance.post(`/${this.name}/items/${id}/partial`, data);
  }

  deleteItem(id) {
    return this.instance.delete(`/${this.name}/items/${id}`);
  }

  //addItemsFromFile(data) {
    //return this.instance.post('/index', data);
  //}

  reset() {
    return this.instance.post(`/${this.name}/reset`);
  }

  getConfig() {
    return this.instance.get(`/${this.name}/configuration`);
  }

  updateConfig(data) {
    return this.instance.post(`/${this.name}/configuration`, data);
  }
}

module.exports = Index;
