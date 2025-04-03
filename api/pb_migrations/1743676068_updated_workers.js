/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1177347317",
    "maxSelect": 1,
    "name": "position",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "obshtak",
      "maistor"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // remove field
  collection.fields.removeById("select1177347317")

  return app.save(collection)
})
