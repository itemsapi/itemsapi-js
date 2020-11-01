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
    host: 'http://127.0.0.1:3000',
    // if needed
    api_key: 'keykey135'
  })

  const index = client.getIndex(name);

  let response = await index.updateConfig(config);
  response = await index.addItems(items);
  response = await index.search({
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

`await index.search(input)`

- List filters for specific facet:

`await index.facet(input)`

### Index 

- Get index object:

`client.getIndex(name)`

### Items

- Add items:

`await index.addItems(items)`

- Get item:

`await index.getItem(id)`

- Update item partially:

`await index.partialUpdateItem(id, data)`

- Update item:

`await index.updateItem(id, data)`

- Delete item:

`await index.deleteItem(id)`


### Configuration

- Get configuration:

`await index.getConfig()`

- Update configuration:

`await index.updateConfig(config)`

