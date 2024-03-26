const asyncHandler = (requestHandler) => {
     return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next(err))
    }
}

export {asyncHandler}


/* we write the above same thing(line 1-8) in try catch warper

// const asyncHanddler = (func) => { () => ()}
// like above we write a higher order function


// const asyncHanddler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
*/