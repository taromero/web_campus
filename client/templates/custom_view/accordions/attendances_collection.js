Template.attendances_collection.helpers({
  students: function() {
    return Meteor.users.find({ course_id: this.course_id }).fetch(onlyStudents)
  }
})

Template.attendances_collection.events({
  'click .lever': function(event) {
    // Apparently the switch component of Materialize doesn't change the value of the checkbox,
    // so we have to do it ourselves
    var $switchInput = $(event.currentTarget).siblings('input')
    var hasActivatedSwitch = $switchInput.val() == 'off' //if it was off, a click activates it
    var newVal = !hasActivatedSwitch ? 'off' : 'on'
    var $relatedHalfAttendance = $switchInput.closest('.row').find('.half-attendance')
    $switchInput.val(newVal)

    if (hasActivatedSwitch && $relatedHalfAttendance.val() == 'on') {
      $relatedHalfAttendance.click()
    }
  },
  'click .half-attendance': function(event) {
    var $checkbox = $(event.currentTarget)
    var hasActivatedHalfAttendance = $checkbox.val() == 'off' //if it was off, a click activates it
    var newVal = !hasActivatedHalfAttendance ? 'off' : 'on'
    var $relatedSwitch = $checkbox.closest('.row').find('.attendance-switch')
    $checkbox.val(newVal)

    if (hasActivatedHalfAttendance && $relatedSwitch.val() == 'on') {
      $relatedSwitch.siblings('.lever').click()
    }
  }
})

Template.attendances_collection.rendered = function() {
  $('.datepicker').pickadate()
  $('.attendance-datepicker').val(moment().format('LL'))

  // initialize the switches with off value for now (default is "on" but with the swith deactivated)
  $('.attendance-switch').val('off')
  $('.half-attendance').val('off')
}
