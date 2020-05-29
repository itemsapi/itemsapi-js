# ItemsAPI Javascript 

Javascript client for ItemsAPI 2.0

## Installation

```sh
npm install itemsapi
```

### Run ItemsAPI

There are many easy ways to run ItemsAPI 2.0 server.

The simplest one is by using Docker:

```bash
docker run --privileged -it -p 3000:3000 itemsapi/itemsapi:latest
```

## Getting started

Here is a quickstart for a search request

```js
const ItemsAPI = require('itemsapi')
(async () => {
  const client = new ItemsAPI({
    host: 'http://127.0.0.1:3000'
  })

  const index = client.getIndex();

  let response = await index.updateConfig(config);
  response = await index.addItems(items);
  response = await await index.search({
    per_page: 3,
    filters: {
      tags: ['epic']
    },
    facets_fields: ['tags']
  });
  console.log(response);
})();
```


## API Resources

### Search 

- Make a search request:

`client.getIndex().search(input)`

### Index 

- Get index object:

`client.getIndex()`

### Items

- Add items:

`index.addItems()`

### Configuration

- Get configuration:

`index.getConfig()`

- Update configuration:

`index.updateConfig(config)`

