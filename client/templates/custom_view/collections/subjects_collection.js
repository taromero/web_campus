Template.subjects_collection.helpers({
  subjects: function() {
    return Subjects.find({ course_id: this.course_id })
  }
})

Template.subjects_collection.rendered = function() {
  $('.collapsible').collapsible()
}

