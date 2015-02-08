// applies ability filters defined on each role's ability
Collections.forEach(function(collection) {
  collection.before.anyFind(function(userId, selector) {
    selector = selector || {}
    return provideUserAndRole(userId, function(user, role) {
      if (role == 'directive') {
        return;
      }
      if (hasDefinedAbilities(role, collection, 'anyFind')) {
        return RoleAbilities[role].abilities[collection._name].anyFind(user, selector)
      } else {
        selector._id = 'prevent_find'
      }
    })
  })

  collection.before.insert(function(userId, doc) {
    return provideUserAndRole(userId, function(user, role) {
      if (role == 'directive') {
        return;
      }
      if (hasDefinedAbilities(role, collection, 'save')) {
        return RoleAbilities[role].abilities[collection._name].save(user, doc)
      } else {
        throw 'User not allowed to insert'
      }
    })
  })
})

function hasDefinedAbilities(role, collection, operation) {
  return RoleAbilities[role] && RoleAbilities[role].abilities &&
    RoleAbilities[role].abilities[collection._name] &&
    RoleAbilities[role].abilities[collection._name][operation]
}

