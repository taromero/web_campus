Item = {
  user: function(user) {
    return {
      label: user.username,
      value: user._id
    }
  },
  exam: function(exam) {
    return {
      label: exam.name,
      value: exam._id
    }
  },
  subject: function(subject) {
    return {
      label: subject.name,
      value: subject._id
    }
  },
  course: function(course) {
    return {
      label: course.name,
      value: course._id
    }
  }
}
