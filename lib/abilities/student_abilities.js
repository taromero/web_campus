RoleAbilities.student = {
  abilities: {
    Exams: {
      anyFind: from_his_subjects
    },
    ExamNotes: {
      anyFind: own_ones
    }
  }
}

function own_ones(student, selector) {
  selector.student_id = student._id
}

function from_his_subjects(student, selector) {
  selector.subject_id = { $in: student.subject_ids || [] }
}
