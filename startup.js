Meteor.startup(function() {
  AccountsEntry.config({
    dashboardRoute: '/admin',
    passwordSignupFields: 'EMAIL_ONLY',
    showSignupCode: true
  })
  if (Meteor.users.find().count() <= 0) {
    Seed.create(1).directives()
    Seed.create(2).teachers()
  }
})
