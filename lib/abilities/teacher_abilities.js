RoleAbilities.teacher = {
  abilities: {
    Exams: {
      anyFind: from_his_subjects
    },
    Subjects: {
      anyFind: own_ones
    },
    ExamNotes: {
      anyFind: from_his_subjects
    }
  }
}

function from_his_subjects(teacher, selector) {
  var subject_ids = Subjects.find({ teacher_id: teacher._id }, { fields: { _id: 1 } }).map(ids)
  selector.subject_id = { $in: subject_ids }
}

function own_ones(teacher, selector) {
  selector.teacher_id = teacher._id
}

function ids(elem) {
  return elem._id
}

