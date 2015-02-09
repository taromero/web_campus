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

provideUserAndRole = function(userId, filterCb) {
  if (!userId) {
    return 0
  }
  var user = Meteor.users.findOne(userId)
  var role = user.roles.filter(function(role) { return role != 'admin' })[0]
  return filterCb(user, role)
}
