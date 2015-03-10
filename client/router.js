var isLoggedIn = Meteor.userId()
Router.configure({
  onBeforeAction: function() {
    var _this = this
    collapsibleInitialized = false
    requireLogin()
    onlyAllowDirectivesAndTeachersOnAdmin()
    authCreateEdit()

    if (onAdminRoute()) {
      // remove Materialize css (as it uses Bootstrap)
      $('link[href$="materialize.min.css"]').remove()
    }

    attempt_for_5_seconds_to(hide_audit_on_mobile)

    Tracker.autorun(function() {
      if (isLoggedIn != Meteor.userId()) {
        isLoggedIn = Meteor.userId()
        Meteor.userId() &&_this.redirect('/') 
      }
    })

    this.waitOn = function() {
      return Collections.map(function(collection) {
        return Meteor.subscribe(collection.name)
      }).concat([Meteor.subscribe('Users')])
    }

    this.next && this.next()

    function requireLogin() {
      var exceptedRoutes = ['/sign-in', '/sign-up', '/forgot-password']
      var path = window.location.pathname
      if (!_(exceptedRoutes).contains(path)) {
        AccountsEntry.signInRequired(_this)
      }
    }

    function onlyAllowDirectivesAndTeachersOnAdmin() {
      if (onAdminRoute()) {
        if (!_(['directive', 'teacher']).contains(getRole(Meteor.userId()))) {
          _this.redirect('/')
        }
      }
    }

    function onAdminRoute() {
      return _(window.location.pathname.split('/')).contains('admin')
    }

    function authCreateEdit() {
      var path_parts = window.location.pathname.split('/')
      var operation = path_parts.pop()
      var collection_name = path_parts.pop()
      if (_(['new', 'edit']).contains(operation)) {
        var user = Meteor.user()
        var role = getRole(Meteor.userId())
        if (role == 'directive') {
          return;
        }
        if (!(RoleAbilities[role].abilities[collection_name].save && RoleAbilities[role].abilities[collection_name].save(user))) {
          _this.redirect('/admin')
        }
      }
    }
  }
})

Router.route('/', {
  template: 'custom_view',
  controller: PreloadController,
  preload: {
    styles: '/materialize/css/materialize.min.css'
  }
})

Router.route('/home', function() {
  this.redirect('/')
})

