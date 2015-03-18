Schemas.ScoreCardSubjects = new SimpleSchema({
  subject_id: {
    label: 'Materia',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  score_card_id: {
    label: 'Boletin',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

ScoreCardSubjects.attachSchema(Schemas.ScoreCardSubjects)

