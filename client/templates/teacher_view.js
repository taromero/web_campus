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
  initializeComponents()
  setTimeout(initializeComponents, 500)
  setTimeout(initializeComponents, 1500)
}

function initializeComponents() {
  $('.collapsible').collapsible()
  $('ul.tabs').tabs();
}
