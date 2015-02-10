Meteor.startup(function() {
  AccountsEntry.config({
    dashboardRoute: '/admin',
    passwordSignupFields: 'EMAIL_ONLY',
    showSignupCode: true
  })
  if (Meteor.users.find().count() <= 0) {
    Seed.create(1).directives()
    Seed.create(2).teachers()
    Seed.create(4).students()
    Seed.create(10).courses()
    Seed.create(30).subjects()
    Seed.create(20).exams()
    Seed.create(50).examScores()
  }
})
