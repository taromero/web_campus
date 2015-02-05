Exams.before.anyFind(provideUserAndRole(function(user, role, selector) {
  if (role != 'directive') {
    selector.class_id = { $in: user.class_ids || [] }
  }
}))

