Exams = new Mongo.Collection('exams')
ExamScores = new Mongo.Collection('examNotes')
Reports = new Mongo.Collection('reports')
Subjects = new Mongo.Collection('subjects')
Courses = new Mongo.Collection('courses')
Events = new Mongo.Collection('events')
Resources = new Mongo.Collection('resources')
Attendances = new Mongo.Collection('attendance')
ScoreCards = new Mongo.Collection('score_cards')
ScoreCardSubjects = new Mongo.Collection('score_card_subjects')
PeriodsScores = new Mongo.Collection('periods_scores')

Collections = [
  Exams,
  ExamScores,
  Reports,
  Subjects,
  Courses,
  Events,
  Resources,
  Attendances,
  ScoreCards,
  ScoreCardSubjects,
  PeriodsScores
]

Exams.name = 'Exams'
Exams.defaultOptions = { sort: { date: 1} }
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
ScoreCards.name = 'ScoreCards'
ScoreCardSubjects.name = 'ScoreCardSubjects'
PeriodsScores.name = 'PeriodsScores'

Schemas = {}

PERIODS = ['1er', '2ndo', '3er', 'Integradora', 'Nota Final']

