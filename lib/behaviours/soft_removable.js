CollectionBehaviours.defineBehaviour('softRemovable', function() {
  var collection = this

  collection.before.remove(function(userId, doc) {
    collection.update({ _id: doc._id }, { $set: { removed: true, removedAt: new Date(), removedBy: userId } })
    return 0;
  })

  collection.before.find(filterRemovedFromSearch)
  collection.before.findOne(filterRemovedFromSearch)

  function filterRemovedFromSearch(userId, selector, options) {
    if (selector && selector.removed === undefined) {
      selector.removed = { $exists: false }
    }
  }

  collection.unRemove = function(id) {
    collection.update(id, { $unset: { removed: true } })
  }

})
