Router.configure({
  onBeforeAction: function() {
    var _this = this
    requireLogin()
    authCreateEdit()
    this.next && this.next()

    function requireLogin() {
      var exceptedRoutes = ['/sign-in', '/sign-up', '/forgot-password']
      var path = window.location.pathname
      if (!_(exceptedRoutes).contains(path)) {
        AccountsEntry.signInRequired(_this)
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
            _this.redirect('/')
          }
        })
      }
    }
  }
})

Router.route('/', function() {
  this.redirect('/admin')
})

Router.route('mat', function() {
  this.render('teacher_view')
})
