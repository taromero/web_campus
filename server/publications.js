securePublish('Users', function(opts) {
  var selector = slugSelector(opts)
  return Meteor.users.find(selector, {
    fields: { profile: 1, emails: 1, roles: 1, course_id: 1, subject_ids: 1, dependant_ids: 1,
              createdAt: 1, updatedAt: 1, createdBy: 1, lastUpdatedBy: 1 },
    sort: { 'profile.lastName': 1, 'profile.firstName': 1 } })
})

Collections.forEach(function(collection) {
  securePublish(collection.name, function(opts) {
    var selector = collection.defaultSelector || {}
    _.extend(selector, idSelector(opts))
    _.extend(selector, slugSelector(opts))
    _.extend(selector, nameSelector(collection, opts))
    _.extend(selector, titleSelector(collection, opts))
    return collection.find(selector, collection.defaultOptions)
  })
})

function idSelector(opts) {
  var selector = {}
  if (opts._id) {
    selector._id = opts._id
  }
  return selector
}

function nameSelector(collection, opts) {
  var selector = {}
  if (opts.name) {
    var entity = collection.findOne({ name: dashesToSpaces(opts.name) })
    selector._id = entity._id
  }
  return selector
}

function titleSelector(collection, opts) {
  var selector = {}
  if (opts.title) {
    var entity = collection.findOne({ title: dashesToSpaces(opts.title) })
    selector._id = entity._id
  }
  return selector
}

function slugSelector(opts) {
  var selector = {}
  if (opts.course_name) {
    var course = Courses.findOne({ name: dashesToSpaces(opts.course_name) })
    selector.course_id = course._id
  }
  if (opts.exam_title) {
    var exam = Exams.findOne({ title: dashesToSpaces(opts.exam_title) })
    selector.exam_id = exam._id
  }
  return selector
}

function securePublish(name, publishFn) {
  Meteor.publish(name, function(opts) {
    if (this.userId) {
      opts = opts || {}
      return publishFn(opts)
    } else {
      return []
    }
  })
}
