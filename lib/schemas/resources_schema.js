Schemas.Resources = new SimpleSchema({
  name: {
    type: String
  },
  subject_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Subjects.find().map(Item.subject)
      } 
    }
  },
  file_id: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Files'
      }
    },
    label: 'Choose file'
  }
})

Resources.attachSchema(Schemas.Resources)

Resources.autoTable = [
  { label: 'Name', name: 'name' },
  { label: 'File', name: 'file_id'}
]

