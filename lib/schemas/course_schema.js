Schemas.Courses = new SimpleSchema({
  name: {
    label: 'Nombre',
    type: String
  }
})

Courses.attachSchema(Schemas.Courses)

Courses.autoTable = [
  { label: 'Nombre', name: 'name' }
]

Courses.iterableSample = function(i) {
  Courses.insert({
    name: DemoData.Courses.names.pop()
  })
}
