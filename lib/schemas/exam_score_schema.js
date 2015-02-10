Schemas.ExamScores = new SimpleSchema({
  score: {
    type: Number,
    decimal: true,
    min: 0,
    max: 10
  },
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Meteor.users.find().map(Item.user)
      }
    }
  },
  exam_id: {
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
  { label: 'Score', name: 'score' },
  { label: 'Student', name: 'user_id', collection: 'Meteor.users', collection_property: 'username' },
  { label: 'Exam', name: 'exam_id', collection: 'Exams', collection_property: 'name' }
]

