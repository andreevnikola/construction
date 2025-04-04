/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // remove field
  collection.fields.removeById("text3138852633")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3138852633",
    "max": null,
    "min": null,
    "name": "baseline_income",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3138852633",
    "max": 0,
    "min": 0,
    "name": "baseline_income",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number3138852633")

  return app.save(collection)
})
