Meteor.startup(function() {
  // prevent console.infos from the preloader lib
  window.PreloaderMute = true
})
