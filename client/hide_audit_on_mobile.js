hide_audit_on_mobile = function() {
  var table  = $('.dataTables_wrapper')
  var headers = table.find('th')
  var rows = table.find('tr')
  var columns_to_hide_start = headers.length - 6 // 4 audit columns + edit and delete
  var cths = columns_to_hide_start
  var cols_to_hide = [cths++, cths++, cths++, cths++]

  headers.each(function(i, header) {
    cols_to_hide.forEach(function(cel_number) {
      $(headers[cel_number]).addClass('hidden-xs')
    })
  })
  rows.each(function(i, row) {
    var cels = $(row).find('td')
    cols_to_hide.forEach(function(cel_number) {
      $(cels[cel_number]).addClass('hidden-xs')
    })
  })
}

attempt_for_5_seconds_to = function(fn) {
  fn()
  var counter = 0
  var interval = setInterval(function() {
    if (counter == 50) {
      clearInterval(interval)
      return
    }
    fn()
    counter++
  }, 100)
}

