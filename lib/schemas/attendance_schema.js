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
    regEx: SimpleSchema.RegEx.Id
  },
  student_id: {
    label: 'Alumno',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

Attendances.attachSchema(Schemas.Attendances)

