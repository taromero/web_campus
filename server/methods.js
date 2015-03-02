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
  },
  saveAttendances: function(attendances) {
    var course_id = Meteor.users.findOne(attendances[0].student_id).course_id
    attendances.forEach(function(attendance) {
      Attendances.insert({
        course_id: course_id,
        user_id: attendance.student_id,
        date: new Date(),
        state: attendance.state
      })
    })
  }
})
