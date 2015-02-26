Template.courses_accordion.helpers({
  courses: function() {
    return Courses.find()
  }
})

Template.courses_accordion.rendered = function() {
  $('.modal-trigger').leanModal()
}

Template.course_item.helpers({
  courseSubjects: function(courseId) {
    return Subjects.find({ course_id: courseId })
  },
  subjectExams: function(subjectId) {
    return Exams.find({ subject_id: subjectId })
  },
  subjectResources: function(subjectId) {
    var resources = Resources.find({ subject_id: subjectId })
    return resources.map(function(resource) {
      resource.filename = Files.findOne(resource.file_id).original.name
      return resource
    })
  },
  courseStudents: function(courseId) {
    return Meteor.users.find({ course_id: courseId }).fetch()
            .filter(onlyStudents)
            .map(function(user) {
              user.email = user.emails[0]
              return user
            })

    function onlyStudents(user) {
      return _(user.roles).contains('student')
    }
  }
})

// Temporal solution until https://github.com/d0minikk/materialize-meteor/issues/10 is solved.
// If I try to append this behavoiur to the courses accordion template (without implementing the
// course_item template) it doesn't work sometimes.
Template.course_item.rendered = function() {
  $('.collapsible').collapsible()
  // Workaround to avoid run condition between meteor and materialize
  // unbind and bind to prevent multiple bindings to the same event handler
  $('.collapsible-header').unbind('click.initializetabs').bind('click.initializetabs', initializeTabs)

  function initializeTabs() {
    var that = this
    _initializeTabs()
    setTimeout(_initializeTabs, 200)

    function _initializeTabs() {
      $(that).siblings('.collapsible-body').find('ul.tabs').first().tabs()
    }
  }
}

Template.custom_view_header.rendered = function() {
  $(".button-collapse").sideNav({ closeOnClick: true })
}

Template.exam_modal.events({
  'click .custom-modal-trigger': function(event) {
    var ct = event.currentTarget
    $('#exam_score_modal').remove()
    Blaze.renderWithData(Template.exam_score_modal, { exam_id: ct.getAttribute('value') }, $('#exam-score-modal-container')[0])
    $('#exam_score_modal').openModal();
  }
})

Template.exam_score_modal.helpers({
  students: function() {
    _that = this
    return Meteor.users.find({ course_id: Subjects.findOne(Exams.findOne(this.exam_id).subject_id).course_id }).map(addExamScore)

    function addExamScore(student) {
      var examScore = ExamScores.findOne({ exam_id: _that.exam_id, user_id: student._id })
      if (examScore) {
        student.examScore = examScore.score
      }
      return student
    }
  },
  exam: function() {
    return Exams.findOne(this.exam_id)
  }
})

Template.exam_score_modal.events({
  'click #save_scores': function(event, template) {
    _that = this
    template.$('.score').map(getData).each(upsertScores)

    function getData(index, scoreInput) {
      return {
        student_id: scoreInput.id,
        score: scoreInput.value
      }
    }

    function upsertScores(index, ss) {
      Meteor.call('upsertScores', { user_id: ss.student_id, exam_id: _that.exam_id, score: ss.score})
    }
  }
})

