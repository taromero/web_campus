Schemas.Resources = new SimpleSchema({
  subject_id: {
    label: 'Materia',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Subjects.find().map(Item.subject)
      } 
    }
  },
  file_id: {
    label: 'Archivo',
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Files'
      }
    },
  }
})

Resources.attachSchema(Schemas.Resources)

Resources.autoTable = [
  { label: 'Materia', name: 'subject_id'},
  { label: 'Archivo', name: 'file_id'}
]

