const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Role = require('../models/roleModel');


// student-create

exports.roleCreate = catchAsyncErrors(async (req, res, next) => {
    const {name, scopes} = req.body;

    const role = await Role.create({
        name,
        scopes,
    })

    res.status(201).json({
        success: true,
        role
    })

})

//  student-get

exports.getRoles = catchAsyncErrors(async (req, res, next) => {
    const getRoles = await Role.find();

    res.status(200).json({
        success: true,
        getRoles,
    })
})
