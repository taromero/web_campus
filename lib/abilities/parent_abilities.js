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
    },
    Attendances: {
      anyFind: attendances_from_his_students
    }
  }
}

function from_his_students(parent, selector) {
  var subject_ids = Meteor.users.find({ _id: { $in: parent.dependant_ids } }).map(getSubjectIds)
  selector.subject_id = { $in: subject_ids }
}

function attendances_from_his_students(parent, selector) {
  var student_ids = Meteor.users.find({ _id: { $in: parent.dependant_ids } }).map(getIds)
  selector.student_id = { $in: student_ids }
}

function getSubjectIds(elem) {
  return elem.subject_ids
}

