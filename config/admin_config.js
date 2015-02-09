AdminConfig = {
  name: 'Web Campus',
  autoForm: {
    omitFields: ['created_at', 'updated_at', 'created_by', 'last_updated_by']
  },
  collections: {
    Exams: {
      icon: 'mortar-board',
      color: 'green',
      tableColumns: Exams.autoTable
    },
    Subjects: {
      icon: 'university',
      color: 'maroon',
      tableColumns: Subjects.autoTable
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
