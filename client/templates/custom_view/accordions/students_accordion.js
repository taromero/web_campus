Template.students_accordion.helpers({
  courseStudents: function() {
    console.log(this.course_id)
    return Meteor.users.find({ course_id: this.course_id }).fetch()
            .filter(onlyStudents)
            .map(function(user) {
              user.email = user.emails[0]
              return user
            })
  }
})

