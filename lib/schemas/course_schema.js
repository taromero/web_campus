Schemas.Courses = new SimpleSchema({
  name: {
    type: String
  }
})

Courses.attachSchema(Schemas.Courses)

Courses.autoTable = [
  { label: 'Name', name: 'name' }
]

Courses.iterableSample = function(i) {
  Courses.insert({
    name: Fake.word()
  })
}
