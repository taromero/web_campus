Meteor.methods({
  upsertScores: function(params) {
    var selector = { user_id: params.user_id, exam_id: params.exam_id }
    var data = {
      user_id: params.user_id,
      exam_id: params.exam_id,
      score: params.score
    }
    if (ExamScores.findOne(selector)) {
      ExamScores.update(selector, { $set: data })
    } else {
      ExamScores.insert(data)
    }
  }
})
