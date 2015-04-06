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
  'click #update-score-card': function(event, context) {
    var period_scores = []
    var $base = $(event.currentTarget).closest('.container')
    $base.find('.score-cell').each(function(i, sc) {
      period_scores.push({
        period_score_id: sc.id,
        score: sc.innerText
      })
    })
    $('.score-card-progress').show()
    $('.score-card-container').html('')
    Meteor.call('updateScoreCard', period_scores, function(err, res) {
      Blaze.renderWithData(Template.score_card, { student_id: context.data.student_id }, $('.score-card-container')[0])
      $('.score-card-progress').hide()
    })
  }
})
