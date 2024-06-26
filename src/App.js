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
import NotFoundPage from "./components/Resource/Utility/NotFoundPage";
import ForbiddenPage from "./components/Resource/Utility/ForbiddenPage";

function App() {
  const all_permissions = useSelector((state) => state.auth?.all_permissions);


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
            {all_permissions?.includes("view_regions") ? (
              <>
              <Route path="/admin/region" element={<Region />} />
              <Route path="/admin/region/details" element={<RegionDetails />} />
              </>
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            <Route path="/admin/new-region" element={<AddRegion />} />
            <Route path="/admin/update-region/update" element={<UpdateRegion />} />
            {all_permissions?.includes("edit_regions") ? (
              <Route
                path="/admin/update-regions/update"
                element={<RegionUpdate />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_regions") ? (
              <Route path="/admin/add-region" element={<Regions />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}


            {/* Woreda */}
            {all_permissions?.includes("view_woredas") ? (
              <>
              <Route path="/admin/wereda" element={<Wereda />} />
              <Route path="/admin/wereda/details" element={<WeredaDetails />} />
              </>
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_woreda_data") ? (
              <Route path="/admin/new-wereda" element={<Addwereda />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_woreda_data") ? (
              <Route
              path="/admin/update-weredaData/update"
              element={<Updatewereda />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_woredas") ? (
              <Route
              path="/admin/update-wereda/update"
              element={<UpdateWeredaForm />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_woredas") ? (
              <Route path="/admin/add-weredas" element={<Weredas />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}


            {/* Kebele */}
            {all_permissions?.includes("view_kebeles") ? (
              <>
                <Route path="/admin/kebele" element={<Kebele />} />
                <Route path="/admin/kebele/details" element={<Details />} />
              </>
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_kebele_data") ? (
              <Route path="/admin/new-kebele" element={<AddKebele />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_kebele_data") ? (
              <Route
                path="/admin/update-kebeleData/update"
                element={<UpdateKebele />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_kebeles") ? (
              <Route
                path="/admin/update-kebele/update"
                element={<UpdateKebeleForm />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
             {all_permissions?.includes("create_kebeles") ? (
              <Route path="/admin/add-kebele" element={<Kebeles />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}


            {/* Site */}
            {all_permissions?.includes("view_sites") ? (
              <>
              <Route path="/admin/site" element={<Site />} />
              <Route path="/admin/site/details" element={<SiteDetails />} />
              </>
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_site_data") ? (
              <Route path="/admin/new-site" element={<AddSite />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_site_data") ? (
              <Route
                path="/admin/update-siteData/update"
                element={<UpdateSite />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_sites") ? (
              <Route
                path="/admin/update-site/update"
                element={<UpdateSiteForm />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_sites") ? (
              <Route path="/admin/add-sites" element={<AddSiteInfo />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}


            {/* Accounts */}
            {all_permissions?.includes("view_users") ? (
              <Route path="/admin/accounts" element={<Accounts />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_users") ? (
              <Route path="/admin/new-user" element={<NewUser />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_users") ? (
              <Route
              path="/admin/update-account/update"
              element={<EditAccount />}
              />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/ChangePassword" element={<ChangePassword />} />
            <Route
              path="/admin/UpdatePersonalInfo"
              element={<UpdatePersonalInfo />}
            />

            
            {/* Roles */}         
            {all_permissions?.includes("view_roles") ? (
              <Route path="/admin/roles" element={<Roles />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("create_roles") ? (
              <Route path="/admin/create-roles" element={<CreateRole />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            {all_permissions?.includes("edit_roles") ? (
              <Route path="/admin/update-roles/update" element={<EditRole />} />
            ):(
              <Route path="/admin/*" element={<ForbiddenPage />} />
            )}
            
            
            <Route path="/admin/delete-page" element={<DeletedPage />} />
            
          </Route>

        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
