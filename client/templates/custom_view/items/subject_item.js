Template.subject_item.helpers({
  subject: function() {
    return Subjects.findOne(this.subject_id)
  },
  exams: function(subjectId) {
    return Exams.find({ subject_id: subjectId })
  },
  resources: function(subjectId) {
    return Resources.find({ subject_id: subjectId })
  },
  addColumnSize: function(isAdmin) {
    return {
      class: 'col s12' + (isAdmin ? 'm6' : '')
    }
  },
  scoreFor: scoreFor,
  scoreColor: function(exam_id) {
    var score = scoreFor(exam_id)
    return score >= 7 ? 'blue lighten-2' : 'red lighten-2'
  }
})

function scoreFor(exam_id) {
  var exam_score = ExamScores.findOne({ exam_id: exam_id, student_id: Meteor.userId() })
  return exam_score && exam_score.score
}

Template.subject_item.events({
  'click .deleteResource': function(event) {
    var id = event.currentTarget.id
    swal({
      title: "Borrar archivo?",
      text: "El archivo se borrara de forma permanente.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Borrar!",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false
    }, function() {
      Meteor.call('deleteResource', id, function(err, res) {
        if (!err) {
          swal("Borrado!", "El archivo se borro exitosamente.", "success")
        } else {
          swal('Error al intentar borrar el archivo', err, 'error')
        }
      })
    })
  }
})

Template.subject_item.rendered = function() {
  $('ul.tabs').tabs()
  setTimeout(fixTabSelection, 500)
  $('.tab-header').click(updateLocationHash)

  function fixTabSelection() {
    //hack to get the tab selected
    $('ul.tabs').tabs()
  }

  function updateLocationHash(event) {
    history.replaceState({}, '', $(event.currentTarget).attr('href'))
  }
}

