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
    type: String
  },
  subject_id: {
    label: 'Materia',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

Exams.attachSchema(Schemas.Exams)

Exams.iterableSample = function(subject_id) {
  subject_id = setDefaultSubjectIfNotDefined()

  return function(i) {
    Exams.insert({
      title: DemoData.Exams.titles.pop(),
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
