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

Template.registerHelper('hideIf', function(condition) {
  return {
    class: condition ? 'hide' : ''
  }
});

Template.registerHelper('contentEditableForDirectives', function() {
  return { contentEditable: isDirective() ? 'true' : 'false' }
})

Template.registerHelper('adminAllowed', function() {
  return isAdmin()
})

Template.registerHelper('isDirective', function() {
  return isDirective()
})

Template.registerHelper('parent', function() {
  return getRole(Meteor.userId()) == 'parent'
})

Template.registerHelper('spacesForUnderscores', function(string) {
  return string.replace(/ /g,"_")
})

Template.registerHelper('currentPath', function() {
  return Iron.Location.get().path
})

initializeTabs = function(template) {
  // Workaround to avoid run condition between meteor and materialize
  // unbind and bind to prevent multiple bindings to the same event handler
  $('.collapsible-header').unbind('click.initializetabs').bind('click.initializetabs', _initializeTabs)

  collapsibleInitialized = true

  function _initializeTabs() {
    var that = this
    __initializeTabs()
    setTimeout(_initializeTabs, 200)

    function __initializeTabs() {
      template.$('ul.tabs.subjectTabs').first().tabs()
    }
  }
}

function isAdmin() {
  return _(['directive', 'teacher']).contains(getRole(Meteor.userId()))
}

function isDirective() {
  return getRole(Meteor.userId()) == 'directive'
}

