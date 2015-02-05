ExamNotes.before.anyFind(provideUserAndRole(function(user, role, selector) {
  switch (role) {
    case 'teacher':
      selector.class_id = { $in: user.class_ids || [] }
      break
    case 'parent':
      selector.student_id = { $in: _(user.student_id).pluck('_id') || [] }
      break
    case 'student':
      selector.student_id = user._id
      break
  }
}))
