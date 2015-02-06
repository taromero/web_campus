// applies ability filters defined on each role's ability
Collections.forEach(function(collection) {
  var operations = ['anyFind']
  operations.forEach(function(operation) {
    collection.before[operation](provideUserAndRole(function(user, role, selector) {
      if (safeNavigation()) {
        return RoleAbilities[role].abilities[collection._name][operation](user, selector)
      }
      
      function safeNavigation() {
        return RoleAbilities[role] && RoleAbilities[role].abilities &&
                RoleAbilities[role].abilities[collection._name] &&
                RoleAbilities[role].abilities[collection._name][operation]
      }
    }))
  })
})

