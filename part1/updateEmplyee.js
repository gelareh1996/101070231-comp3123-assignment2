const Employees = require('../models/employeeModel');

const addEmployee = async  (req,res) => {
    try {
        const {id} = req.params;
        const {firstname, lastname, email} = req.body;
        if(id.length !== 24){
            return res.status(401).json({message: 'Employee id not correct!'})
        }
        if(!firstname){
            return res.status(401).json({message: 'First name required!'})
        }
        if(!lastname){
            return res.status(401).json({message: 'Last name required!'})
        }
        if(!email){
            return res.status(401).json({message: 'Email address required!'})
        }

        const isEmplyeeExist = await Employees.findOne({email:email});
        if(!isEmplyeeExist){
            return res.status(403).json({message: 'Employee not exist!'})
        }

        await Employees.findOneAndUpdate({_id:id},{firstname,lastname,email})
        res.status(200).json({message: "Emplyee update successfully"})
    } catch (error) {
        res.status(500).json({message: 'Server error!'})
        console.log(error)
    }
}

module.exports = addEmployee;
