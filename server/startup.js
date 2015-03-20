Meteor.startup(function() {
  process.env.MAIL_URL = generateMailUrl()
  if (Meteor.users.find().count() <= 0) {
    Seed.all()
    Seed.create(14).exams()
    Seed.create(50).examScores()
  }
  // apply role filters (based on user's role) after seeding the app
  RoleAbilities.apply()

  function generateMailUrl() {
    var smtp = Meteor.settings.smtp
    return 'smtp://' + smtp.username + ':' + smtp.password + '@' + smtp.host + ':' + smtp.port
  }
})
