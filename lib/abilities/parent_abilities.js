RoleAbilities.parent = {
  abilities: {
    Exams: {
      anyFind: from_his_students
    },
    ExamScores: {
      anyFind: from_his_students
    },
    Resources: {
      anyFind: from_his_students
    }
  }
}

function from_his_students(parent, selector) {
  var subject_ids = Student.find({ parent_ids: { $elemMatch: parent._id } }).map(subject_ids)
  selector.subject_id = { $in: subject_ids }
}

function subject_ids(elem) {
  return elem.subject_ids
}

