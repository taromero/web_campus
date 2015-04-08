Template.exam_item.events({
  'click #update_exam': function(evt, context) {
  Meteor.call('updateExam', {
      _id: context.data.exam._id,
      title: $('#title').text(),
      date: moment($('#date').text(), 'DD-MM-YYYY').format(),
      description: $('#description').text()
    }, function(err, res) {
      swal('Actualizado!', 'Examen actualizado correctamente.', 'success')
    })
  }
})
