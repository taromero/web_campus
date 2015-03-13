Schemas.PeriodsScores = new SimpleSchema({
  score_card_subject_id: {
    label: 'Materia de Boletin',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return ScoreCardSubjects.find().map(Item.scoreCard)
      }
    }
  },
  period: {
    label: 'Periodo',
    type: String,
    allowedValues: PERIODS
  },
  score: {
    label: 'Nota',
    type: Number,
    decimal: true,
    min: 0,
    max: 10,
    optional: true
  }
})

PeriodsScores.attachSchema(Schemas.PeriodsScores)

