isAdmin = -> _(['directive', 'teacher']).contains(Meteor.user()?.role)
isDirective = -> Meteor.user()?.role == 'directive'

Template.registerHelper 'formatDate', (date) -> moment(date).format('DD-MM-YYYY')

Template.registerHelper 'formatDateTime', (date) -> moment(date).format('DD-MM-YYYY hh:mm a')

Template.registerHelper 'showIf', (condition) -> { class: condition ? '' : 'hide' }

Template.registerHelper 'hideIf', (condition) -> { class: condition ? 'hide' : '' }

Template.registerHelper 'contentEditableForDirectives', -> { contentEditable: isDirective() ? 'true' : 'false' }

Template.registerHelper 'adminAllowed', -> isAdmin()

Template.registerHelper 'isDirective', -> isDirective()

Template.registerHelper 'parent', -> Meteor.user()?.role == 'parent'

Template.registerHelper 'spacesForUnderscores', (string) -> string.replace(/// ///g,"_")

Template.registerHelper('currentPath', -> Iron.Location.get().path)

initializeTabs = (template) ->
  _initializeTabs = ->
    __initializeTabs = -> template.$('ul.tabs.subjectTabs').first().tabs()
    __initializeTabs()
    setTimeout(_initializeTabs, 200)

  # Workaround to avoid run condition between meteor and materialize
  # unbind and bind to prevent multiple bindings to the same event handler
  $('.collapsible-header').unbind('click.initializetabs').bind('click.initializetabs', _initializeTabs)

  collapsibleInitialized = true

