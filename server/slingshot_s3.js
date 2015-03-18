Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "web-campus",
  region: 'sa-east-1',

  acl: "public-read",

  authorize: function () {
    var user = Meteor.users.findOne(this.userId)
    //Deny uploads if user is not logged in or if not admin
    if (!this.userId || !_(['directive', 'teacher']).contains(user.role)) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    return file.name;
  }
});

// We use rainhaven:s3 to delete files from s3, as Slingshot lacks this feature
s3 = new S3('web-campus')

