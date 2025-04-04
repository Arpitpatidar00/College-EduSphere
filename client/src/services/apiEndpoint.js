export const apiEndPoints = {
  //@admin
  adminLogin: "/auth/admin/login",
  adminSignup: "/auth/admin/signup",

  //@college
  collegeSignup: "/auth/college/signup",
  collegeLogin: "/auth/college/login",
  getAllCollege: "/college/get-all-colleges",
  updateCollege: "/college/update",
  updateCollegeStatus: "/college/toggle-field",

  //@student
  studentLogin: "/auth/student/login",
  studentSignup: "/auth/student/signup",
  getAllStudents: "/student/get-all-students",
  updateStudent: "/student/update",
  updateStudentStatus: "/student/toggle-field",

  //@location - Countries
  getAllCountries: "/location/get-all-counties",
  createCountry: "/location/create",
  updateCountry: "/location/update-country",
  deleteCountry: "/location/delete-country",
  toggleCountry: "/location/country-activate",

  //@location - States
  getAllStates: "/location/get-all-states",
  createState: "/location/create-state",
  updateState: "/location/update-state",
  deleteState: "/location/delete-state",
  toggleState: "/location/state-activate",

  //@location - Cities
  getAllCities: "/location/get-all-cities",
  createCity: "/location/create-city",
  updateCity: "/location/update-city",
  deleteCity: "/location/delete-city",
  toggleCity: "/location/city-activate",

  //@posts
  createPost: "/post/create-post",
  getAllPosts: "/post/get-all-posts",
  getPostById: "/post/:id",
  updatePost: "/post/update-post/:id",
  deletePost: "/post/delete-post/:id",
  togglePostActive: "/post/:id/toggle-active",
  likePost: "/post/add-like/:id",
  unlikePost: "/post/remove-like/:id",
  incrementPostView: "/post/:id/increment-view",

  // New chat endpoints
  getMessages: "/chat/messages",
  sendMessage: "/chat/message",
  createDirectChat: "/chat/create-direct",
  createGroupChat: "/chat/create-group",

  toggleLike: "/likes/toggle",
  createComment: "/comments/create",
  deleteComment: "/comments",
  getComments: "/comments",

  followUser: "/follow/follow-user",
  getFollowers: "/follow/followers",
  getFollowing: "/follow/following",
  blockUser: "/follow/block-user",
};
