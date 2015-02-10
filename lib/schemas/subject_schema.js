Schemas.Subjects = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  courses_ids: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Courses.find().map(Item.course)
      }
    }
  }
})

Subjects.attachSchema(Schemas.Subjects)

Subjects.autoTable = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
]

