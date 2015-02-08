Collections.forEach(function(collection) {
  CollectionBehaviours.extendCollectionInstance(collection)
  if (collection.autoTable) {
    collection.autoTable = collection.autoTable.concat(AutoTables.Audit)
  }
  collection.timestampable()
  collection.blamable()
  collection.softRemovable()
  if (collection.name != 'Events') {
    collection.trackable()
  }
})

// Meteor.users can't be added to collections because it behaves weird when
// attaching behaviours that way
CollectionBehaviours.extendCollectionInstance(Meteor.users)
Meteor.users.softRemovable()
Meteor.users.timestampable()
Meteor.users.blamable()
