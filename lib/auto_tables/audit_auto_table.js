AutoTables = {}

AutoTables.Audit = [
  { label: 'Creado', name: 'createdAt', template: 'prettyDate' },
  { label: 'Actualizado', name: 'updatedAt', template: 'prettyDate' },
  { label: 'Creador', name: 'createdBy', template: 'userEmail' },
  { label: 'Ultimo en Actualizar', name: 'lastUpdatedBy', template: 'userEmail' }
]
