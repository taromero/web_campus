Template.subject_item.helpers({
  subject: function() {
    return Subjects.findOne(this.subject_id)
  },
  exams: function(subjectId) {
    return Exams.find({ subject_id: subjectId })
  },
  resources: function(subjectId) {
    var resources = Resources.find({ subject_id: subjectId })
    return resources.map(function(resource) {
      resource.filename = Files.findOne(resource.file_id).original.name
      return resource
    })
  },
})
