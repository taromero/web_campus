Meteor.publish('Users', function() {
  if (this.userId) {
    return Meteor.users.find()
  } else {
    return []
  }
})

Collections.forEach(function(collection) {
  Meteor.publish(collection.name, function() {
    if (this.userId) {
      return collection.find()
    } else {
      return []
    }
  })
})

