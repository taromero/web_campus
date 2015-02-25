Schemas.ExamScores = new SimpleSchema({
  score: {
    label: 'Nota',
    type: Number,
    decimal: true,
    min: 0,
    max: 10
  },
  user_id: {
    label: 'Alumno',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Meteor.users.find().map(Item.user)
      }
    }
  },
  exam_id: {
    label: 'Examen',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Exams.find().map(Item.exam)
      }
    }
  }
})

ExamScores.attachSchema(Schemas.ExamScores)

ExamScores.autoTable = [
  { label: 'Nota', name: 'score' },
  { label: 'Alumno', name: 'user_id', collection: 'Meteor.users', collection_property: 'username' },
  { label: 'Examen', name: 'exam_id', collection: 'Exams', collection_property: 'name' }
]

ExamScores.iterableSample = function(user_id, exam_id) {
  if (!user_id) {
    var randomUser = Meteor.users.findOne()
    if (randomUser) {
      user_id = randomUser._id
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
      user_id: user_id,
      exam_id: exam_id
    })
  }
}

