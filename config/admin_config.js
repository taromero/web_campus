AdminConfig = {
  name: 'Web Campus',
  dashboard: {
    homeUrl: '/'
  },
  autoForm: {
    omitFields: ['created_at', 'updated_at', 'created_by', 'last_updated_by']
  },
  collections: {
    Exams: {
      icon: 'mortar-board',
      color: 'green',
      auxCollections: [Subjects],
      tableColumns: Exams.autoTable
    },
    Subjects: {
      icon: 'university',
      color: 'maroon',
      auxCollections: [Meteor.users, Courses],
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
    },
    ExamScores: {
      auxCollections: [Meteor.users, Exams],
      tableColumns: ExamScores.autoTable
    }
  }
};

