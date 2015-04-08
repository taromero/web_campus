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

Router.route('/asistencias/:document_id', {
  template: 'attendances_read_only',
  waitOn: function() {
    return [
      subs.subscribe('Attendances', { document_id: this.params.document_id })
    ]
  },
  layoutTemplate: 'layout'
})

Router.route('/boletin/:document_id', {
  template: 'score_card',
  waitOn: function() {
    return [
      subs.subscribe('ScoreCards', { document_id: this.params.document_id }),
      subs.subscribe('ScoreCardSubjectsForStudent', { document_id: this.params.document_id }),
      subs.subscribe('PeriodsScoresForStudent', { document_id: this.params.document_id }),
      subs.subscribe('SubjectsForStudent', { document_id: this.params.document_id })
    ]
  },
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
    this.render(isStudent() ? 'wrapped_subjects_collection' : 'course_item')
  }
})

Router.route('/clases/:course_name/estudiantes/:document_id', {
  template: 'student_item',
  layoutTemplate: 'layout',
  waitOn: function() {
    return [
      subs.subscribe('Users', { document_id: this.params.document_id }),
      subs.subscribe('ScoreCards', { document_id: this.params.document_id }),
      subs.subscribe('ScoreCardSubjectsForStudent', { document_id: this.params.document_id }),
      subs.subscribe('PeriodsScoresForStudent', { document_id: this.params.document_id }),
      subs.subscribe('SubjectsForStudent', { document_id: this.params.document_id })
    ]
  },
  data: function() {
    return { document_id: this.params.document_id }
  }
})

Router.route('clases/:course_name/materias/:subject_name/examenes/:exam_title', {
  name: 'exam_item',
  template: 'exam_item',
  waitOn: function() {
    return [
      subs.subscribe('Exams', { title: this.params.exam_title }),
      subs.subscribe('ExamScores', { subject_name: this.params.subject_name, exam_title: this.params.exam_title })
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      var exam = Exams.findOne({ title: dashesToSpaces(this.params.exam_title) })
      if (!exam) {
        return; //prevent bug when signing out
      }
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
      subs.subscribe('Users', { course_name: this.params.course_name }),
      subs.subscribe('Exams', { subject_name: this.params.subject_name, title: this.params.exam_title }),
      subs.subscribe('ExamScores', { subject_name: this.params.subject_name, exam_title: this.params.exam_title }),
      subs.subscribe('Courses', { name: this.params.name }),
      subs.subscribe('Subjects', { name: this.params.subject_name })
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      var subject = Subjects.findOne({ name: dashesToSpaces(this.params.subject_name) })
      if (!subject) {
        return;
      }
      var exam = Exams.findOne({ subject_id: subject._id, title: dashesToSpaces(this.params.exam_title) })
      var course = Courses.findOne({ name: dashesToSpaces(this.params.course_name) })
      Session.set('main_title', exam.title)
      return { exam_id: exam._id, course_id: course._id }
    }
  }
})


Router.route('/clases/:course_name/materias/:subject_name', {
  name: 'subject_item',
  template: 'subject_item',
  waitOn: function() {
    return [
      subs.subscribe('Subjects', { name: this.params.subject_name }),
      subs.subscribe('Exams', { subject_name: this.params.subject_name }),
      subs.subscribe('ExamScores', { subject_name: this.params.subject_name }),
      subs.subscribe('Resources', { subject_name: this.params.subject_name }),
      subs.subscribe('ExamScoresForSubject', { subject_name: this.params.subject_name} )
    ]
  },
  layoutTemplate: 'layout',
  data: function() {
    if (this.ready()) {
      var subject = Subjects.findOne({ name: dashesToSpaces(this.params.subject_name) })
      if (!subject) {
        return;
      }
      Session.set('main_title', subject.name)
      return { subject_id: subject._id }
    }
  }
})

Router.configure({
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      subs.subscribe('Users', { _id: Meteor.userId() }) //to always have the current user's profile data
    ]
  }
})

