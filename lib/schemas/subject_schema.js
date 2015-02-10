Schemas.Subjects = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  teacher_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
    options: function() {
      return Meteor.users.find({ roles: { $elemMatch: { $in: ['teacher'] } } },
                               { fields: { roles: 1, username: 1, _id: 1 } })
        .map(function(teacher) {
          return {
            label: teacher.username,
            value: teacher._id
          }
        })
      }
    }
  },
  courses_ids: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Courses.find().map(Item.course)
      }
    }
  }
})

Subjects.attachSchema(Schemas.Subjects)

Subjects.autoTable = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  { label: 'Teacher', name: 'teacher_id', collection: 'Meteor.users', collection_property: 'username'}
]

Subjects.iterableSample = function(teacher_id, courses_ids) {
  setRandomCourseIfNotDefined()
  if (!teacher_id) {
    var randomTeacher = Meteor.users.findOne({ roles: { $elemMatch: { $in: ['teacher'] } } })
    if (randomTeacher) {
      teacher_id = randomTeacher._id
    }
  }

  return function(i) {
    Subjects.insert({
      name: Fake.sentence(2),
      description: Fake.paragraph(10),
      teacher_id: teacher_id,
      courses_ids: courses_ids
    })
  }

  function setRandomCourseIfNotDefined() {
    courses_ids = courses_ids || []
    if (_(courses_ids).isEmpty()) {
      var randomCourse = Courses.findOne()
      if (randomCourse) {
        courses_ids.push(randomCourse._id)
      }
    }
  }
}

