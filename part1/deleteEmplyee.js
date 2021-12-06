const Employees = require('../models/employeeModel');

const addEmployee = async  (req,res) => {
    try {
        const {id} = req.params;
        if(id.length !== 24){
            return res.status(401).json({message: 'Employee id not correct!'})
        }
        const isEmplyeeExist = await Employees.findOne({_id:id});
        if(!isEmplyeeExist){
            return res.status(403).json({message: 'Employee not exist!'})
        }

        await Employees.findOneAndDelete({_id:id})
        res.status(200).json({message: "Emplyee delete successfully"})
    } catch (error) {
        res.status(500).json({message: 'Server error!'})
        console.log(error)
    }
}

module.exports = addEmployee;
