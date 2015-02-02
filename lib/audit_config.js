Collections.forEach(function(collection) {
  collection.attachSchema(Schemas.Audit)
  if (collection.autoTable) {
    collection.autoTable.concat(AutoTables.Audit)
  }
  collection.softRemovable()
})

