Meteor.startup(function() {
  AccountsEntry.config({
    dashboardRoute: '/admin',
    passwordSignupFields: 'EMAIL_ONLY'
  })
})
