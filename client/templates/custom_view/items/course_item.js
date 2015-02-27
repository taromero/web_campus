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

// Temporal solution until https://github.com/d0minikk/materialize-meteor/issues/10 is solved.
// If I try to append this behavoiur to the courses accordion template (without implementing the
// course_item template) it doesn't work sometimes.
Template.course_item.rendered = function() {
  initializeCollapsibleAndTabs()
}

