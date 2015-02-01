AdminConfig = {
  name: 'Web Campus',
  adminEmails: ['canotto90@gmail.com'],
  collections: {
    Exams: {
      icon: 'mortar-board',
      color: 'green',
      tableColumns: [
        { label: 'Title', name: 'title' },
        { label: 'Description', name: 'description' },
        { label: 'Course', name: 'course_id', collection: 'Courses', collection_property: 'name' }
      ]
    },
    Classes: {
      icon: 'university',
      color: 'maroon'
    },
    Courses: {
      icon: 'group',
      color: 'orange',
      tableColumns: [
        { label: 'Name', value: 'name' }
      ]
    },
    Reports: {
      icon: 'bar-chart',
      color: 'antiquewhite'
    }
  }
};
