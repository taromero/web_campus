Schemas = {}

Schemas.Audit = new SimpleSchema({
  created_at: {
    type: Date,
    autoValue: onlyOnCreate(now)
  },
  updated_at: {
    type: Date,
    autoValue: now
  },
  created_by: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: onlyOnCreate(userId)
  },
  last_updated_by: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: userId 
  }
})

// because denyUpdate caused "Maximum stack excedeed"
function onlyOnCreate(fn) {
  return function() {
    if (this.isInsert) {
      return fn.call(this)
    }
  }
}

function userId() {
  return Meteor.userId() 
}

function now() {
  return new Date()
}

AutoTables  = {}

AutoTables.Audit = [
  { label: 'Created At', name: 'created_at' },
  { label: 'Updated At', name: 'updated_at' },
  { label: 'Created By', name: 'created_by', collection: 'Meteor.users', collection_property: 'username' },
  { label: 'Last Updated By', name: 'last_updated_by', collection: 'Meteor.users', collection_property: 'username' }
]
