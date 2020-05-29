const assert = require('assert');
const data = require('./fixtures/movies.json');

const ItemsAPI = require('../src/client');
const client = new ItemsAPI({
  host: 'http://127.0.0.1:3001'
});

const index = client.getIndex();

const config = {
  aggregations: {
    director: {
      conjunction: true
    },
    actors: {
      conjunction: true
    },
    tags: {
      conjunction: true
    },
    genres: {
      conjunction: true
    }
  }
}

describe('search', function() {
  it('should search items', async function() {

    let result = await index.reset();
    result = await index.updateConfig(config);

    result = await index.addItems(data);

    result = await index.search({
      per_page: 3,
      filters: {
        tags: ['epic']
      },
      facets_fields: ['tags']
    });
    console.log(result);

    result = await index.getConfig();
    console.log(result);
  });
});
