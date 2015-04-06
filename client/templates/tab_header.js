Template.tabHeader.helpers({
  active: function() {
    return $(this).attr('href') == location.hash ? 'active': ''
  }
})
