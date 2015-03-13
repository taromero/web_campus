Template.score_card.helpers({
  score_card: function() {
    var student_id = this.student_id || Meteor.userId()
    var score_card = ScoreCards.findOne({ student_id: student_id })
    if (!score_card) {
      throw 'No score card for student: ' + student_id
    }
    score_card.subjects = ScoreCardSubjects.find({ score_card_id: score_card._id }).map(function(scs) {
      scs.name = Subjects.findOne(scs.subject_id).name
      scs.periods_scores = PeriodsScores.find({ score_card_subject_id: scs._id })
      return scs
    })

    return score_card
  }
})
