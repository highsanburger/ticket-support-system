const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_TICKETS_API: BASE_URL + "/profile/getEnrolledTickets",
  GET_ALL_ADMIN_DASHBOARD_DETAILS_API:
    BASE_URL + "/profile/getAdminDashboardDetails",
};

// clientS ENDPOINTS
export const clientEndpoints = {
 
};

// ticket ENDPOINTS
export const ticketEndpoints = {
  GET_ALL_TICKET_API: BASE_URL + "/ticket/getAllTickets",
  TICKET_DETAILS_API: BASE_URL + "/ticket/getTicketDetails",
  EDIT_TICKET_API: BASE_URL + "/ticket/editTicket",
  TICKET_CATEGORIES_API: BASE_URL + "/ticket/showAllCategories",
  CREATE_TICKET_API: BASE_URL + "/ticket/createTicket",
  CREATE_SECTION_API: BASE_URL + "/ticket/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/ticket/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/ticket/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/ticket/updateSubSection",
  GET_ALL_ADMIN_TICKETS_API: BASE_URL + "/ticket/getAdminTickets",
  DELETE_SECTION_API: BASE_URL + "/ticket/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/ticket/deleteSubSection",
  DELETE_TICKET_API: BASE_URL + "/ticket/deleteTicket",
  GET_FULL_TICKET_DETAILS_AUTHENTICATED:
    BASE_URL + "/ticket/getFullTicketDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/ticket/updateTicketProgress",
  CREATE_RATING_API: BASE_URL + "/ticket/createRating",
  ADD_TICKET_TO_CATEGORY_API: BASE_URL + "/ticket/addTicketToCategory",
  SEARCH_TICKETS_API: BASE_URL + "/ticket/searchTicket",
  CREATE_CATEGORY_API: BASE_URL + "/ticket/createCategory",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/ticket/getReviews",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/ticket/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/ticket/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact/contactUs",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
