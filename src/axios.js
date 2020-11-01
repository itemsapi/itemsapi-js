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
    this.instance.interceptors.request.use(data => {
      data.params = {
        api_key: config.api_key,
        ...data.params,
      };
      return data;
    });
  }
}

module.exports = AxiosWrapper;
