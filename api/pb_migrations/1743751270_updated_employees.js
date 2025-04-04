/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_696123946")

  // remove field
  collection.fields.removeById("text2484321137")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2312998553",
    "max": null,
    "min": null,
    "name": "wage",
    "onlyInt": true,
    "presentable": false,
    "required": true,
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
    "id": "text2484321137",
    "max": 0,
    "min": 0,
    "name": "wage",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number2312998553")

  return app.save(collection)
})
