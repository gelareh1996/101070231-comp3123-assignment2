const Employees = require('./employeeModel');

const getEmployees = async  (req,res) => {
    try {
        const getEmployees = await Employees.find();
        res.status(200).json(getEmployees)
    } catch (error) {
        res.status(500).json({message: 'Server error!'})
        console.log(error)
    }
}

const getEmployeeById = async  (req,res) => {
    try {
        const {id} = req.params;
        if(id.length !== 24){
            return res.status(401).json({message: 'Employee id not correct!'})
        }
        const getEmployee = await Employees.findOne({_id:id})
        if(!getEmployee){
            return res.status(404).json({message: 'Employee not found!!'})
        }

        res.status(200).json(getEmployee)
    } catch (error) {
        res.status(500).json({message: 'Server error!'})
        console.log(error)
    }
}

module.exports = {getEmployees,getEmployeeById};
