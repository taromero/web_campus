Template.attendance_item.rendered = function() {
  // initialize UI with state value
  $('.attendance-switch[value="_on"]').siblings('.lever').click()
  $('.half-attendance[value="_on"]').click()
}

Template.attendance_item.helpers({
  stateToColor: function(state) {
    if (!state || state == 'Ausente') {
      return 'red lighten-2'
    } else if (state == 'Media Falta') {
      return 'deep-orange lighten-3'
    } else {
      return 'green lighten-3'
    }
  },
  isPresent: function(state) {
    return state == 'Presente' ? '_on' : 'off'
  },
  hasHalfAttendance: function(state) {
    // For some reason "on" is overrided during initialization, so we use "_on"
    return state == 'Media Falta' ? '_on' : 'off'
  }
})
