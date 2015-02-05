AdminConfig = {
  name: 'Web Campus',
  autoForm: {
    omitFields: ['created_at', 'updated_at', 'created_by', 'last_updated_by']
  },
  collections: {
    Exams: {
      icon: 'mortar-board',
      color: 'green',
      auxCollections: ['Courses'],
      tableColumns: Exams.autoTable
    },
    Classes: {
      icon: 'university',
      color: 'maroon',
      tableColumns: Classes.autoTable
    },
    Courses: {
      icon: 'group',
      color: 'orange',
      tableColumns: Courses.autoTable
    },
    Reports: {
      icon: 'bar-chart',
      color: 'antiquewhite'
    }
  }
};
