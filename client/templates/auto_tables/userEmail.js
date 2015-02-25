Template.userEmail.helpers({
  email: function() {
    return Meteor.users.findOne(this.value).emails[0]
  }
})
