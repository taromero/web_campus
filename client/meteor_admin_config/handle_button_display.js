var collectionNames = [
  'Classes',
  'Courses',
  'Classes',
  'Reports',
  'Exams',
  'Users'
]

collectionNames.forEach(function(collectionName) {
  var hideCreateButtonInterval = setInterval(function() {
    var selector = '[href="/admin/' + collectionName + '/new"]'
    if ($(selector).length) {
      clearInterval(hideCreateButtonInterval)
      provideUserAndRole(Meteor.userId(), function(user, role) {
        if (role == 'directive') {
          return;
        }
        if (!(RoleAbilities[role].abilities.classes.save && RoleAbilities[role].abilities.classes.save(user))) {
          $(selector).hide()
        }
      })
    }
  }, 100)
})

