Template.custom_view.helpers({
  isTeacherOrDirective: function() {
    return roleIn(['directive', 'teacher'])
  },
  isParent: function() {
    return roleIn(['parent'])
  },
  isTeacher: function() {
    return roleIn(['student'])
  },
  user: function() {
    return Meteor.user()
  }
})

function roleIn(roleArray) {
  var user = Meteor.user()
  if (user) {
    return roleArray.some(inUserRoles)
  }

  function inUserRoles(role) {
    return user.role == role
  }
}

