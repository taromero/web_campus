Template.dependants_accordion.helpers({
  students: function() {
    return Meteor.users.find().fetch().filter(onlyStudents)
  }
})
