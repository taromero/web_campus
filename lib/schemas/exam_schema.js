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

Exams.iterableSample = function(subject_id) {
  subject_id = setDefaultSubjectIfNotDefined()

  return function(i) {
    Exams.insert({
      title: Fake.word(),
      date: new Date(),
      description: Fake.paragraph(3),
      subject_id: subject_id
    })
  }

  function setDefaultSubjectIfNotDefined() {
    if (!subject_id) {
      var randomSubject = Subjects.findOne()
      if (randomSubject) {
        return randomSubject._id
      }
    }
    return subject_id
  }
}
