var subs = new SubsManager()

Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', {
  template: 'custom_view',
  waitOn: subscriptions,
  fastRender: true
})

Router.route('/asistencias', {
  template: 'attendances_read_only',
  waitOn: subscriptions,
  fastRender: true

})

Router.route('/boletin', {
  template: 'score_card_with_header',
  waitOn: subscriptions,
  fastRender: true
})

Router.configure({
  loadingTemplate: 'loading'
})


function subscriptions() {
  return [
    subs.subscribe('Users'),
    subs.subscribe('Subjects'),
    subs.subscribe('attendances_for_student'),
    subs.subscribe('Exams'),
    subs.subscribe('Courses'),
    subs.subscribe('ScoreCards'),
    subs.subscribe('Resources'),
    subs.subscribe('ScoreCardSubjects'),
    subs.subscribe('PeriodsScores'),
    subs.subscribe('ExamScores')
  ]
}
