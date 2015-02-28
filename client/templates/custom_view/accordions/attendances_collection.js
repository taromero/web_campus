Template.attendances_collection.helpers({
  students: function() {
    return Meteor.users.find({ course_id: this.course_id }).fetch(onlyStudents)
  }
})

Template.attendances_collection.rendered = function() {
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
}
