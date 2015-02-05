Classes.before.anyFind(provideUserAndRole(function(user, role, selector) {
  switch (role) {
    case 'teacher':
      selector.teacher_id = user._id
  }
}))

