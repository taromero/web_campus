Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY')
});

Template.registerHelper('showIf', function(condition) {
  return {
    class: condition ? '' : 'hide'
  }
});

Template.registerHelper('adminAllowed', function() {
  return provideUserAndRole(Meteor.userId(), function(user, role) {
    return _(['directive', 'teacher']).contains(role)
  })
})
