Schemas.Exams = new SimpleSchema({
  title: {
    label: 'Titulo',
    type: String,
    max: 60
  },
  date: {
    label: 'Fecha',
    type: Date
  },
  description: {
    label: 'Descripcion',
    type: String,
    autoform: {
      rows: 5
    }
  },
  subject_id: {
    label: 'Materia',
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
  { label: 'Titulo', name: 'title' },
  { label: 'Fecha', name: 'date' },
  { label: 'Descripcion', name: 'description' },
  { label: 'Materia', name: 'subject_id', collection: 'Subjects', collection_property: 'name' },
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
