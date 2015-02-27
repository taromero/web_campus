Meteor.publish('Users', function() {
  if (this.userId) {
    return Meteor.users.find({}, { sort: { 'profile.lastName': 1, 'profile.firstName': 1 } })
  } else {
    return []
  }
})

Collections.forEach(function(collection) {
  Meteor.publish(collection.name, function() {
    if (this.userId) {
      return collection.find({}, collection.defaultOptions)
    } else {
      return []
    }
  })
})

