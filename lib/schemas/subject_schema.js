Schemas.Subjects = new SimpleSchema({
  name: {
    label: 'Nombre',
    type: String
  },
  description: {
    label: 'Descripcion',
    type: String
  },
  teacher_id: {
    label: 'Profesor',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  course_id: {
    label: 'Curso',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

Subjects.attachSchema(Schemas.Subjects)

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
      name: DemoData.Subjects.names.pop(),
      description: Fake.paragraph(10),
      teacher_id: teacher_id,
      course_id: course_id
    })
  }
}

