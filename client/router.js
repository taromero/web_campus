var subs = new SubsManager()

Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', {
  name: 'root',
  template: 'custom_view',
  waitOn: function() {
    return [
      subs.subscribe('Courses')
    ]
  },
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
  waitOn: function() {
    return [
      subs.subscribe('Users'),
      subs.subscribe('Courses'),
      subs.subscribe('Subjects'),
      subs.subscribe('attendances_for_student')
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    studentsTabRendered = false
    attendancesTabRendered = false
    var name = underscoresToSpaces(this.params.name)
    Session.set('main_title', name)
    var course = Courses.findOne({ name: name })
    return course
  }
})

Router.route('/clases/:course_name/materias/:subject_name', {
  name: 'subject_item',
  template: 'subject_item',
  waitOn: function() {
    return [
      subs.subscribe('Courses'),
      subs.subscribe('Subjects'),
      subs.subscribe('Exams'),
      subs.subscribe('Resources'),
      subs.subscribe('ScoreCardSubjects'),
      subs.subscribe('PeriodsScores'),
      subs.subscribe('ExamScores')
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      var course_name = underscoresToSpaces(this.params.course_name)
      var subject_name = underscoresToSpaces(this.params.subject_name)

      Session.set('main_title', subject_name)
      var clazz = Courses.findOne({ name: course_name})
      var subject = Subjects.findOne({ name: subject_name, course_id: clazz._id })
      return { subject_id: subject._id }
    }
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
