RoleAbilities.student = {
  abilities: {
    Exams: {
      anyFind: from_his_subjects
    },
    ExamScores: {
      anyFind: own_ones
    },
    Resources: {
      anyFind: from_his_subjects
    },
    Attendances: {
      anyFind: own_ones
    },
    ScoreCards: {
      anyFind: own_ones
    },
    ScoreCardSubjects: {
      anyFind: of_own_score_card
    },
    PeriodsScores: {
      anyFind: of_own_score_card_subjects
    }
  }
}

function own_ones(student, selector) {
  selector.student_id = student._id
}

function from_his_subjects(student, selector) {
  selector.subject_id = { $in: student.subject_ids || [] }
}

function of_own_score_card(student, selector) {
  var score_card_id = ScoreCards.findOne({ student_id: student._id })._id
  selector.score_card_id = score_card_id
}

function of_own_score_card_subjects(student, selector) {
  var score_card_id = ScoreCards.findOne({ student_id: student._id })._id
  var score_card_subjects_ids = ScoreCardSubjects.find({ score_card_id: score_card_id }).map(getIds)
  selector.score_card_subject_id = { $in: score_card_subjects_ids || [] }
}


