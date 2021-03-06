import VectorMap from "views/maps/VectorMap.jsx";
import GoogleMaps from "views/maps/GoogleMaps.jsx";
import FullScreenMap from "views/maps/FullScreenMap.jsx";
import ReactTables from "views/tables/ReactTables.jsx";
import RegularTables from "views/tables/RegularTables.jsx";
import ExtendedTables from "views/tables/ExtendedTables.jsx";
import Wizard from "views/forms/Wizard.jsx";
import ValidationForms from "views/forms/ValidationForms.jsx";
import ExtendedForms from "views/forms/ExtendedForms.jsx";
import RegularForms from "views/forms/RegularForms.jsx";
import Calendar from "views/Calendar.jsx";
import Widgets from "views/Widgets.jsx";
import Charts from "views/Charts.jsx";
import Dashboard from "views/Dashboard.jsx";
import Buttons from "views/components/Buttons.jsx";
import SweetAlert from "views/components/SweetAlert.jsx";
import Notifications from "views/components/Notifications.jsx";
import Grid from "views/components/Grid.jsx";
import Typography from "views/components/Typography.jsx";
import Panels from "views/components/Panels.jsx";
import Icons from "views/components/Icons.jsx";
import Pricing from "views/pages/Pricing.jsx";
import TimelineSchedule from "views/schedule/TimelineSchedule";
import User from "views/pages/User.jsx";
import Login from "views/login/Login.jsx";
import Register from "views/pages/Register.jsx";
import Rtl from "views/pages/Rtl.jsx";
import Lock from "views/pages/Lock.jsx";
import Schedule from "views/schedule/Schedule";
import RegisterSchedule from "views/schedule/RegisterSchedule";
import Download from "views/support/Download.jsx";

import BackOffice from "views/schedule/BackOffice";
import Customer from "views/schedule/Customer"
import Execution from "views/schedule/Execution";

import Gallery from "views/gallery/Gallery";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Shedule",
    rtlName: "صفحات",
    icon: "tim-icons icon-calendar-60",
    state: "pagesCollapse",
    views: [  
      {
        path: "/customer",
        name: "Customer",
        rtlName: "عالتسعير",
        mini: "CT",
        rtlMini: "ع",
        component: Customer,
        layout: "/admin"
      },   
      {
        path: "/backoffice",
        name: "BackOffice",
        rtlName: "عالتسعير",
        mini: "BK",
        rtlMini: "ع",
        component: BackOffice,
        layout: "/admin",
        invisible: true,
      },  
      {
        path: "/register",
        name: "Register",
        rtlName: "عالتسعير",
        mini: "RS",
        rtlMini: "ع",
        component: RegisterSchedule,
        layout: "/admin"
      },   
      {
        path: "/execution",
        name: "Execution",
        rtlName: "عالتسعير",
        mini: "EX",
        rtlMini: "ع",
        component: Execution,
        layout: "/admin"
      }, 
      {
        path: "/shedule",
        name: "Panel",
        rtlName: "عالتسعير",
        mini: "PN",
        rtlMini: "ع",
        component: Schedule,
        layout: "/admin",
      }, 
    ]
  },
  {
    collapse: true,
    name: "Auth",
    rtlName: "صفحات",
    icon: "tim-icons icon-settings",
    state: "pagesCollapse",
    invisible: true,
    views: [    
      {
        path: "/Login",
        name: "Login",
        rtlName: "عالتسعير",
        mini: "LG",
        rtlMini: "ع",
        component: Login,
        layout: "/auth",
      },   
      {
        path: "/Register",
        name: "Register",
        rtlName: "عالتسعير",
        mini: "RE",
        rtlMini: "ع",
        component: Register,
        layout: "/auth"
      },  

    ]
  },
  {
    collapse: true,
    name: "Gallery",
    rtlName: "صفحات",
    icon: "tim-icons icon-camera-18",
    state: "pagesCollapse",
    views: [    
      {
        path: "/Gallery",
        name: "Pictures Deposit",
        rtlName: "عالتسعير",
        mini: "PD",
        rtlMini: "ع",
        component: Gallery,
        layout: "/admin",
      },   
    ]
  },



];

//if(prop.invisible) return null;

export default routes;
