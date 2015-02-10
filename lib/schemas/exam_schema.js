Schemas.Exams = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  date: {
    type: Date
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  subject_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Subjects.find().map(Item.subject)
      } 
    }
  }
})

Exams.attachSchema(Schemas.Exams)

Exams.autoTable = [
  { label: 'Title', name: 'title' },
  { label: 'Date', name: 'date' },
  { label: 'Description', name: 'description' },
  { label: 'Subject', name: 'subject_id', collection: 'Subjects', collection_property: 'name' },
]

