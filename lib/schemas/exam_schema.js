Schemas.Exams = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  course_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Courses.find().map(function(course) {
          return {
            label: course.name,
            value: course._id
          }
        })
      } 
    }
  }
})

Exams.attachSchema(Schemas.Exams)
