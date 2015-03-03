Exams = new Mongo.Collection('exams')
ExamScores = new Mongo.Collection('examNotes')
Reports = new Mongo.Collection('reports')
Subjects = new Mongo.Collection('subjects')
Courses = new Mongo.Collection('courses')
Events = new Mongo.Collection('events')
Resources = new Mongo.Collection('resources')
Files = new FS.Collection("files", { stores: [new FS.Store.GridFS("files", {})] })
Attendances = new Mongo.Collection('attendance')

Collections = [
  Exams,
  ExamScores,
  Reports,
  Subjects,
  Courses,
  Events,
  Resources,
  Attendances
]

Exams.name = 'Exams'
Exams.defaultOptions = { sort: { title: -1} }
ExamScores.name = 'ExamScores'
Reports.name = 'Reports'
Subjects.name = 'Subjects'
Subjects.defaultOptions = { sort: { name: -1} }
Courses.name = 'Courses'
Courses.defaultOptions = { sort: { name: -1} }
Events.name = 'Events'
Resources.name = 'Resources'
Attendances.name = 'Attendances'
Attendances.defaultSelector = { date: { $gt: moment().subtract(1, 'day')._d, $lt: moment().add(1, 'day')._d } }

Schemas = {}

