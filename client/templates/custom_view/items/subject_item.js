Template.subject_item.helpers({
  subject: function() {
    return Subjects.findOne(this.subject_id)
  },
  exams: function(subjectId) {
    return Exams.find({ subject_id: subjectId })
  },
  resources: function(subjectId) {
    return Resources.find({ subject_id: subjectId })
  }
})

Template.subject_item.rendered = function() {
  initializeCollapsibleAndTabs()
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

