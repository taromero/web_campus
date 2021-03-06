Meteor.methods({
  upsertScores: function(student_ids_and_scores) {
    student_ids_and_scores.forEach(function(ss) {
      var student_id = ss.student_id
      var exam_id = ss.exam_id
      var score = ss.score
      var selector = { student_id: student_id, exam_id: exam_id }
      var data = {
        student_id: student_id,
        exam_id: exam_id,
        score: score
      }
      if (ExamScores.findOne(selector)) {
        ExamScores.update(selector, { $set: data })
      } else {
        ExamScores.insert(data)
      }
    })
  },
  saveAttendances: function(attendances) {
    var course_id = Meteor.users.findOne(attendances[0].student_id).course_id
    var selector = {
      course_id: course_id,
      date: { $gt: moment().subtract(1, 'day')._d, $lt: moment().add(1, 'day')._d }
    }
    attendances.forEach(function(attendance) {
      selector.student_id = attendance.student_id
      var values = {
        course_id: course_id,
        student_id: attendance.student_id,
        date: new Date(),
        state: attendance.state
      }
      if (Attendances.findOne(selector)) {
        Attendances.update(selector, {
          $set: values
        })
      } else {
        Attendances.insert(values)
      }
    })
  },
  createResource: function(name, downloadUrl, fileType) {
    Resources.insert({
      subject_id: Subjects.findOne()._id,
      name: name,
      url: downloadUrl,
      type: fileType
    })
  },
  deleteResource: function(resourceId) {
    var resource = Resources.findOne(resourceId)
    s3.deleteFile(resource.url)
    Resources.remove(resourceId)
  },
  updateScoreCard: function(periodScores) {
    periodScores.forEach(function(ps) {
      PeriodsScores.update(ps.period_score_id, { $set: { score: ps.score } })
    })
  },
  updateExam: function(exam) {
    var id = exam._id
    delete exam._id
    console.log(exam)
    Exams.update(id, { $set: exam })
  }
})


