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
  course_id: {
    type: String,
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

Subjects.iterableSample = function(teacher_id, course_id) {
  if (!course_id) {
    var randomCourse = Courses.findOne()
    course_id = randomCourse && randomCourse._id
  }
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
      course_id: course_id
    })
  }
}

