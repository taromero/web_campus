Template.examLink.helpers({
  title: function() {
    return Exams.findOne(this.value).title
  }
})
