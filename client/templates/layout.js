Template.header.rendered = function() {
  $(".button-collapse.hide-on-med-and-down").sideNav()
  $(".button-collapse.hide-on-large-only").sideNav({ closeOnClick: true })
  $('.modal-trigger').leanModal()
}

Template.header_links.events({
  'click #sign-out': function() {
    Meteor.logout()
  }
})

