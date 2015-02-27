RoleAbilities = {}

Collections.forEach(function(collection) {
  collection.before.anyFind = function(filter) {
    collection.before.find(filter)
    collection.before.findOne(filter)
  }
  collection.before.save = function(filter) {
    collection.before.insert(filter)
    collection.before.update(filter)
  }
})

