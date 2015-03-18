Meteor.publish('Users', function() {
  if (this.userId) {
    return Meteor.users.find({  }, {
      fields: { profile: 1, emails: 1, role: 1, course_id: 1, subject_ids: 1, dependant_ids: 1,
                createdAt: 1, updatedAt: 1, createdBy: 1, lastUpdatedBy: 1 },
      sort: { 'profile.lastName': 1, 'profile.firstName': 1 } })
  } else {
    return []
  }
})

Collections.forEach(function(collection) {
  Meteor.publish(collection.name, function() {
    if (this.userId) {
      return collection.find(collection.defaultSelector || {}, collection.defaultOptions)
    } else {
      return []
    }
  })
})

Meteor.publish('attendances_for_student', function() {
  if (this.userId) {
    // Attendances find hook takes care of publishing only relevant records
    return Attendances.find()
  } else {
    return []
  }
})

