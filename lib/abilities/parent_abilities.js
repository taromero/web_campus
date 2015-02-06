RoleAbilities.parent = {
  abilities: {
    exams: {
      anyFind: from_his_students
    },
    examNotes: {
      anyFind: from_his_students
    }
  }
}

function from_his_students(parent, selector) {
  var classes_ids = Student.find({ parent_ids: { $elemMatch: parent._id } }).map(class_ids)
  selector.class_id = { $in: classes_ids }
}

function class_ids(elem) {
  return elem.class_ids
}

