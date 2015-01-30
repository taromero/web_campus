Meteor.startup(function() {
  if (Meteor.users.find().count() <= 0) {
    Accounts.createUser({
      username: 'canotto',
      email: 'canotto90@gmail.com',
      password: '1234'
    })
  }
  AccountsEntry.config({
    dashboardRoute: '/admin',
    passwordSignupFields: 'EMAIL_ONLY',
    showSignupCode: true
  });
})
