onlyStudents = function(user) {
  return user.role == 'student'
}

getIds = function(entity) {
  return entity._id
}

underscoresToSpaces = function(string) {
  return string.replace(/_/g, " ")
}

