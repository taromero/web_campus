Router.configure({
  onBeforeAction: function() {
    var _this = this
    requireLogin()
    onlyAllowDirectivesAndTeachersOnAdmin()
    authCreateEdit()

    attempt_for_5_seconds_to(hide_audit_on_mobile)

    this.next && this.next()

    function requireLogin() {
      var exceptedRoutes = ['/sign-in', '/sign-up', '/forgot-password']
      var path = window.location.pathname
      if (!_(exceptedRoutes).contains(path)) {
        AccountsEntry.signInRequired(_this)
      }
    }

    function onlyAllowDirectivesAndTeachersOnAdmin() {
      if (_(window.location.pathname.split('/')).contains('admin')) {
        provideUserAndRole(Meteor.userId(), function(user, role) {
          if (!_(['directive', 'teacher']).contains(role)) {
            _this.redirect('/')
          }
        })
      }
    }

    function authCreateEdit() {
      var path_parts = window.location.pathname.split('/')
      var operation = path_parts.pop()
      var collection_name = path_parts.pop()
      if (_(['new', 'edit']).contains(operation)) {
        provideUserAndRole(Meteor.userId(), function(user, role) {
          if (role == 'directive') {
            return;
          }
          if (!(RoleAbilities[role].abilities[collection_name].save && RoleAbilities[role].abilities[collection_name].save(user))) {
            _this.redirect('/admin')
          }
        })
      }
    }
  }
})

Router.route('/', function() {
  this.render('custom_view')
  this.waitOn = function() {
    return [Meteor.subscribe('users')]
  }
})

