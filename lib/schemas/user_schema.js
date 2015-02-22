Schemas.UserProfile = new SimpleSchema({
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
  roles: {
    type: [String],
    optional: true
  }
})

Meteor.users.attachSchema(Schemas.User)
