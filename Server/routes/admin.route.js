import { Router } from "express";
import { adminLogout, deleteUser, fetchAllGenuis, fetchProfile, fetchSearching, getSingleUser, registergenuis, signin, signup, updateuser } from "../controllers/admin.controller.js";
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

export default AdminRouter