Schemas.ScoreCards = new SimpleSchema({
  student_id: {
    label: 'Alumno',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Meteor.users.find().map(Item.user)
      }
    }
  },
  date: {
    label: 'Fecha',
    type: Date,
    optional: true
  }
})

ScoreCards.attachSchema(Schemas.ScoreCards)

ScoreCards.createFor = function(student_id) {
  if (!ScoreCards.findOne({ student_id: student_id })) {
    var sc_id = ScoreCards.insert({ student_id: student_id })
    var student = Meteor.users.findOne(student_id)
    Subjects.find({ course_id: student.course_id }).forEach(function(subject) {
      var scoreCardSubjectId = ScoreCardSubjects.insert({
        score_card_id: sc_id,
        subject_id: subject._id
      })
      PERIODS.forEach(function(period) {
        PeriodsScores.insert({
          score_card_subject_id: scoreCardSubjectId,
          period: period,
        })
      })
    })
  }
}

