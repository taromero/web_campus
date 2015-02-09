var intervals = []
var interval = setInterval(function() {
  var stopIntervalSelector = '[href="/admin/Subjects/new"]'
  if ($(stopIntervalSelector).length) {
    clearInterval(interval)
    Collections.forEach(function(collection) {
      var selector = '[href="/admin/' + collection.name + '/new"]'
      provideUserAndRole(Meteor.userId(), function(user, role) {
        if (role == 'directive') {
          return;
        }
        if (!(RoleAbilities[role].abilities[collection.name] &&
              RoleAbilities[role].abilities[collection.name].save &&
              RoleAbilities[role].abilities[collection.name].save(user))) {
          $(selector).hide()
        }
      })
    })
  }
}, 100)

