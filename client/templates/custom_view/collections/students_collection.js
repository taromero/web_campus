Template.students_collection.helpers({
  courseStudents: function() {
    return Meteor.users.find({ course_id: this.course_id }).fetch()
            .filter(onlyStudents)
            .map(function(user) {
              user.email = user.emails[0]
              return user
            })
  }
})

