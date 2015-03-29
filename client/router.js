var subs = new SubsManager()

Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', function() {
  if (isTeacher() || isDirective()) {
    this.redirect('/clases')
  } else if (isParent()) {
    this.redirect('/vista_parental')
  } else {
    this.redirect('/vista_estudiantil')
  }
})

Router.route('/vista_estudiantil', {
  waitOn: function() {
    return [
      subs.subscribe('Users'),
      subs.subscribe('Courses')
    ]
  },
  action: function() {
    if (this.ready()) {
      var course = Courses.findOne(Meteor.user().course_id)
      this.redirect('/clases/' + spacesToDashes(course.name))
    }
  }
})

Router.route('/clases', {
  template: 'courses_collection',
  waitOn: function() {
    return [
      subs.subscribe('Courses')
    ]
  },
  layoutTemplate: 'layout'
})

Router.route('/asistencias', {
  template: 'attendances_read_only',
  // waitOn: subscriptions,
  layoutTemplate: 'layout'
})

Router.route('/boletin', {
  template: 'score_card',
  // waitOn: subscriptions,
  layoutTemplate: 'layout'
})

Router.route('/clases/:name', {
  name: 'course_item',
  waitOn: function() {
    return [
      subs.subscribe('Users', { course_name: this.params.name }),
      subs.subscribe('Courses', { name: this.params.name }),
      subs.subscribe('Subjects', { course_name: this.params.name }),
      subs.subscribe('Attendances', { course_name: this.params.name })
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      studentsTabRendered = false
      attendancesTabRendered = false
      var name = dashesToSpaces(this.params.name)
      Session.set('main_title', name)
      var course = Courses.findOne({ name: name })
      return course
    }
  },
  action: function() {
    if (isStudent()) {
      this.render('wrapped_subjects_collection')
    } else {
      this.render('course_item')
    }
  }
})

Router.route('clases/:course_name/materias/:subject_name/examenes/:exam_title', {
  name: 'exam_item',
  template: 'exam_item',
  waitOn: function() {
    return [
      subs.subscribe('Courses'),
      subs.subscribe('Subjects'),
      subs.subscribe('Exams')
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      var exam = getExam(this.params)
      Session.set('main_title', exam.title)
      return { exam: exam }
    }
  }
})

Router.route('clases/:course_name/materias/:subject_name/examenes/:exam_title/notas', {
  name: 'exam_scores',
  template: 'exam_scores',
  waitOn: function() {
    return [
      subs.subscribe('Users'),
      subs.subscribe('Courses'),
      subs.subscribe('Courses'),
      subs.subscribe('Subjects'),
      subs.subscribe('Exams'),
      subs.subscribe('ExamScores')
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      var exam = getExam(this.params)
      Session.set('main_title', exam.title)
      return { exam_id: exam._id }
    }
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
      var subject = getSubject(this.params)
      Session.set('main_title', subject.name)
      return { subject_id: subject._id }
    }
  }
})

function getSubject(params) {
  var course_name = dashesToSpaces(params.course_name)
  var subject_name = dashesToSpaces(params.subject_name)

  var clazz = Courses.findOne({ name: course_name})
  return Subjects.findOne({ name: subject_name, course_id: clazz._id })
}


function getExam(params) {
  var subject = getSubject(params)
  var exam_title = dashesToSpaces(params.exam_title)
  return Exams.findOne({ subject_id: subject._id, title: exam_title })
}

Router.configure({
  loadingTemplate: 'loading'
})

