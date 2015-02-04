Schemas.Courses = new SimpleSchema({
  name: {
    type: String
  }
})

Courses.attachSchema(Schemas.Courses)

Courses.autoTable = [
  { label: 'Name', value: 'name' }
]
