RoleAbilities.apply = function() {
  // applies ability filters defined on each role's ability
  Collections.forEach(function(collection) {
    collection.before.anyFind(function(userId, selector) {
      selector = selector || {}
      var user = Meteor.users.findOne(userId)
      var role = getRole(userId)
      if (role == 'directive') {
        return;
      }
      if (hasDefinedAbilities(role, collection, 'anyFind')) {
        return RoleAbilities[role].abilities[collection.name].anyFind(user, selector)
      }
    })

    collection.before.insert(function(userId, doc) {
      var user = Meteor.users.findOne(userId)
      var role = getRole(userId)
      if (role == 'directive') {
        return;
      }
      if (hasDefinedAbilities(role, collection, 'save')) {
        return RoleAbilities[role].abilities[collection.name].save(user, doc)
      } else {
        console.log('Collection', collection.name)
        console.log('doc', doc)
        throw 'User not allowed to insert'
      }
    })
  })

  function hasDefinedAbilities(role, collection, operation) {
    return RoleAbilities[role] && RoleAbilities[role].abilities &&
      RoleAbilities[role].abilities[collection.name] &&
      RoleAbilities[role].abilities[collection.name][operation]
  }
}
