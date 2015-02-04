AutoTables = {}

AutoTables.Audit = [
  { label: 'Created At', name: 'createdAt' },
  { label: 'Updated At', name: 'updatedAt' },
  { label: 'Created By', name: 'createdBy', collection: 'Meteor.users', collection_property: 'username' },
  { label: 'Last Updated By', name: 'lastUpdatedBy', collection: 'Meteor.users', collection_property: 'username' }
]
