Template.subjects_accordion.helpers({
  subjects: function() {
    return Subjects.find({ course_id: this.course_id })
  }
})

Template.subjects_accordion.rendered = function() {
  $('.collapsible').collapsible()
}

