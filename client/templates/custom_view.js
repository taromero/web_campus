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
  },
  courseStudents: function(courseId) {
    var aux = Meteor.users.find({ course_id: courseId }).fetch().filter(onlyStudents)
    console.log(aux)
    return aux

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
    $(this).siblings('.collapsible-body').find('ul.tabs').first().tabs()
  }
}

Template.custom_view_header.rendered = function() {
  $(".button-collapse").sideNav({ closeOnClick: true })
}
