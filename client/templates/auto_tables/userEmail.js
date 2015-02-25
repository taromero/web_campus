Template.userEmail.helpers({
  email: function() {
    return this.value ? Meteor.users.findOne(this.value).emails[0] : {}
  }
})
