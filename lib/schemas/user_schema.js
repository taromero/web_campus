Schemas.UserProfile = new SimpleSchema({
  document_id: {
    label: 'Documento',
    type: String
  },
  firstName: {
    label: 'Nombre',
    type: String,
    regEx: /^[a-zA-Z- ]{2,25}$/,
  },
  lastName: {
    label: 'Apellido',
    type: String,
    regEx: /^[a-zA-Z ]{2,25}$/,
  },
  birthday: {
    label: 'Nacimiento',
    type: Date,
    optional: true
  },
  gender: {
    label: 'Genero',
    type: String,
    allowedValues: ['Masculino', 'Femenino'],
    optional: true
  },
  phoneNumber: {
    label: 'Telefono',
    type: String,
    optional: true
  }
})

Schemas.User = new SimpleSchema({
  emails: {
    type: [Object],
  },
  "emails.$.address": {
    label: 'Direccion',
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    label: 'Verificado',
    type: Boolean
  },
  createdAt: {
    label: 'Creado',
    type: Date
  },
  profile: {
    label: 'Perfil',
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
    label: 'Curso',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Courses.find().map(Item.course)
      }
    },
    optional: true
  },
  subject_ids: {
    label: 'Materias',
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Subjects.find().map(Item.subject)
      }
    },
    optional: true
  },
  dependant_ids: {
    label: 'Dependientes',
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Meteor.users.find().filter(onlyStudents).map(Item.users)
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
    gender: 'Masculino',
    phoneNumber: '1234-5678' + i
  }
}

Meteor.users.after.update(function(loggedUserId, doc) {
  if (doc.course_id) {
    ScoreCards.createFor(doc._id)
  }
})

