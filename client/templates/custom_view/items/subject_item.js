Template.subject_item.helpers({
  subject: function() {
    return Subjects.findOne(this.subject_id)
  },
  exams: function(subjectId) {
    return Exams.find({ subject_id: subjectId })
  },
  resources: function(subjectId) {
    return Resources.find({ subject_id: subjectId })
  }
})

Template.subject_item.rendered = function() {
  initializeCollapsibleAndTabs()
}
