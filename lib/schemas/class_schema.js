Schemas.Subjects = new SimpleSchema({
  name: {
    type: String,
    max: 100
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  teacher_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Meteor.users.find({}, { fields: { roles: 1, username: 1, _id: 1 } })
          .fetch()
          .filter(function(user) {
            return _(user.roles).contains('teacher')
          })
          .map(function(teacher) {
            return {
              label: teacher.username,
              value: teacher._id
            }
          })
      } 
    }
  }
})

Subjects.attachSchema(Schemas.Subjects)

Subjects.autoTable = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description'},
  { label: 'Teacher', name: 'teacher_id', collection: 'Meteor.users', collection_property: 'username'}
]
