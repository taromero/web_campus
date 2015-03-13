Router.plugin('ensureSignedIn', {
  except: ['atSignIn', 'atForgotPassword', 'atResetPwd']
});

Router.route('/', {
  template: 'custom_view'
})

Router.route('/asistencias', {
  template: 'attendances_read_only'
})

Router.route('/home', function() {
  this.redirect('/')
})

Router.route('/boletin', {
  template: 'score_card_with_header'
})

var isLoggedIn = Meteor.userId()
Router.configure({
  loadingTemplate: 'loading',
  onBeforeAction: function() {
    var _this = this
    collapsibleInitialized = false
    onlyAllowDirectivesAndTeachersOnAdmin()
    authCreateEdit()

    if (onAdminRoute()) {
      // remove Materialize css (as it uses Bootstrap)
      $('link[href$="materialize.min.css"]').remove()
    }

    attempt_for_5_seconds_to(hide_audit_on_mobile)
    attempt_for_5_seconds_to(normalize_admin_navbar)

    this.waitOn = function() {
      return Collections.map(function(collection) {
        return Meteor.subscribe(collection.name)
      }).concat([
        Meteor.subscribe('Users'),
        Meteor.subscribe('attendances_for_student')
      ])
    }

    this.next && this.next()

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

    function normalize_admin_navbar() {
      $('.admin-layout [role="navigation"]').css('width', 'inherit')
    }
  }
})

