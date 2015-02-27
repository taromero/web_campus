Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY')
});

Template.registerHelper('formatDateTime', function(date) {
  return moment(date).format('DD-MM-YYYY hh:mm a')
});

Template.registerHelper('showIf', function(condition) {
  return {
    class: condition ? '' : 'hide'
  }
});

Template.registerHelper('adminAllowed', function() {
  return _(['directive', 'teacher']).contains(getRole(Meteor.userId()))
})

initializeCollapsibleAndTabs = function() {
  if (collapsibleInitialized) {
    return
  }
  $('.collapsible').collapsible()
  // Workaround to avoid run condition between meteor and materialize
  // unbind and bind to prevent multiple bindings to the same event handler
  $('.collapsible-header').unbind('click.initializetabs').bind('click.initializetabs', initializeTabs)

  collapsibleInitialized = true

  function initializeTabs() {
    var that = this
    _initializeTabs()
    setTimeout(_initializeTabs, 200)

    function _initializeTabs() {
      $(that).siblings('.collapsible-body').find('ul.tabs').first().tabs()
    }
  }
}
