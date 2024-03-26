import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req,res)=>{
   // ******* these steps we have to follow while write the registary **********
   // *** we have to think in this way
    // get user details from frontend
   // valiadation- not empty
   // check if user already exists
   //check for images, check for avatar
   //upload them cloudinary,avatar
   // create user object - create entry in db
   // remove password and refresh token feild from response
   // check for user creation
   // return res

const {fullname, username,email,password } = req.body
// console.log("email:",email);

// if(fullname=== ""){
//     throw new ApiError(400,"fullname is required") 
// } 
// like the above line we can check each and every field whether it is empty or not. or

if (
    [fullname,email,username,password].some((field) =>
    field?.trim()==="")
    ) {
    throw new ApiError(400,"all fields are requried")
   }
const existedUser = await User.findOne({
    $or: [ {username} , {email} ]
})
 if(existedUser){
    throw new ApiError(409,"User or email already exist")
 }

//  console.log(req.files);
const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.coverImage[0]?.path;
 
let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) &&
req.files.coverImage.length>0){
    coverImageLocalPath = req.files.coverImage[0].path
}



if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is Required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400, "Avatar file is not uploaded in cloudinary")
}

const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
// in the above line we write the syntax  select("-password -refreshToken"), this indicate
// don't save password and refreshtoken in the createduser.

if(!createdUser){
    throw new ApiError(500,"somthing went wrong while register the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
)

})

export {registerUser}