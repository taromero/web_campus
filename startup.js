Meteor.startup(function() {
  if (Meteor.users.find().count() <= 0) {
    var directive_id = Accounts.createUser({
      username: 'aDirective',
      email: 'canotto90@gmail.com',
      password: '1234'
    })
    var teacher_id = Accounts.createUser({
      username: 'aTeacher',
      email: 'canotto90+1@gmail.com',
      password: '1234'
    })
    Roles.addUsersToRoles(directive_id, ['admin', 'directive'])
    Roles.addUsersToRoles(teacher_id, ['admin', 'teacher'])
  }
  AccountsEntry.config({
    dashboardRoute: '/admin',
    passwordSignupFields: 'EMAIL_ONLY',
    showSignupCode: true
  });
})
