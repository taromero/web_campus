var spinner = '<div class="loading-spinner"><div class="dot1"></div><div class="dot2"></div></div>'

Template.loading.rendered = function() {
  if (!Session.get('loadingSplash')) {
    this.loading = window.pleaseWait({
      logo: '/images/blank_logo.png',
      backgroundColor: '#d35400',
      loadingHtml: spinner
    })
    Session.set('loadingSplash', true) // just show loading splash once
  }
}

Template.loading.destroyed = function() {
  if (this.loading) {
    this.loading.finish()
  }
}

