Template.courses_accordion.helpers({
  courses: function() {
    return Courses.find()
  }
})

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
  }
})

// Temporal solution until https://github.com/d0minikk/materialize-meteor/issues/10 is solved.
// If I try to append this behavoiur to the courses accordion template (without implementing the
// course_item template) it doesn't work sometimes.
Template.course_item.rendered = function() {
  $('.collapsible').collapsible()
  $('ul.tabs').tabs()
  $(".button-collapse").sideNav({ closeOnClick: true })
}

