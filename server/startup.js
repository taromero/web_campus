Meteor.startup(function() {
  AccountsEntry.config({
    signupCode: 'enigma_secret_sdfw4rasdfg'
  })
  if (Meteor.users.find().count() <= 0) {
    Seed.create(12).courses()
    Seed.create(1).directives()
    Seed.create(2).teachers()
    Seed.create(14).students()
    Seed.create(14).subjects()
    Seed.create(14).exams()
    Seed.create(50).examScores()
  }
})
