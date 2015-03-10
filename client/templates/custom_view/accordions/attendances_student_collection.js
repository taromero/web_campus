Template.attendances_student_collection.helpers({
  attendances: function() {
    var student_id = this.student_id || Meteor.userId()
    return Attendances.find({ student_id: student_id })
  },
  colorFor: function(state) {
    if (state == 'Presente') {
      return 'green lighten-3'
    } else if(state == 'Media Falta') {
      return 'orange lighten-3'
    } else if (state == 'Ausente') {
      return 'red lighten-2'
    }
  },
  count: function(param) {
    var student_id = this.student_id || Meteor.userId()
    if (param != 'a+ha') {
      return Attendances.find({ student_id: student_id, state: param}).count()
    } else {
      var absentCount = Attendances.find({ student_id: student_id, state: 'Ausente' }).count()
      var halfAbsentCount = Attendances.find({ student_id: student_id, state: 'Media Falta' }).count()
      return absentCount + halfAbsentCount/2
    }
  },
  dateWithDayName: function(date) {
    return getDayName() + ' ' + moment(date).format('DD-MM-YYYY')

    function getDayName() {
      var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
      var dayNum = new Date(date).getDay()
      return dayNames[dayNum]
    }
  }
})
