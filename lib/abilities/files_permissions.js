Files.allow({
  insert: onlyDirectivesAndTeachers,
  update: function() {
    return false // don't allow updating. Prefer removing and adding a new Resource
  },
  download: function(userId) {
    return true
  }
})

function onlyDirectivesAndTeachers(userId, doc) {
  var user = Meteor.users.findOne(userId)
  var role = user.roles.filter(function(role) { return role != 'admin' })[0]
  if (_(['directive', 'teacher']).contains(role)) {
    return true
  } else {
    return false
  }
}
