Exams = new Mongo.Collection('exams')
ExamScores = new Mongo.Collection('examNotes')
Reports = new Mongo.Collection('reports')
Subjects = new Mongo.Collection('subjects')
Courses = new Mongo.Collection('courses')
Events = new Mongo.Collection('events')
Resources = new Mongo.Collection('resources')
Files = new FS.Collection("files", { stores: [new FS.Store.GridFS("files", {})] })

Collections = [
  Exams,
  ExamScores,
  Reports,
  Subjects,
  Courses,
  Events,
  Resources
]

Exams.name = 'Exams'
ExamScores.name = 'ExamScores'
Reports.name = 'Reports'
Subjects.name = 'Subjects'
Courses.name = 'Courses'
Events.name = 'Events'
Resources.name = 'Resources'

Schemas = {}

