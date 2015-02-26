Template.course_item.helpers({
  courseStudents: function(courseId) {
    return Meteor.users.find({ course_id: courseId }).fetch()
            .filter(onlyStudents)
            .map(function(user) {
              user.email = user.emails[0]
              return user
            })

    function onlyStudents(user) {
      return _(user.roles).contains('student')
    }
  }
})

// Temporal solution until https://github.com/d0minikk/materialize-meteor/issues/10 is solved.
// If I try to append this behavoiur to the courses accordion template (without implementing the
// course_item template) it doesn't work sometimes.
Template.course_item.rendered = function() {
  $('.collapsible').collapsible()
  // Workaround to avoid run condition between meteor and materialize
  // unbind and bind to prevent multiple bindings to the same event handler
  $('.collapsible-header').unbind('click.initializetabs').bind('click.initializetabs', initializeTabs)

  function initializeTabs() {
    var that = this
    _initializeTabs()
    setTimeout(_initializeTabs, 200)

    function _initializeTabs() {
      $(that).siblings('.collapsible-body').find('ul.tabs').first().tabs()
    }
  }
}

