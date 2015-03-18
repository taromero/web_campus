Template.course_item.rendered = function() {
  $('ul.tabs').tabs()
  Blaze.renderWithData(Template.subjects_accordion, { course_id: this.data._id }, $('#subjects' + this.data._id)[0])
}

Template.course_item.events({
  'click .students-tab': function(event, context) {
    if (!studentsTabRendered) {
      Blaze.renderWithData(Template.students_accordion, { course_id: context.data._id }, $('.students-section')[0])
      $('.students-section .collapsible').collapsible()
      studentsTabRendered = true
    }
  },
  'click .attendances-tab': function(event, context) {
    if (!attendancesTabRendered) {
      Blaze.renderWithData(Template.attendances_collection, { course_id: context.data._id }, $('.attendances-section')[0])
      attendancesTabRendered = true
    }
  }
})

