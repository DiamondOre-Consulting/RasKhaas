import { Router } from "express";
import { adminLogout, deleteUser, fetchAllGenuis, fetchProfile, fetchSearching, getEnquireFrom, getSingleUser, registergenuis, signin, signup, updateuser, userEnquire } from "../controllers/admin.controller.js";
import { authAdminMiddleware } from "../middlewares/auth.admin.middleware.js";
import upload from '../middlewares/multer.middleware.js'

const AdminRouter = Router();

AdminRouter.post('/signup' , signup);
AdminRouter.post('/signin' , signin);
AdminRouter.get('/fetch-profile' , authAdminMiddleware , fetchProfile);
AdminRouter.post('/register-genius' ,upload.single("avatar"), registergenuis);
AdminRouter.get('/all-genius' , fetchAllGenuis)
AdminRouter.delete('/delete-user/:id' , deleteUser);
AdminRouter.put('/update-genius/:id' , upload.single('avatar') , updateuser)
AdminRouter.get('/get-single-user/:id' , getSingleUser);
AdminRouter.get('/logout' , adminLogout);
AdminRouter.post('/search', fetchSearching);
AdminRouter.post("/enquire-form" , userEnquire);
AdminRouter.get('/get-enquire-form', getEnquireFrom);
export default AdminRouter