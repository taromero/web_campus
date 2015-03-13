Schemas.ScoreCardSubjects = new SimpleSchema({
  subject_id: {
    label: 'Materia',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Subjects.find().map(Item.subject)
      } 
    }
  },
  score_card_id: {
    label: 'Boletin',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return ScoreCards.find().map(Item.scoreCard)
      }
    }
  }
})

ScoreCardSubjects.attachSchema(Schemas.ScoreCardSubjects)

