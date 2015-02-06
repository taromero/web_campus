RoleAbilities.student = {
  abilities: {
    exams: {
      anyFind: from_his_classes
    },
    examNotes: {
      anyFind: own_ones
    }
  }
}

function own_ones(student, selector) {
  selector.student_id = student._id
}

function from_his_classes(student, selector) {
  selector.class_id = { $in: student.classes_ids || [] }
}
