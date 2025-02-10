import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  allusers: [],
  singleuser: [],
};

export const login = createAsyncThunk("/login", async (data) => {
  try {
    const response = await toast.promise(
      axiosInstance.post("/admin/signin", data),
      {
        loading: "Login.....",
        success: (res) => res.message,
        error: (res) => res?.errors,
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return toast.error(err.response.data.errors);
  }
});

export const fetchProfile = createAsyncThunk('/fetch-profile' , async()=>{
  try{
        const response = await toast.promise(
          axiosInstance.get(`/admin/fetch-profile`),
          {
            loading: "Fetching Admin........",
            success: (res) => res?.data?.message,
            error: (res) => res?.errors,
          }
        );
      
        return response.data
  }
  catch(e){
    console.log(e);
    return toast.error(err.response.data.errors);

  }
})

export const fetchAllUser = createAsyncThunk(
  "/all-genius",
  async () => {
    try {
      console.log(1);
      const response = await axiosInstance.get("/admin/all-genius");
      return response?.data;
    } catch (err) {
      console.log(err);
      return toast.error(err.response.data.errors);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "/get-single-user",
  async (data) => {
    console.log("jgcjg", data);
    try {
      const response = await axiosInstance.get(
        `/admin/get-single-user/${data}`
      );
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const registerUserByAdmin = createAsyncThunk('/register-genius', async (data) => {
  try {
    const response = await toast.promise(
      axiosInstance.post("/admin/register-genius", data),
      {
        loading: "loading.....",
        success: (res) => res?.data?.message,
        error: (res) => res?.errors,
      }
    );
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err);
    return toast.error(err.response.data.errors);
  }
});

export const deleteUser = createAsyncThunk('/delete-user' , async(data)=>{

  try{
    const response = await toast.promise(axiosInstance.delete(`/admin/delete-user/${data}`),

    {
      loading: "Loading.....",
      success: (res) => res?.data?.message,
      error: (res) => res?.errors,
    }
  )
  console.log(response.data)
  return response.data
  }
  catch(err){

    console.log(err)
    toast.error(err.response.data.errors)


  }

})


export const updateUser = createAsyncThunk('/update-user', async ({ id, data }) => {
  try {
    const response = await toast.promise(
      axiosInstance.put(`/admin/update-genius/${id}`, data),
      {
        loading: "Updating user...",
        success: (res) => res?.data?.message,
        error: (res) => res?.errors,
      }
    );

    console.log(id , data)
    return response.data;
  } catch (err) {
    toast.error(err.response.data.errors);
  }
});


export const logout = createAsyncThunk('/logout' , async()=>{
  try{
    const response = await toast.promise(
      axiosInstance.get('/admin/logout'),
      {
        loading: "Loading...",
        success: (res) => res?.data?.message,
        error: (res) => res?.errors,
      }
    );
    console.log(response.data)
    return response.data

  }
  catch(e){
    console.log(response.data)

    // return  toast.error(err.response.data.errors);
  }
} )

export const searching = createAsyncThunk('/search', async ({ searchText }) => {
  try {
    const query = new URLSearchParams();
    if (searchText) query.append("searchTerm", searchText);
    
    const response = await axiosInstance.post(`/admin/search/?${query.toString()}`);
    console.log("data in slice ",response.data)
    return response.data; 
  } catch (e) {
    console.log(e);
    throw e;
  }
});


const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);
        state.user = action?.payload?.user;
        state.isLoggedIn = true;
        // localStorage.setItem("user", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", "true");
        // localStorage.setItem("token", action?.payload?.token);
        // console.log("islogin ", state.isLoggedIn);
      })
      .addCase(fetchProfile.fulfilled , (state , action)=>{
        state.user = action.payload.user
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {

        state.allusers = action?.payload?.users;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
      
        state.singleuser = action.payload.singleUser;
      })
      .addCase(registerUserByAdmin.fulfilled , (state , action)=>{
      
        state.user = action?.payload?.user
      })
      .addCase(deleteUser.fulfilled , (state ,action)=>{
        state.user = action.payload.user
      })
      .addCase(updateUser.fulfilled ,(state , action)=>{
          state.user = action.payload.action
      })
   .addCase(logout.fulfilled , (state , action)=>{
    state.isLoggedIn = false
   })
   .addCase(searching.fulfilled , (state ,action)=>{
      
      console.log(state)
   })

  },
});

export const authReducer = authSlice.reducer;
