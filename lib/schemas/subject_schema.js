Schemas.Subjects = new SimpleSchema({
  name: {
    label: 'Nombre',
    type: String
  },
  description: {
    label: 'Descripcion',
    type: String
  },
  teacher_id: {
    label: 'Profesor',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  course_id: {
    label: 'Curso',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

Subjects.attachSchema(Schemas.Subjects)

