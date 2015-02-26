Template.subjects_accordion.helpers({
  subjects: function() {
    return Subjects.find({ course_id: this.course_id })
  }
})
