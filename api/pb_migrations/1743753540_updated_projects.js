/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // remove field
  collection.fields.removeById("text3017586004")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3017586004",
    "max": null,
    "min": null,
    "name": "pricetag",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3017586004",
    "max": 0,
    "min": 0,
    "name": "pricetag",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number3017586004")

  return app.save(collection)
})
