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

Resources.autoTable = [
  { label: 'Materia', name: 'subject_id'},
  { label: 'Archivo', name: 'name'},
  { url: 'URL', name: 'url' }
]

