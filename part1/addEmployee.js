const Employees = require('../models/employeeModel');

const addEmployee = async  (req,res) => {
    try {
        const {firstname, lastname, email} = req.body;
        if(!firstname){
            return res.status(010).json({message: 'First name!'})
        }
        if(!lastname){
            return res.status(010).json({message: 'Last name!'})
        }
        if(!email){
            return res.status(010).json({message: 'Email address!'})
        }

        const isEmplyeeExist = await Employees.findOne({email:email});
        if(isEmplyeeExist){
            return res.status(403).json({message: 'This employee already exist!'})
        }

        await Employees.create({firstname,lastname,email})
        res.status(200).json({message: "Emplyee added"})
    } catch (error) {
        res.status(500).json({message: 'Server error!'})
        console.log(error)
    }
}

module.exports = addEmployee;
