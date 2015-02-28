Template.courseLink.helpers({
  name: function() {
    return Courses.findOne(this.value).name
  }
})
