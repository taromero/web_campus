Template.exam_score_modal.helpers({
  students: function() {
    _that = this
    return Meteor.users.find({ course_id: Subjects.findOne(Exams.findOne(this.exam_id).subject_id).course_id }).map(addExamScore)

    function addExamScore(student) {
      var examScore = ExamScores.findOne({ exam_id: _that.exam_id, student_id: student._id })
      if (examScore) {
        student.examScore = examScore.score
      }
      return student
    }
  },
  exam: function() {
    return Exams.findOne(this.exam_id)
  }
})

Template.exam_score_modal.events({
  'click #save_scores': function(event, template) {
    _that = this
    template.$('.score').map(getData).each(upsertScores)

    function getData(index, scoreInput) {
      return {
        student_id: scoreInput.id,
        score: scoreInput.value
      }
    }

    function upsertScores(index, ss) {
      Meteor.call('upsertScores', { student_id: ss.student_id, exam_id: _that.exam_id, score: ss.score})
    }
  }
})

