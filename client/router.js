Router.configure({
  onBeforeAction: function() {
    var _this = this
    requireLogin()
    this.next && this.next()

    function requireLogin() {
      var exceptedRoutes = ['/sign-in', '/sign-up', '/forgot-password']
      var path = Router.current().route.path()
      if (!_(exceptedRoutes).contains(path)) {
        AccountsEntry.signInRequired(_this)
      }
    }
  }
})

Router.route('/', function() {
  this.render('home')
})
