AutoTables = {}

AutoTables.Audit = [
  { label: 'Creado', name: 'createdAt' },
  { label: 'Actualizado', name: 'updatedAt' },
  { label: 'Creador', name: 'createdBy', collection: 'Meteor.users', collection_property: 'username' },
  { label: 'Ultimo en Actualizar', name: 'lastUpdatedBy', collection: 'Meteor.users', collection_property: 'username' }
]
