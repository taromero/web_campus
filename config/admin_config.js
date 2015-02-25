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
      label: 'Examenes',
      icon: 'mortar-board',
      color: 'green',
      auxCollections: [Subjects],
      tableColumns: Exams.autoTable
    },
    Subjects: {
      label: 'Materias',
      icon: 'university',
      color: 'maroon',
      auxCollections: [Meteor.users, Courses],
      tableColumns: Subjects.autoTable
    },
    Courses: {
      label: 'Cursos',
      icon: 'group',
      color: 'orange',
      tableColumns: Courses.autoTable
    },
    Reports: {
      label: 'Reportes',
      icon: 'bar-chart',
      color: 'antiquewhite'
    },
    ExamScores: {
      label: 'Notas',
      auxCollections: [Meteor.users, Exams],
      tableColumns: ExamScores.autoTable
    },
    Resources: {
      label: 'Archivos',
      tableColumns: Resources.autoTable
    }
  }
};

