Schemas.ExamScores = new SimpleSchema({
  score: {
    label: 'Nota',
    type: Number,
    decimal: true,
    min: 0,
    max: 10
  },
  student_id: {
    label: 'Alumno',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  exam_id: {
    label: 'Examen',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

ExamScores.attachSchema(Schemas.ExamScores)

ExamScores.iterableSample = function(student_id, exam_id) {
  if (!student_id) {
    var randomUser = Meteor.users.findOne()
    if (randomUser) {
      student_id = randomUser._id
    }
  }

  if (!exam_id) {
    var randomExam = Exams.findOne()
    if (randomExam) {
      exam_id = randomExam._id
    }
  }

  return function() {
    ExamScores.insert({
      score: ~~(Math.random() * 10),
      student_id: student_id,
      exam_id: exam_id
    })
  }
}

