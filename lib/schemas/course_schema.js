Schemas.Courses = new SimpleSchema({
  name: {
    label: 'Nombre',
    type: String
  }
})

Courses.attachSchema(Schemas.Courses)

