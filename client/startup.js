Meteor.startup(function() {
  AccountsEntry.config({
    dashboardRoute: '/',
    passwordSignupFields: 'EMAIL_ONLY'
  })
})
