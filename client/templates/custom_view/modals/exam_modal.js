Template.exam_modal.events({
  'click .custom-modal-trigger': function(event) {
    var ct = event.currentTarget
    $('#exam_score_modal').remove()
    Blaze.renderWithData(Template.exam_score_modal, { exam_id: ct.getAttribute('value') }, $('#exam-score-modal-container')[0])
    $('#exam_score_modal').openModal();
  }
})

