Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', {
  template: 'custom_view',
  waitOn: subscriptions
})

Router.route('/asistencias', {
  template: 'attendances_read_only',
  waitOn: subscriptions
})

Router.route('/boletin', {
  template: 'score_card_with_header',
  waitOn: subscriptions
})

collapsibleInitialized = false
Router.configure({
  loadingTemplate: 'loading'
})

function subscriptions() {
  return Collections.map(function(collection) {
      return Meteor.subscribe(collection.name)
    }).concat([
      Meteor.subscribe('Users'),
      Meteor.subscribe('attendances_for_student')
    ])
}
