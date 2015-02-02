CollectionBehaviours.defineBehaviour('trackable', function() {
  var self = this;
  self.after.insert(function (userId, doc) {
    Events.create({
      operation_type: 'insert',
      collection: self.toString(),
      id: doc._id,
      doc: doc
    })
  })
  self.before.update(function (userId, doc, fieldNames, modifier, options) {
    Events.create({
      operation_type: 'update',
      collection: self.toString(),
      id: doc._id,
      diff: modifier
    })
  })
  self.before.remove(function(userId, doc) {
    Events.create({
      operation_type: 'remove',
      collection: self.toString(),
      id: doc._id
    })
  })
})

Collections.forEach(function(collection) {
  collection.attachSchema(Schemas.Audit)
  if (collection.autoTable) {
    collection.autoTable.concat(AutoTables.Audit)
  }
  collection.softRemovable()
  colletion.trackable()
})

