const assert = require('assert');


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

var data = require('./fixtures/movies.json');

var i = 1;
data = data.map(v => {
  v.id = i;
  ++i;
  return v;
})

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
    assert.deepEqual(result.pagination.total, 20);

    result = await index.getConfig();
    console.log(result);

    result = await index.facet({
      name: 'tags'
    });
    console.log(result.data);

    result = await index.getItem(1);
    assert.deepEqual(result.name, 'The Shawshank Redemption');

    result = await index.getItem(100);
    console.log('res');
    console.log(result);

    result = await index.deleteItem(3);
    result = await index.search({
    });
    assert.deepEqual(result.pagination.total, 19);

    result = await index.partialUpdateItem(1, {
      votes: 1000000
    });
    result = await index.getItem(1);
    assert.deepEqual(result.name, 'The Shawshank Redemption');
    assert.deepEqual(result.votes, 1000000);

    result = await index.updateItem(1, {
      id: 1,
      votes: 100
    });
    result = await index.getItem(1);
    assert.deepEqual(result.name, undefined);
    assert.deepEqual(result.votes, 100);
  });
});
