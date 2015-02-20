Template.teacher_view.helpers({
  courses: function() {
    return Courses.find()
  },
  courseSubjects: function(courseId) {
    return Subjects.find({ course_id: courseId })
  },
  subjectExams: function(subjectId) {
    return Exams.find({ subject_id: subjectId })
  }
})

Template.teacher_view.rendered = function() {
  $('ul.tabs').tabs()
  $(".button-collapse").sideNav({ closeOnClick: true })
  initializeCollapsibleWhenReady()

  // sometimes it didn't initialized correctly for timing issue that I don't fully understand
  function initializeCollapsibleWhenReady() {
    var collapsibleInitialized = false
    $('.collapsible').hover(function() {
      if (!collapsibleInitialized) {
        $('.collapsible').collapsible()
        collapsibleInitialized = true
      }
    })
  }
}

