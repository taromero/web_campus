Template.students_accordion.helpers({
  students: function() {
    return Meteor.users.find().fetch().filter(onlyStudents)
  }
})
