var isLoggedIn = Meteor.userId()
Router.configure({
  onBeforeAction: function() {
    var _this = this
    collapsibleInitialized = false
    requireLogin()
    onlyAllowDirectivesAndTeachersOnAdmin()
    authCreateEdit()

    if (onAdminRoute() || onSessionRoute()) {
      // remove Materialize css (as it uses Bootstrap)
      $('link[href$="materialize.min.css"]').remove()
    }

    attempt_for_5_seconds_to(hide_audit_on_mobile)
    attempt_for_5_seconds_to(hide_register_section_on_sign_in)

    Tracker.autorun(function() {
      if (isLoggedIn != Meteor.userId()) {
        isLoggedIn = Meteor.userId()
        Meteor.userId() &&_this.redirect('/') 
      }
    })

    this.waitOn = function() {
      return Collections.map(function(collection) {
        return Meteor.subscribe(collection.name)
      }).concat([
        Meteor.subscribe('Users'),
        Meteor.subscribe('attendances_for_student')
      ])
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
      var _path = _(window.location.pathname.split('/'))
      return _path.contains('admin')
    }

    function onSessionRoute() {
      var path = Router.current().route.path()
      return path == '/sign-in'
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

    function hide_register_section_on_sign_in() {
      $('.entry-signup-cta').hide()
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

Router.route('/asistencias', {
  template: 'attendances_student_collection',
  controller: PreloadController,
  preload: {
    styles: '/materialize/css/materialize.min.css'
  }
})

Router.route('/home', function() {
  this.redirect('/')
})

