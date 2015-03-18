Schemas.Resources = new SimpleSchema({
  subject_id: {
    label: 'Materia',
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  name: {
    label: 'Archivo',
    type: String,
  },
  url: {
    type: String
  },
  type: {
    type: String
  }
})

Resources.attachSchema(Schemas.Resources)

