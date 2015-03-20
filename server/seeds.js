Seed = {
  all: function() {
    createStudents()
    createAdmin('teacher')
    createAdmin('directive')
    createSubjects()

    function createAdmin(role) {
      console.log('Seeding', role)
      var directives_sheet = new GoogleSpreadsheet(Meteor.settings.spreadsheet[role + 's_file_id'])
      directives_sheet.setAuth(Meteor.settings.spreadsheet.username, Meteor.settings.spreadsheet.password)
      var directive_rows = directives_sheet.getRows(1)
      directive_rows.forEach(createDirective)

      function createDirective(row) {
        var user_id = Accounts.createUser({
          email: row.email,
          password: row.dni
        })
        Roles.addUsersToRoles(user_id, [role])
        Meteor.users.update(user_id, { $set: {
          'profile.firstName': row.nombre,
          'profile.lastName': row.apellido,
          'profile.phoneNumber': row.telefono
        }})
      }
    }

    function createStudents() {
      console.log('Seeding students')
      Meteor.settings.spreadsheet.student_files.forEach(function(student_file_id) {
        var students_sheet = new GoogleSpreadsheet(student_file_id)
        students_sheet.setAuth(Meteor.settings.spreadsheet.username, Meteor.settings.spreadsheet.password)

        var course_name = students_sheet.getInfo().title
        var course = Courses.findOne({ name: course_name })
        var course_id = course ? course._id : Courses.insert({ name: course_name })
        var rows = students_sheet.getRows(1)
        rows.forEach(createStudent)

        function createStudent(row) {
          var user_id = Accounts.createUser({
            email: row.email,
            password: row.dni
          })
          Roles.addUsersToRoles(user_id, ['student'])
          Meteor.users.update(user_id, { $set: {
            course_id: course_id,
            'profile.firstName': row.nombre,
            'profile.lastName': row.apellido,
            'profile.phoneNumber': row.telefono
          }})
        }
      })
    }

    function createSubjects() {
      console.log('Seeding subjects')
      Meteor.settings.spreadsheet.subject_files.forEach(function(subject_file_id) {
        var subject_sheet = new GoogleSpreadsheet(subject_file_id)
        subject_sheet.setAuth(Meteor.settings.spreadsheet.username, Meteor.settings.spreadsheet.password)

        var course_name = subject_sheet.getInfo().title
        var course = Courses.findOne({ name: course_name })
        var course_id = course ? course._id : Courses.insert({ name: course_name })

        var rows = subject_sheet.getRows(1)
        rows.forEach(createSubject)


        function createSubject(row) {
          if (row.nombre != '\n') {
            Subjects.insert({
              name: row.nombre,
              description: (row.descripcion != '\n' && row.descripcion) || Fake.paragraph(10),
              course_id: course_id,
              teacher_id: Meteor.users.findOne({ emails: { $elemMatch: { address: row.profesor } } })._id
            })
          }
        }
      })
    }
  },
  create: function(number) {
    var range = Array.apply(null, { length: number }).map(Number.call, Number)
    return {
      exams: function(subject_id) {
        range.forEach(Exams.iterableSample(subject_id))
      },
      examScores: function(student_id, exam_id) {
        range.forEach(ExamScores.iterableSample(student_id, exam_id))
      }
    }
  }
}

