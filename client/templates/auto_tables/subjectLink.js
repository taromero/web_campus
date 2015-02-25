Template.subjectLink.helpers({
  name: function() {
    return Subjects.findOne(this.value).name
  }
})
