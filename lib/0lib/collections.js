Exams = new Mongo.Collection('exams')
ExamNotes = new Mongo.Collection('examNotes')
Reports = new Mongo.Collection('reports')
Classes = new Mongo.Collection('classes')
Courses = new Mongo.Collection('courses')
Events = new Mongo.Collection('events')

Collections = [
  Exams,
  ExamNotes,
  Reports,
  Classes,
  Courses,
  Events
]

Exams.name = 'Exams'
ExamNotes.name = 'ExamNotes'
Reports.name = 'Reports'
Classes.name = 'Classes'
Courses.name = 'Courses'
Events.name = 'Events'

Schemas = {}

