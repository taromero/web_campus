Meteor.publish('users', function() {
  // don't know why autopublish only publish username and _id for users
  return Meteor.users.find()
})
