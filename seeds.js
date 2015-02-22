Seed = {
  create: function(number) {
    var range = Array.apply(null, { length: number }).map(Number.call, Number)
    return {
      directives: function() {
        range.forEach(createUser.directive)
      },
      teachers: function() {
        range.forEach(createUser.teacher)
      },
      parents: function() {
        range.forEach(createUser.parent)
      },
      students: function() {
        range.forEach(createUser.student)
      },
      courses: function() {
        range.forEach(Courses.iterableSample)
      },
      subjects: function(teacher_id, course_id) {
        range.forEach(Subjects.iterableSample(teacher_id, course_id))
      },
      exams: function(subject_id) {
        range.forEach(Exams.iterableSample(subject_id))
      },
      examScores: function(user_id, exam_id) {
        range.forEach(ExamScores.iterableSample(user_id, exam_id))
      }
    }
  }
}

var createUser  = {
  directive: function (i) {
    createUser._createUser(i, 'aDirective', 'd', 'directive')
  },
  teacher: function(i) {
    createUser._createUser(i, 'aTeacher', 't', 'teacher')
  },
  parent: function(i) {
    createUser._createUser(i, 'aParent', 'p', 'parent')
  },
  student: function(i) {
    var student_id = createUser._createUser(i, 'aStudent', 's', 'student')
    Meteor.users.update(student_id, { $set: { course_id: Courses.findOne()._id }})
  },
  _createUser: function(i, username, email_prefix, role) {
    var user_id = Accounts.createUser({
      username: username + i,
      email: email_prefix + i + '@m.com',
      password: '1'
    })
    Roles.addUsersToRoles(user_id, ['admin', role])
    Meteor.users.update(user_id, { $set: { profile: Schemas.UserProfile.iterableSample(i) } })
    return user_id
  }
}

