RoleAbilities.teacher = {
  abilities: {
    Exams: {
      anyFind: from_his_classes
    },
    Classes: {
      anyFind: own_ones
    },
    ExamNotes: {
      anyFind: from_his_classes
    }
  }
}

function from_his_classes(teacher, selector) {
  var classes_ids = Classes.find({ teacher_id: teacher._id }, { fields: { _id: 1 } }).map(ids)
  selector.class_id = { $in: classes_ids }
}

function own_ones(teacher, selector) {
  selector.teacher_id = teacher._id
}

function ids(elem) {
  return elem._id
}

