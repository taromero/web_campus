Meteor.startup(function() {
  AccountsEntry.config({
    dashboardRoute: '/',
    passwordSignupFields: 'EMAIL_ONLY'
  })
  // prevent console.infos from the preloader lib
  window.PreloaderMute = true
})
