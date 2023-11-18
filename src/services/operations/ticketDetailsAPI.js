import { toast } from "react-hot-toast";
import { setProgress } from "../../slices/loadingBarSlice";


// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { ticketEndpoints } from "../apis";

const {
  TICKET_DETAILS_API,
  TICKET_CATEGORIES_API,
  CREATE_CATEGORY_API,
  GET_ALL_TICKET_API,
  CREATE_TICKET_API,
  EDIT_TICKET_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_ADMIN_TICKETS_API,
  DELETE_TICKET_API,
  GET_FULL_TICKET_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  ADD_TICKET_TO_CATEGORY_API,
  SEARCH_TICKETS_API,
} = ticketEndpoints;

export const getAllTickets = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_TICKET_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Ticket Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_TICKET_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchTicketDetails = async (ticketId, dispatch) => {
  // const toastId = toast.loading("Loading...")
  dispatch(setProgress(50));
  let result = null;
  try {
    const response = await apiConnector("POST", TICKET_DETAILS_API, {
      ticketId,
    });
    console.log("Ticket_DETAILS_API API RESPONSE............", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data[0];
  } catch (error) {
    console.log("Ticket_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  // toast.dismiss(toastId)
  dispatch(setProgress(100));
  //   dispatch(setLoading(false));
  return result;
};

// fetching the available Ticket categories
export const fetchTicketCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", TICKET_CATEGORIES_API);
    console.log("Ticket_CATEGORIES_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Ticket Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("Ticket_CATEGORY_API API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  return result;
};

// add the Ticket details
export const addTicketDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_TICKET_API, data, {
      "Content-Type": "multipart/form-data",
      Authorisation: `Bearer ${token}`,
    });
    console.log("CREATE TICKET API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Ticket Details");
    }
    toast.success("Ticket Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE Ticket API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// edit the Ticket details
export const editTicketDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_TICKET_API, data, {
      "Content-Type": "multipart/form-data",
      Authorisation: `Bearer ${token}`,
    });
    console.log("EDIT TICKET API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Ticket Details");
    }
    toast.success("Ticket Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT Ticket API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// create a section
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("CREATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Ticket Section Created");
    result = response?.data?.updatedTicket;
    console.log("create API RESULT............", result);
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Uploading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update a section
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Ticket Section Updated");
    result = response?.data?.updatedTicket;
    console.log("Update API RESULT............", result);
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("UPDATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a section
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Ticket Section Deleted");
    result = response?.data?.updatedTicket;
    console.log("Delete API RESULT............", result);
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
    console.log("Delete subsection API RESULT............", result);
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// fetching all Tickets under a specific Admin
export const fetchAdminTickets = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_ADMIN_TICKETS_API,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    );
    console.log("Admin TICKETS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Admin Tickets");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("Admin TicketS API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a Ticket
export const deleteTicket = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_TICKET_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("DELETE TICKET API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Ticket");
    }
    toast.success("Ticket Deleted");
  } catch (error) {
    console.log("DELETE TICKET API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

// get full details of a Ticket
export const getFullDetailsOfTicket = async (ticketId, token) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_TICKET_DETAILS_AUTHENTICATED,
      {
        ticketId,
      },
      {
        Authorisation: `Bearer ${token}`,
      }
    );
    console.log("TICKET_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("TICKET_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

// create a rating for TICKET
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("CREATE RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }
    toast.success("Rating Posted");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE RATING API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return success;
};

//add TICKET to Category
export const addTicketToCategory = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector(
      "POST",
      ADD_TICKET_TO_CATEGORY_API,
      data,
      {
        Authorisation: `Bearer ${token}`,
      }
    );
    console.log("ADD TICKET TO CATEGORY API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Ticket To Category");
    }
    toast.success("Ticket Added To Category");
    success = true;
  } catch (error) {
    success = false;
    console.log("ADD TICKET TO CATEGORY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};

//search Tickets
export const searchTickets = async (searchQuery, dispatch) => {
  // const toastId = toast.loading("Loading...")
  dispatch(setProgress(50));
  let result = null;
  try {
    const response = await apiConnector("POST", SEARCH_TICKETS_API, {
      searchQuery: searchQuery,
    });
    console.log("SEARCH TICKETS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Search Tickets");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("SEARCH TICKETS API ERROR............", error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId)
  dispatch(setProgress(100));
  return result;
};

//create category
export const createCategory = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("CREATE CATEGORY API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Category");
    }
    toast.success("Category Created");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE CATEGORY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
