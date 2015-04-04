var uploader = new Slingshot.Upload("myFileUploads");

Template.file_upload.events({
  'click #create_resource': function(event) {
    var $base = $(event.currentTarget).closest('.container')
    $base.find('.progress').show()
    var file = $base.find(".file_input")[0].files[0]
    uploader.send(file, function (err, downloadUrl) {
      if (!err) {
        Meteor.call('createResource', file.name, downloadUrl, file.type, function(err, res) {
          swal({
            title: err ? 'Error al crear el archivo' : 'El archivo se subio exitosamente',
            text: err,
            type: err ? 'error' : 'success'
          })
          $base.find('.progress').hide()
        })
      } else {
        if (err.error == 'Aborted') {
          return; // if user has aborted the upload, don't show error
        }
        swal({ title: 'Error al subir el archivo', text: err.message, type: 'error' })
      }
    });
  },
  'click #cancel_upload': function(event) {
    uploader.xhr.abort()
    Session.set('file_name', null)
    var $base = $(event.currentTarget).closest('.container')
    $base.find('.showOnSelectedFile').hide()
    $base.find('.progress').hide()
  }
})

Template.file_upload.helpers({
  file_name: function() {
    return Session.get('file_name') || 'Por favor, elige un archivo.'
  }
})

Template.upload_preview.rendered = function() {
  $(".file_input").change(function(){
    readURL(this);
  });

  function readURL(input) {
    var file = input.files[0]
    Session.set('file_name', file.name)
    var $base = $(input).closest('.container')
    $base.find('.showOnSelectedFile').show()
    var $create_resource = $base.find('#create_resource')
    var $create_resource_separate = $base.find('#create_resource.separate')
    var $pdf_preview = $base.find('#pdf_preview')
    var $image_preview = $base.find('#image_preview')
    var $image_preview_container = $base.find('#image_preview_container')
    if (file.type == 'application/pdf') {
      pdf_url = URL.createObjectURL(file)
      $pdf_preview.attr('src', pdf_url)
      $pdf_preview.show()
      $image_preview.attr('src', '')
      $image_preview_container.hide()
      $create_resource.show()
    } else if (contains(file.type, 'image')) {
      $create_resource_separate.hide()
      $pdf_preview.attr('src', '')
      var reader = new FileReader();
      reader.onload = function (e) {
        $image_preview.attr('src', e.target.result);
      }
      reader.readAsDataURL(file);
      $pdf_preview.hide()
      $image_preview_container.show()
    } else {
      $pdf_preview.hide()
      $image_preview_container.show()
      $image_preview.attr('src', getIconLink())
    }

    function getIconLink() {
      if (contains(file.type, 'excel') || contains(file.type, 'spreadsheet')) {
        return 'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png'
      } else if (contains(file.type, 'zip')) {
        return 'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/ZIP_Archive.png'
      } else if (contains(file.type, 'word') || contains(file.type, 'opendocument.text')) {
        return 'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Word_15.png'
      } else if (contains(file.type, 'presentation')) {
        return 'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/PowerPoint_15.png'
      } else {
        return 'https://cdn0.iconfinder.com/data/icons/iconico-3/1024/55.png'
      }
    }
  }


  function contains(string, val) {
    return string.indexOf(val) > -1
  }
}

Template.progressBar.helpers({
  progress: function() {
    return Math.round(uploader.progress() * 100)
  }
})

