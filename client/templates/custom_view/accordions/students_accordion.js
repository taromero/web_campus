Template.students_accordion.helpers({
  students: function() {
    return Meteor.users.find().filter(onlyStudents)

    function onlyStudents(user) {
      return _(user.roles).contains('student')
    }
  }
})
