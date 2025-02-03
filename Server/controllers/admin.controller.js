//signup , login , logout , fetchprofiles , edit , add, delete
import bcryt from "bcryptjs";
import { Admin } from "../models/admin.model.js";
import { genius } from "../models/genius.model.js";
import cloudinary from "cloudinary";
import fs from "fs";

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
  
    if (!fullName || !email || !password) {
      return res.status(404).send({
        success: false,
        errors: "all feilds are required",
      });
    }
    const existingAdmin = await Admin.findOne({ email: email });
 
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        errors: "Admin already exist",
      });
    }
  
    const hasshedpassword = await bcryt.hash(password, 10);
   
    const newAdmin = await Admin.create({
      fullName,
      email,
      password: hasshedpassword,
    });

    const token = await newAdmin.generateJWTToken();

   
    if (!token) {
      
      return res.status(400).send({
        success: false,
        message: "error in generating token",
      });
    }

   
    await newAdmin.save();

    res.cookie("token", token, cookieOption);
   
    return res.status(200).json({
      success: true,
      message: "Admin Register successfully",
      Admin: newAdmin,
    });
  } catch (e) {
   
    return res.status(500).json({
      success: false,
      errors: "Error while signup",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        errors: "All feild are required",
      });
    }

    const isAdminExist = await Admin.findOne({ email }).select("+password");
  

    if (!isAdminExist) {
      return res.status(400).json({
        success: false,
        errors: "Admin with this email id does not exist",
      });
    }

    
    const checkPassword = await isAdminExist.comparePassword(password);
   
    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        errors: "password is incorrect",
      });
    }
  

    const token = await isAdminExist.generateJWTToken();
  

    if (!token) {
      res.status(409).json({
        success: false,
        errors: "error in generating token ",
      });
    }

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "signed in successfully",
      user: isAdminExist,
      token,
    });
  } catch (err) {
    console.error("Error during signin:", err);

    return res.status(500).json({
      success: false,
      message: "An error occurred during singin. Please try again later.",
    });
  }
};

export const fetchProfile = async (req, res) => {
  try {
   
    const userId = req?.user?.id;


    const existingAdmin = await Admin.findById(userId);
    if (!existingAdmin) {
      return res.status(404).json({
        success: false,
        errors: "admin does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "profile fetched successfully",
      admin: existingAdmin,
    });
  } catch (err) {
  
    return res.status(500).json({
      success: false,
      errors: "error occured while fetching profile",
    });
  }
};

export const registergenuis = async (req, res) => {
  try {
    const { fullName, calendlyUrl , email, phone, about } = req.body;
   

    if (!fullName || !email || !phone || !about || !calendlyUrl) {
      return res.status(400).json({
        success: false,
        errors: "All fields are required",
      });
    }

 
    const isUserExist = await genius.findOne({ email });
   

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        errors: "User already exists",
      });
    }
  
  
    if (!req.file) {
      return res.status(400).json({
        success: false,
        errors: "File upload is required",
      });
    }

  

    let uploadedFile;
    try {
      uploadedFile = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "profile",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        errors: "Error occurred while saving file",
      });
    }

    if (!uploadedFile) {
      return res.status(500).json({
        success: false,
        errors: "File upload failed",
      });
    }

   

    // Create the user only after file upload succeeds
    const user = await genius.create({
      fullName,
      email,
      phone,
      about,
      calendlyUrl,
      avatar: {
        publicId: uploadedFile.public_id,
        secure_url: uploadedFile.secure_url,
      },
    });

    await user.save();
  

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (e) {
 
    return res.status(500).json({
      success: false,
      errors: "An error occurred",
    });
  }
};

export const fetchAllGenuis = async (req, res) => {
  try {
    // const userId = req?.user?.id;
    // const existingAdmin = await Admin.findById(userId);
    // if (!existingAdmin) {
    //   return res.status(404).json({
    //     success: false,
    //     errors: "admin does not exist",
    //   });
    // }

    const allgenius = await genius.find({});
    return res.status(200).json({
      success: true,
      message: "profile fetched successfully",
      users: allgenius,
    });
  } catch (err) {
  
    return res.status(500).json({
      status: false,
      errors: "an error occured",
    });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "logout successfully",
    });
  } catch (err) {
  
    return res.status(500).json({
      success: false,
      errors: "error occured",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isUserExist = await genius.findById(id);
    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        errors: "user not found",
      });
    }

    await genius.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, about } = req.body;
    const isUserExist = await genius.findById(id);
    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        errors: "User does not exist",
      });
    }

    let avatar = isUserExist.avatar;

    if (req.file) {
      try {
        // Upload new image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "profile",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          if (isUserExist.avatar.publicId) {
            await cloudinary.v2.uploader.destroy(isUserExist.avatar.publicId);
          }
          avatar = {
            publicId: result.public_id,
            secure_url: result.secure_url,
          };
          fs.promises.rm(req.file.path).catch(console.error);
        }
      } catch (err) {
        console.error("Error uploading new profile image:", err);
        return res.status(400).json({
          success: false,
          errors: "Error occurred while updating profile image",
        });
      }
    }

    const updatedUser = await genius.findByIdAndUpdate(
      id,
      {
        $set: {
          fullName,
          email,
          phone,
          about,
          avatar,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error occurred while updating profile:", err);
    return res.status(500).json({
      success: false,
      errors: "Error occurred in updating profile",
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const singleUser = await genius.findById(id);

    if (!singleUser) {
      return res.status(400).json({
        success: false,
        errors: "user does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      singleUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: "something went wrong",
    });
  }
};
