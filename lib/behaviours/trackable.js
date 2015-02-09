CollectionBehaviours.defineBehaviour('trackable', function() {
  var self = this;
  self.after.insert(function (userId, doc) {
    Events.insert({
      operation_type: 'insert',
      collection: self.toString(),
      id: doc._id,
      doc: doc
    })
  })
  self.before.update(function (userId, doc, fieldNames, modifier, options) {
    Events.insert({
      operation_type: 'update',
      collection: self.toString(),
      id: doc._id,
      diff: modifier.$set
    })
  })
  self.before.remove(function(userId, doc) {
    Events.insert({
      operation_type: 'remove',
      collection: self.toString(),
      id: doc._id
    })
  })
})
