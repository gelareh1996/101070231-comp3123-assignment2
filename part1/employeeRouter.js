const express = require("express");
const router = express.Router();
const {getEmployees, getEmployeeById} = require('./getEmployees');
const addEmployee = require('./addEmployee');
const deleteEmplyee = require('./deleteEmplyee');
const updateEmplyee = require('./updateEmplyee');

router.get('/employees', getEmployees)
router.post('/employees', addEmployee)
router.get('/employees/:id', getEmployeeById)
router.put('/employees/:id', updateEmplyee)
router.delete('/employees/:id', deleteEmplyee)

module.exports = router;