Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', {
  template: 'custom_view'
})

Router.route('/asistencias', {
  template: 'attendances_read_only'
})

Router.route('/boletin', {
  template: 'score_card_with_header'
})

var isLoggedIn = Meteor.userId()
Router.configure({
  loadingTemplate: 'loading',
  onBeforeAction: function() {
    var _this = this
    collapsibleInitialized = false

    this.waitOn = function() {
      return Collections.map(function(collection) {
        return Meteor.subscribe(collection.name)
      }).concat([
        Meteor.subscribe('Users'),
        Meteor.subscribe('attendances_for_student')
      ])
    }

    this.next && this.next()
  }
})

