var subs = new SubsManager()

Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', {
  name: 'root',
  template: 'custom_view',
  waitOn: subscriptions,
  layoutTemplate: 'layout'
})

Router.route('/asistencias', {
  template: 'attendances_read_only',
  waitOn: subscriptions,
  layoutTemplate: 'layout'
})

Router.route('/boletin', {
  template: 'score_card',
  waitOn: subscriptions,
  layoutTemplate: 'layout'
})

Router.route('/clases/:name', {
  name: 'course_item',
  template: 'wrapped_course_item',
  waitOn: subscriptions,
  layoutTemplate: 'layout',
  data: function() {
    var name = underscoresToSpaces(this.params.name)
    Session.set('main_title', name)
    var course = Courses.findOne({ name: name })
    return course
  }
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
