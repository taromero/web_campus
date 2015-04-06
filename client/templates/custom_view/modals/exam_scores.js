Template.exam_scores.helpers({
  students: function() {
    that = this
    return Meteor.users.find({ course_id: this.course_id }).map(addExamScore)

    function addExamScore(student) {
      var examScore = ExamScores.findOne({ exam_id: that.exam_id, student_id: student._id })
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

Template.exam_scores.events({
  'click #save_scores': function(event, template) {
    that = this
    upsertScores(template.$('.score').map(getData).toArray())

    function getData(index, scoreInput) {
      return {
        student_id: scoreInput.id,
        score: scoreInput.value,
        exam_id: that.exam_id
      }
    }

    function upsertScores(student_ids_and_scores) {
      $('.scores-progress').show()
      Meteor.call('upsertScores', student_ids_and_scores, function(err, msg) {
        swal({
          title: err ? 'Error al guardar notas. Intentalo de nuevo.' : 'Notas guardadas!',
          type: err ? 'error' : 'success'
        })
        $('.scores-progress').hide()
      })
    }
  }
})

