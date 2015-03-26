Template.dependants_collection.helpers({
  students: function() {
    return Meteor.users.find().fetch().filter(onlyStudents)
  }
})
