RoleAbilities.student = {
  abilities: {
    Exams: {
      anyFind: from_his_classes
    },
    ExamNotes: {
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
