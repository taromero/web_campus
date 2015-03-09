var uploader = new Slingshot.Upload("myFileUploads");

Template.file_upload.events({
  'click #create_resource': function() {
    $('#progressBar').show()
    var file = $("#file_input")[0].files[0]
    uploader.send(file, function (err, downloadUrl) {
      if (!err) {
        Meteor.call('createResource', file.name, downloadUrl, file.type, function(err, res) {
          swal({
            title: err ? 'Error al crear el archivo' : 'El archivo se subio exitosamente',
            text: err,
            type: err ? 'error' : 'success'
          })
          $('#progressBar').hide()
        })
      } else {
        swal({ title: 'Error al subir el archivo', text: err.message, type: 'error' })
      }
    });
  }
})

Template.file_upload.helpers({
  file_name: function() {
    return Session.get('file_name') || 'Por favor, elige un archivo.'
  }
})

Template.upload_preview.rendered = function() {
  $("#file_input").change(function(){
    readURL(this);
  });

  function readURL(input) {
    file = $("#file_input")[0].files[0]
    Session.set('file_name', file.name)
    if (file.type == 'application/pdf') {
      $('#create_resource').hide()
      pdf_url = URL.createObjectURL(file)
      $('#pdf_preview').attr('src', pdf_url)
      $('#image_preview').attr('src', '')
      $('#pdf_preview').show()
      $('#image_preview_container').hide()
      $('#create_resource').show()
    } else if (contains(file.type, 'image')) {
      $('#create_resource.separate').hide()
      $('#pdf_preview').attr('src', '')
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#image_preview').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
      $('#pdf_preview').hide()
      $('#image_preview_container').show()
    } else {
      $('#pdf_preview').hide()
      $('#image_preview_container').show()
      $('#image_preview').attr('src', getIconLink())
    }
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

  function contains(string, val) {
    return string.indexOf(val) > -1
  }
}

Template.progressBar.helpers({
  progress: function() {
    return Math.round(uploader.progress() * 100)
  }
})

