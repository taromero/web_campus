Schemas.UserProfile = new SimpleSchema({
  document_id: {
    type: String
  },
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
  },
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: true
  },
  phoneNumber: {
    type: String,
    optional: true
  }
})

Schemas.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  emails: {
    type: [Object],
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schemas.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true
  },
  course_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Courses.find().map(Item.course)
      }
    },
    optional: true
  }
})

Meteor.users.attachSchema(Schemas.User)

Schemas.UserProfile.iterableSample = function(i) {
  return {
    document_id: '12345678' + i,
    firstName: 'Oliver',
    lastName: 'Atom',
    birthday: new Date(),
    gender: 'Male',
    phoneNumber: '1234-5678' + i
  }
}
