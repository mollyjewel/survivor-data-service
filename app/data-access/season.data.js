const db = require("../models");
const Season = db.seasons;
const genderTypes = require("survivor-stats-common/models/gender")


let getSeasonIds = () => {
  return Season.find({},{"_id": 1}).distinct('_id')
}


/*let listStudents = () => {
  return Student.find({})
    .then(serialize)
}

let findStudent = (prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return Student.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    })
}

let findStudentsBy = (prop, val) => {
  return Student.find({[prop]: val})
    .then(serialize)
}

let addStudent = (studentInfo) => {
  let student = makeStudent(studentInfo)
  let newStudent = {
    name: student.getName(),
    grade: student.getGrade(),
    age: student.getAge(),
    prefect: student.isPrefect()
  }
  return Student.create(newStudent)
    .then(serialize)
}

let deleteStudent = (id) => {
  return Student.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'success'
      }
    })
    .catch(err => {
      return {
        status: 'fail'
      }
    })
}*/

module.exports = {
  getSeasonIds
}
