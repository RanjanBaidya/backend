import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes importing

import userRouter from './routes/user.routes.js'
/*  **************** learnings**********************/   
// in above line we have to write " import router from './routes/user.routes.js"
// but we write  like this "import userRouter from './routes/user.routes.js"
// because in the user.routers.js file we export default so we can give
// any name insted of router, that is in this case "userRouter" 

//routes declarations
app.use("/api/v1/users",userRouter)


export {app}