/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // update collection data
  unmarshal({
    "name": "employees"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // update collection data
  unmarshal({
    "name": "workers"
  }, collection)

  return app.save(collection)
})
