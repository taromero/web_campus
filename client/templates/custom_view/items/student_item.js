Template.student_item.helpers({
  student: function() {
    return Meteor.users.findOne({ 'profile.document_id': this.document_id })
  }
})
