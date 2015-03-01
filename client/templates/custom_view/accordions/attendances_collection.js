Template.attendances_collection.helpers({
  students: function() {
    return Meteor.users.find({ course_id: this.course_id }).fetch(onlyStudents).map(addShortName)

    function addShortName(student, index, students) {
      var anotherWithSameLastName = students.filter(function(_student) {
        return _student.lastName == student.lastName
      }).length > 2

      if (anotherWithSameLastName) {
        student.profile.shortName = student.profile.lastName + ', ' + student.profile.firstName
      } else {
        student.profile.shortName = student.profile.lastName
      }
      return student
    }
  }
})

var preventRowColorChange = false
Template.attendances_collection.events({
  'click .lever': function(event) {
    // Apparently the switch component of Materialize doesn't change the value of the checkbox,
    // so we have to do it ourselves
    var $switchInput = $(event.currentTarget).siblings('input')
    var hasActivatedSwitch = $switchInput.val() == 'off' //if it was off, a click activates it
    var newVal = !hasActivatedSwitch ? 'off' : 'on'
    var $relatedHalfAttendance = $switchInput.closest('.row').find('.half-attendance')
    var collectionItem = $switchInput.closest('.collection-item')

    $switchInput.val(newVal)

    if (preventRowColorChange) {
      preventRowColorChange = false
    } else {
      collectionItem.attr('class', 'collection-item') //remove existing color
      collectionItem.addClass(hasActivatedSwitch ? 'green lighten-3' : 'red lighten-2')
    }

    if (hasActivatedSwitch && $relatedHalfAttendance.val() == 'on') {
      preventRowColorChange = true
      $relatedHalfAttendance.click()
    }

  },
  'click .half-attendance': function(event) {
    var $checkbox = $(event.currentTarget)
    var hasActivatedHalfAttendance = $checkbox.val() == 'off' //if it was off, a click activates it
    var newVal = !hasActivatedHalfAttendance ? 'off' : 'on'
    var $relatedSwitch = $checkbox.closest('.row').find('label:visible .attendance-switch') //label:visible is because we have 2 switches (1 for large and 1 for med-and-down)
    var collectionItem = $checkbox.closest('.collection-item')
    $checkbox.val(newVal)

    if (preventRowColorChange) {
      preventRowColorChange = false
    } else {
      collectionItem.attr('class', 'collection-item') //remove existing color
      collectionItem.addClass(hasActivatedHalfAttendance ? 'deep-orange lighten-3' : 'red lighten-2')
    }

    if (hasActivatedHalfAttendance && $relatedSwitch.val() == 'on') {
      preventRowColorChange = true
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
