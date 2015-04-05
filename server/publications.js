securePublish('Users', function(opts) {
  var selector = {}
  _.extend(selector, idSelector(opts))
  _.extend(selector, slugSelector(opts))
  return Meteor.users.find(selector, {
    fields: { profile: 1, emails: 1, roles: 1, course_id: 1, subject_ids: 1, dependant_ids: 1,
              createdAt: 1, updatedAt: 1, createdBy: 1, lastUpdatedBy: 1 },
    sort: { 'profile.lastName': 1, 'profile.firstName': 1 } })
})

Collections.forEach(function(collection) {
  securePublish(collection.name, function(opts) {
    var selector = collection.defaultSelector || {}
    _.extend(selector, idSelector(opts))
    _.extend(selector, slugSelector(opts))
    _.extend(selector, nameSelector(collection, opts))
    _.extend(selector, titleSelector(collection, opts))
    _.extend(selector, documentIdSelector(collection, opts))
    return collection.find(selector, collection.defaultOptions)
  })
})

securePublish('ExamScoresForSubject', function(opts) {
  var subject = Subjects.findOne({ name: opts.subject_name })
  var exam_ids = Exams.find({ subject_id: subject._id }).map(getIds)
  return ExamScores.find({ exam_id: { $in: exam_ids } })
})


securePublish('PeriodsScoresForSubject', function(opts) {
  var subject = Subjects.findOne({ name: opts.subject_name })
  var score_card_subject_ids = ScoreCardSubjects.find({ subject_id: subject._id }).map(getIds)
  return PeriodsScores.find({ score_card_subject_id: { $in: score_card_subject_ids } })
})

securePublish('ScoreCardSubjectsForStudent', function(opts) {
  var student_id = Meteor.users.findOne({ 'profile.document_id': opts.document_id })._id
  var sc = ScoreCards.findOne({ student_id: student_id })
  return ScoreCardSubjects.find({ score_card_id: sc._id })
})

securePublish('PeriodsScoresForStudent', function(opts) {
  var student_id = Meteor.users.findOne({ 'profile.document_id': opts.document_id })._id
  var sc = ScoreCards.findOne({ student_id: student_id })
  var scss = ScoreCardSubjects.find({ score_card_id: sc._id })
  return PeriodsScores.find({ score_card_subject_id: scss._id })
})

securePublish('SubjectsForStudent', function(opts) {
  var student = Meteor.users.findOne({ 'profile.document_id': opts.document_id })
  return Subjects.find({ course_id: student.course_id })
})

function idSelector(opts) {
  var selector = {}
  if (opts._id) {
    selector._id = opts._id
  }
  return selector
}

function nameSelector(collection, opts) {
  var selector = {}
  if (opts.name) {
    var entity = collection.findOne({ name: opts.name })
    selector._id = entity._id
  }
  return selector
}

function titleSelector(collection, opts) {
  var selector = {}
  if (opts.title) {
    var entity = collection.findOne({ title: opts.title })
    selector._id = entity._id
  }
  return selector
}

function documentIdSelector(collection, opts) {
  var selector = {}
  if (opts.document_id) {
    var student_id = Meteor.users.findOne({ document_id: opts.document_id })
    var entity = collection.findOne({ student_id: student_id })
    selector._id = entity._id
  }
  return selector
}

function slugSelector(opts) {
  var selector = {}
  if (opts.course_name) {
    var course = Courses.findOne({ name: opts.course_name })
    selector.course_id = course._id
  }
  if (opts.exam_title) {
    var exam = Exams.findOne({ title: opts.exam_title })
    selector.exam_id = exam._id
  }
  if (opts.subject_name) {
    var subject = Subjects.findOne({ name: opts.subject_name})
    selector.subject_id = subject._id
  }
  return selector
}

function securePublish(name, publishFn) {
  Meteor.publish(name, function(opts) {
    opts = opts || {}
    var dashyAttributes = ['name', 'title', 'subject_name', 'course_name', 'exam_title']
    dashyAttributes.forEach(convertDashesToSpaces)

    return this.userId ? publishFn(opts) : []

    function convertDashesToSpaces(attr) {
      opts[attr] = dashesToSpaces(opts[attr])
    }
  })
}
