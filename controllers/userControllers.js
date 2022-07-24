const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


// user-signup

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {first_name, last_name, mobile, email, password} = req.body;

    const user = await User.create({
        first_name,
        last_name,
        mobile,
        email,
        password
    })  

    sendToken(user, 201, res)
})

// user-signin

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email and password", 401))
    }
    
    const isPasswordMatch = user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email and password", 401))
    }

    sendToken(user, 200, res)
})

// user-logout
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// user-getall

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        success: true,
        user,
    })
})

// user-get
exports.getsingleUser = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        user,
    })
})
