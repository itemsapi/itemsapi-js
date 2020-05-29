/*
 * Author: Mateusz Rzepa
 * Copyright: 2015-2020, ItemsAPI
 */
const axios = require('axios');

class AxiosWrapper {

  constructor(config) {
    this.instance = axios.create({
      baseURL: config.host
    });

    this.instance.interceptors.response.use((response) => response.data);
  }
}

module.exports = AxiosWrapper;
