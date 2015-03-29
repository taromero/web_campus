getRole = function(userId) {
  if (!userId) {
    return {}
  }
  var user = Meteor.users.findOne(userId)
  if (!user) {
    console.log('Cannot find user at "provideUserAndRole", with userId', userId)
    return {}
  }
  return user.roles.filter(function(role) { return role != 'admin' })[0]
}

onlyStudents = function(user) {
  return _(user.roles).contains('student')
}

getIds = function(entity) {
  return entity._id
}

dashesToSpaces = function(string) {
  return string.replace(/-/g, " ")
}

spacesToDashes = function(string) {
  return string.replace(/ /g, "-")
}

