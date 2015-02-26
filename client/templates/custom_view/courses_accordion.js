Template.courses_accordion.helpers({
  courses: function() {
    return Courses.find()
  }
})

Template.courses_accordion.rendered = function() {
  $('.modal-trigger').leanModal()
}
