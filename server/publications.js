Meteor.publish('Users', function() {
  return Meteor.users.find()
})

Collections.forEach(function(collection) {
  Meteor.publish(collection.name, function() {
    return collection.find()
  })
})
