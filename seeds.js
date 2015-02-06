Seed = {
  create: function(number) {
    return {
      directives: function() {
        for(i = 0; i < number; i++) {
          createSampleDirective(i)
        }
      },
      teachers: function() {
        for(i = 0; i < number; i++) {
          createSampleTeacher(i)
        }
      }
    }
  }
}

function createSampleDirective(i) {
  var directive = Accounts.createUser({
    username: 'aDirective' + i,
    email: 'canotto90+directive' + i + '@gmail.com',
    password: '1234'
  })
  Roles.addUsersToRoles(directive, ['admin', 'directive'])
}

function createSampleTeacher(i) {
  var teacher = Accounts.createUser({
    username: 'aTeacher' + i,
    email: 'canotto90+teacher' + i + '@gmail.com',
    password: '1234'
  })
  Roles.addUsersToRoles(teacher, ['admin', 'teacher'])
}

