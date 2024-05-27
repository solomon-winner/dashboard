import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SideBar } from "./components/sidebar/SideBar";
import { Region } from "./pages/Region";
import { Wereda } from "./pages/Wereda";
import { Kebele } from "./pages/Kebele";
import { Site } from "./pages/Site";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Details } from "./components/kebele/Details";
import { AddKebele } from "./components/kebele/AddKebele";
import { AddSite } from "./components/site/AddSite";
import { AddRegion } from "./components/region/AddRegion";
import { Addwereda } from "./components/wereda/AddWereda";
import { Updatewereda } from "./components/wereda/UpdateWereda";
import { UpdateRegion } from "./components/region/UpdateRegion";
import { UpdateSite } from "./components/site/UpdateSite";
import { UpdateKebele } from "./components/kebele/UpdateKebele";
import { WeredaDetails } from "./components/wereda/Details";
import { SiteDetails } from "./components/site/Details";
import Accounts from "./pages/Accounts";
import NewUser from "./components/account/NewUser";
import ChangePassword from "./components/profile/ChangePassword";
import { UpdatePersonalInfo } from "./pages/UpdatePersonalInfo";
import { RegionDetails } from "./components/region/Details";
import RequireAuth from "./redux/auth/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddSiteInfo } from "./components/site/AddSiteInfo";
import { Weredas } from "./components/wereda/Weredas";
import Kebeles from "./components/kebele/Kebeles";
import Roles from "./pages/Roles";
import CreateRole from "./components/roles/CreateRoles";
import EditRole from "./components/roles/EditRole";
import { ProfileInfo } from "./redux/InitialState/ProfileInfo";
import { useGetRegion } from "./redux/InitialState/GetRegion";
import { GetRoles } from "./redux/InitialState/GetRoles";
import { useGetInstitution } from "./redux/InitialState/GetInstitution";
import { useGetResource } from "./redux/InitialState/GetResource";
import { UpdateWeredaForm } from "./components/wereda/UpdateWeredaForm";
import { UpdateSiteForm } from "./components/site/UpdateSiteForm";
import { GetWereda } from "./redux/InitialState/GetWereda";
import UpdateKebeleForm from "./components/kebele/UpdateKebeleForm";
import { GetAccount } from "./redux/InitialState/GetAccount";
import { EditAccount } from "./components/account/EditAccount";
import { Regions } from "./components/region/Region";
import { RegionUpdate } from "./components/region/RegionUpdate";
import DeletedPage from "./pages/DeletedPage";
import { PasswordResetPage } from "./components/account/PasswordResetPage";
import { useSelector } from "react-redux";

function App() {
  const all_permissions = useSelector((state) => state.auth.all_permissions);
  ProfileInfo();
  useGetRegion();
  GetRoles();
  GetAccount();
  useGetInstitution();
  useGetResource();
  return (
    <div className="bg-dashbordColor">
      <ToastContainer />
      <Routes>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<SideBar />}>
            <Route path="/admin" element={<Dashboard />} />

            {/* Region */}
            {all_permissions.includes("view_regions") && (
              <>
              <Route path="/admin/region" element={<Region />} />
              <Route path="/admin/region/:id" element={<RegionDetails />} />
              </>
            )}
            <Route path="/admin/new-region" element={<AddRegion />} />
            <Route path="/admin/update-region/:id" element={<UpdateRegion />} />
            {all_permissions.includes("edit_regions") && (
              <Route
                path="/admin/update-regions/:id"
                element={<RegionUpdate />}
              />
            )}
            {all_permissions.includes("create_regions") && (
              <Route path="/admin/add-region" element={<Regions />} />
            )}


            {/* Woreda */}
            {all_permissions.includes("view_woredas") && (
              <>
              <Route path="/admin/wereda" element={<Wereda />} />
              <Route path="/admin/wereda/:id" element={<WeredaDetails />} />
              </>
            )}
            {all_permissions.includes("create_woreda_data") && (
              <Route path="/admin/new-wereda" element={<Addwereda />} />
            )}
            {all_permissions.includes("edit_woreda_data") && (
              <Route
              path="/admin/update-weredaData/:id"
              element={<Updatewereda />}
              />
            )}
            {all_permissions.includes("edit_woredas") && (
              <Route
              path="/admin/update-wereda/:id"
              element={<UpdateWeredaForm />}
              />
            )}
            {all_permissions.includes("create_woredas") && (
              <Route path="/admin/add-weredas" element={<Weredas />} />
            )}


            {/* Kebele */}
            {all_permissions.includes("view_kebeles") && (
              <>
                <Route path="/admin/kebele" element={<Kebele />} />
                <Route path="/admin/kebele/:id" element={<Details />} />
              </>
            )}
            {all_permissions.includes("create_kebele_data") && (
              <Route path="/admin/new-kebele" element={<AddKebele />} />
            )}
            {all_permissions.includes("edit_kebele_data") && (
              <Route
                path="/admin/update-kebeleData/:id"
                element={<UpdateKebele />}
              />
            )}
            {all_permissions.includes("edit_kebeles") && (
              <Route
                path="/admin/update-kebele/:id"
                element={<UpdateKebeleForm />}
              />
            )}
             {all_permissions.includes("create_kebeles") && (
              <Route path="/admin/add-kebele" element={<Kebeles />} />
            )}


            {/* Site */}
            {all_permissions.includes("view_sites") && (
              <>
              <Route path="/admin/site" element={<Site />} />
              <Route path="/admin/site/:id" element={<SiteDetails />} />
              </>
            )}
            {all_permissions.includes("create_site_data") && (
              <Route path="/admin/new-site" element={<AddSite />} />
            )}
            {all_permissions.includes("edit_site_data") && (
              <Route
                path="/admin/update-siteData/:id"
                element={<UpdateSite />}
              />
            )}
            {all_permissions.includes("edit_sites") && (
              <Route
                path="/admin/update-site/:id"
                element={<UpdateSiteForm />}
              />
            )}
            {all_permissions.includes("create_sites") && (
              <Route path="/admin/add-sites" element={<AddSiteInfo />} />
            )}


            {/* Accounts */}
            {all_permissions.includes("view_users") && (
              <Route path="/admin/accounts" element={<Accounts />} />
            )}
            {all_permissions.includes("create_users") && (
              <Route path="/admin/new-user" element={<NewUser />} />
            )}
            {all_permissions.includes("edit_users") && (
              <Route
              path="/admin/update-account/:id"
              element={<EditAccount />}
              />
            )}
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/ChangePassword" element={<ChangePassword />} />
            <Route
              path="/admin/UpdatePersonalInfo"
              element={<UpdatePersonalInfo />}
            />

            
            {/* Roles */}         
            {all_permissions.includes("view_roles") && (
              <Route path="/admin/roles" element={<Roles />} />
            )}
            {all_permissions.includes("create_roles") && (
              <Route path="/admin/create-roles" element={<CreateRole />} />
            )}
            {all_permissions.includes("edit_roles") && (
              <Route path="/admin/update-roles/:id" element={<EditRole />} />
            )}
            
            
            <Route path="/admin/delete-page" element={<DeletedPage />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      </Routes>
    </div>
  );
}

export default App;
