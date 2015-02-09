Exams = new Mongo.Collection('exams')
ExamNotes = new Mongo.Collection('examNotes')
Reports = new Mongo.Collection('reports')
Subjects = new Mongo.Collection('subjects')
Courses = new Mongo.Collection('courses')
Events = new Mongo.Collection('events')

Collections = [
  Exams,
  ExamNotes,
  Reports,
  Subjects,
  Courses,
  Events
]

Exams.name = 'Exams'
ExamNotes.name = 'ExamNotes'
Reports.name = 'Reports'
Subjects.name = 'Subjects'
Courses.name = 'Courses'
Events.name = 'Events'

Schemas = {}

