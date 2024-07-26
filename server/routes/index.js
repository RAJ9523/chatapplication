
import express from "express"

import { registerUser } from "../controller/UserController.js"

import { checkEmail } from "../controller/UserController.js"
import { checkPassword } from "../controller/UserController.js"
import { userDetails } from "../controller/UserController.js"

import { logout } from "../controller/UserController.js"
import { updateUserDetails } from "../controller/UserController.js"

import { searchUser } from "../controller/UserController.js"
const router = express.Router()


router.post('/register',registerUser)

router.post('/email',checkEmail)

router.post('/password',checkPassword)

router.get('/user-details',userDetails);

router.get('/logout',logout)

router.post('/update-user',updateUserDetails)

router.post("/search-user",searchUser)


export default router