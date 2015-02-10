Exams = new Mongo.Collection('exams')
ExamScores = new Mongo.Collection('examNotes')
Reports = new Mongo.Collection('reports')
Subjects = new Mongo.Collection('subjects')
Courses = new Mongo.Collection('courses')
Events = new Mongo.Collection('events')

Collections = [
  Exams,
  ExamScores,
  Reports,
  Subjects,
  Courses,
  Events
]

Exams.name = 'Exams'
ExamScores.name = 'ExamScores'
Reports.name = 'Reports'
Subjects.name = 'Subjects'
Courses.name = 'Courses'
Events.name = 'Events'

Schemas = {}

