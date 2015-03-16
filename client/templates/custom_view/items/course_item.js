Template.course_item.helpers({
  courseStudents: function(courseId) {
    return Meteor.users.find({ course_id: courseId }).fetch()
            .filter(onlyStudents)
            .map(function(user) {
              user.email = user.emails[0]
              return user
            })
  }
})

Template.course_item.rendered = function() {
  $('ul.tabs').first().tabs()
}

