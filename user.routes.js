import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

/* *********learnings **********/
// we can import only,  like this ( import { registerUser } from "../controllers/user.controller.js";)
// when the export is not default. like this (export {registerUser})

import {upload} from "../middlewares/multer.middleware.js"

const router = Router()


router.route("/register").post(
    upload.fields([
    {
        name: "avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
    ]),
    registerUser)



export default router