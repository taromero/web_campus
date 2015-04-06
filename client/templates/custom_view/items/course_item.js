Template.course_item.rendered = function() {
  // render the templates this way so the transition is smoother on mobile devices
  Blaze.renderWithData(Template.subjects_collection, { course_id: this.data._id }, $('#materias')[0])
  Blaze.renderWithData(Template.students_collection, { course_id: this.data._id }, $('.students-section')[0])
  Blaze.renderWithData(Template.attendances_collection, { course_id: this.data._id }, $('.attendances-section')[0])

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

