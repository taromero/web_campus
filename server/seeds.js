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
    var directive_id = createUser._createUser(i, 'd', 'directive')
    Roles.addUsersToRoles(directive_id, ['admin'])
  },
  teacher: function(i) {
    var teacher_id = createUser._createUser(i, 't', 'teacher')
    Roles.addUsersToRoles(teacher_id, ['admin'])
  },
  parent: function(i) {
    var parent_id = createUser._createUser(i, 'p', 'parent')
    Meteor.users.update(parent_id, { $set: {
      dependant_ids: Meteor.users.find().fetch().filter(onlyStudents).map(getIds)
    }})
  },
  student: function(i) {
    var student_demo_data = DemoData.Students.pop()
    var student_id = createUser._createUser(i, student_demo_data.email, 'student')
    Meteor.users.update(student_id, { $set: {
      course_id: Courses.findOne()._id,
      'profile.firstName': student_demo_data.firstName,
      'profile.lastName': student_demo_data.lastName,
      subject_ids: Subjects.find().map(function(s) { return s._id })
    }})
  },
  _createUser: function(i, email, role) {
    var user_id = Accounts.createUser({
      email: email.indexOf('@') > -1 ? email : (email + i + '@m.com'),
      password: '1'
    })
    Roles.addUsersToRoles(user_id, [role])
    Meteor.users.update(user_id, { $set: { profile: Schemas.UserProfile.iterableSample(i) } })
    return user_id
  }
}

