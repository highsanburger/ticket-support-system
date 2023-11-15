import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Tickets",
    path: "/dashboard/my-tickets",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Ticket",
    path: "/dashboard/add-ticket",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Tickets",
    path: "/dashboard/enrolled-tickets",
    type: ACCOUNT_TYPE.CLIENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,

    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.CLIENT,
    icon: "VscBookmark",
  },
  {
    name: "Admin Panel",
    path: "/dashboard/admin-panel",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscHistory",
  },
];
