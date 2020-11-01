const assert = require('assert');

const ItemsAPI = require('../src/client');
const client = new ItemsAPI({
  host: 'http://127.0.0.1:3000',
  api_key: 'okay'
});

const INDEX_NAME = 'test_index';
const index = client.getIndex(INDEX_NAME);

const config = {
  sorting_fields: ['votes'],
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
  it('returns items sorted', async function() {

    let result = await index.reset();
    result = await index.updateConfig(config);

    result = await index.addItems(data);

    result = await index.partialUpdateItem(1, {
      votes: 99
    });

    result = await index.getItem(1);
    assert.deepEqual(result.votes, 99);

    result = await index.search({
      sort_field: 'votes',
      order: 'asc',
      per_page: 100
    });

    assert.deepEqual(result.pagination.total, 20);
    assert.deepEqual(result.data.items.length, 20);
    console.log(result.data.items.map(v => v.votes))
    assert.deepEqual(result.data.items[0].votes, 99);


  });
});
