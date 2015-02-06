RoleAbilities = {}

Collections.forEach(function(collection) {
  collection.before.anyFind = function(filter) {
    collection.before.find(filter)
    collection.before.findOne(filter)
  }
})

provideUserAndRole = function(filterCb) {
  return function(userId, selector) {
    if (!userId) {
      return 0
    }
    var user = Meteor.users.findOne(userId)
    var role = user.roles.filter(function(role) { return role != 'admin' })[0]
    return filterCb(user, role, selector || {})
  }
}
