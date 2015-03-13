Template.score_card.helpers({
  score_card: function() {
    var student_id = this.student_id || Meteor.userId()
    var score_card = ScoreCards.findOne({ student_id: student_id })
    if (!score_card) {
      return
    }
    score_card.subjects = ScoreCardSubjects.find({ score_card_id: score_card._id }).map(function(scs) {
      scs.name = Subjects.findOne(scs.subject_id).name
      scs.periods_scores = PeriodsScores.find({ score_card_subject_id: scs._id })
      return scs
    })

    return score_card
  },
  periods: function() {
    return PERIODS
  }
})

Template.score_card.events({
  'click #update-score-card': function(event) {
    var period_scores = []
    var $base = $(event.currentTarget).closest('.table-responsive')
    $base.find('.score-cell').each(function(i, sc) {
      console.log(sc.innerText)
      period_scores.push({
        period_score_id: sc.id,
        score: sc.innerText
      })
    })
    $base.find('.score-card-progress').show()
    Meteor.call('updateScoreCard', period_scores, function(err, res) {
      var message = err ? { title: err, type: 'error' } : { title: 'Boletin actualizado!', type: 'success' }
      swal(message)
      $base.find('.score-card-progress').hide()
    })
  }
})
