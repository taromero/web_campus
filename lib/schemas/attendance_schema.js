Schemas.Attendances = new SimpleSchema({
  state: {
    label: 'Asistencia',
    type: String,
    allowedValues: ['Ausente', 'Media Falta', 'Presente']
  },
  date: {
    label: 'Fecha',
    type: Date
  },
  course_id: {
    label: 'Curso',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Courses.find().map(Item.course)
      }
    }
  },
  user_id: {
    label: 'Alumno',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Meteor.users.find().map(Item.user)
      }
    }
  }
})

Attendances.attachSchema(Schemas.Attendances)

Attendances.autoTable = [
  { label: 'Fecha', name: 'date' },
  { label: 'Asistencia', name: 'state' },
  { label: 'Curso', name: 'course_id', template: 'courseLink' },
  { label: 'Alumno', name: 'user_id', template: 'userEmail' }
]
