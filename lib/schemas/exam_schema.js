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
  class_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return Classes.find().map(function(clazz) {
          return {
            label: clazz.name,
            value: clazz._id
          }
        })
      } 
    }
  }
})

Exams.attachSchema(Schemas.Exams)

Exams.autoTable = [
  { label: 'Title', name: 'title' },
  { label: 'Description', name: 'description' },
  { label: 'Class', name: 'class_id', collection: 'Classes', collection_property: 'name' },
]
