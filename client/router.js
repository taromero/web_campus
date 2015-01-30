Router.configure({
  onBeforeAction: function() {
    AccountsEntry.signInRequired(this)
    this.next()
  }
})

Router.route('/', function() {
  this.render('home')
})
