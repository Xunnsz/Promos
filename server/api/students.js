var fs = require('fs-extra')
  , path = require('path')
  , _ = require('underscore')

module.exports.list = list
module.exports.get = get
module.exports.create = create
module.exports.read = read
module.exports.update = update
module.exports.del = del
module.exports.total = total

var DATA_FILE = './resources/data.json'

var DATA = fs.readJsonSync(DATA_FILE) //happens at server startup

/**********************
 * Public Interface
 **********************/

function list (req, res) {
  var offset = ~~req.query.offset || 0
    , limit = ~~req.query.limit || 25

  res.json(DATA.slice(offset*limit, offset*limit + limit))
}

function get(req, res) {
  res.json(DATA[req.query.studentID]);
}

function create (req, res) {
  var newStudent = req.body
  newStudent.id = getLastId() + 1
  DATA.push(newStudent)
  saveDB(function(err) {
    if (err) 
      res.json(formatRespData(0, err))
    else
      res.json(formatRespData({id: newstudent.id}))
  })
}

function read (req, res) {
  var id = ~~req.params.id
  var student = _(DATA).find(function(student) { return student.id === id })

  if (!student)
    res.json(formatRespData(0, "Can't find student with id: " + id))
  else
    res.json(formatRespData(student))
}

function update (req, res) {
  var id = ~~req.params.id
  var student = _(DATA).find(function(student) { return student.id === id })

  var newstudentData = req.body
  student = _(student).extend(newstudentData)

  saveDB(function(err) {
    if (err) 
      res.json(formatRespData(0, err))
    else
      res.json(formatRespData({}))
  })
}

function del (req, res) {
  var id = ~~req.params.id
  var student = _(DATA).find(function(student) { return student.id === id })

  var idx = DATA.indexOf(student)
  if (idx < 0) return res.json(formatRespData(0, "Could not find student with id: " + id))

  DATA.splice(idx, 1)

  saveDB(function(err) {
    if (err) 
      res.json(formatRespData(0, err))
    else
      res.json(formatRespData({}))
  })
}

function total (req, res) {
  total = DATA.length ? DATA.length : 0
  res.json({total: total})
}



/*******************
 * Private Methods
 *******************/

function getLastId () {
  return DATA.length;
}

function formatRespData (code, content) {
  if (typeof code === 'object') {
    content = code,
    code = 1 //0 failure, 1 = success
  }

  return {
    code: code,
    content: content
  }
}

function saveDB (callback) {
  fs.writeJson(DATA_FILE, DATA, callback)
}

