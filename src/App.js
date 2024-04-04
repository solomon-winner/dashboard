import './App.css';
import { Routes, Route } from 'react-router-dom';
import { SideBar } from './components/sidebar/SideBar';
import { Region } from './pages/Region'
import { Wereda } from './pages/Wereda';
import { Kebele } from './pages/Kebele';
import { Site } from './pages/Site';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Details } from './components/kebele/Details';
import { AddKebele } from './components/kebele/AddKebele';
import { AddSite } from './components/site/AddSite';
import { AddRegion } from './components/region/AddRegion';
import { Addwereda } from './components/wereda/AddWereda';
import { Updatewereda } from './components/wereda/UpdateWereda';
import { UpdateRegion } from './components/region/UpdateRegion';
import { UpdateSite } from './components/site/UpdateSite';
import { UpdateKebele } from './components/kebele/UpdateKebele';
import {WeredaDetails} from './components/wereda/Details'
import { SiteDetails } from './components/site/Details';
import Accounts from './pages/Accounts';
import NewUser from './components/account/NewUser';
import ChangePassword from './components/profile/ChangePassword'
import {UpdatePersonalInfo} from './pages/UpdatePersonalInfo'
import { RegionDetails } from './components/region/Details';
import RequireAuth from './redux/auth/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddSiteInfo } from './components/site/AddSiteInfo';
import { Weredas } from './components/wereda/Weredas';
import Kebeles from './components/kebele/Kebeles';
import Roles from './pages/Roles';
import CreateRole from './components/roles/CreateRoles';
import EditRole from './components/roles/EditRole';
import { ProfileInfo } from './redux/InitialState/ProfileInfo';
import { useGetRegion } from './redux/InitialState/GetRegion';
import { GetRoles } from './redux/InitialState/GetRoles';
import { useGetInstitution } from './redux/InitialState/GetInstitution';
import { useGetResource } from './redux/InitialState/GetResource';
import { UpdateWeredaForm } from './components/wereda/UpdateWeredaForm';
import { UpdateSiteForm } from './components/site/UpdateSiteForm';
import { GetWereda } from './redux/InitialState/GetWereda';
import UpdateKebeleForm from './components/kebele/UpdateKebeleForm';

function App() {

  ProfileInfo()
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  return (

    <div>
       <ToastContainer />
      <Routes>
      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
      <Route path="/admin" element={<SideBar />} >
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/region' element={<Region />} />
        <Route path='/admin/wereda' element={<Wereda />} />
        <Route path='/admin/kebele' element={<Kebele />} />
        <Route path='/admin/site' element={<Site />} />
        <Route path='/admin/accounts' element={<Accounts />} />
        <Route path='/admin/profile' element={<Profile />} />
        <Route path='/admin/kebele/:id' element={ <Details />} />
        <Route path='/admin/new-kebele' element={<AddKebele />} />
        <Route path='/admin/new-site' element={ <AddSite />} />
        <Route path='/admin/new-region' element={<AddRegion />} />
        <Route path='/admin/new-wereda' element={<Addwereda/>} />
        <Route path='/admin/update-weredaData/:id' element={<Updatewereda/>} />
        <Route path='/admin/update-wereda/:id' element={<UpdateWeredaForm/>} />
        <Route path='/admin/update-region/:id' element={<UpdateRegion />} />
        <Route path='/admin/update-siteData/:id' element={ <UpdateSite />} />
        <Route path='/admin/update-site/:id' element={ <UpdateSiteForm />} />
        <Route path='/admin/update-kebeleData/:id' element={<UpdateKebele />} />
        <Route path='/admin/update-kebele/:id' element={<UpdateKebeleForm />} />
        <Route path='/admin/wereda/:id' element={<WeredaDetails />} />
        <Route path='/admin/site/:id' element={<SiteDetails />} />
        <Route path='/admin/region/:id' element={<RegionDetails />} />
        <Route path='/admin/new-user' element={<NewUser />} />
        <Route path= '/admin/ChangePassword' element = {<ChangePassword/>}/>
        <Route path= '/admin/UpdatePersonalInfo' element = {<UpdatePersonalInfo/>} />
        <Route path='/admin/add-sites' element={<AddSiteInfo />} />
        <Route path='/admin/add-weredas' element={<Weredas/>}/>
        <Route path='/admin/add-kebele' element={<Kebeles />} />
        <Route path='/admin/roles' element={<Roles />} />
        <Route path='/admin/create-roles' element={<CreateRole />} />
        <Route path='/admin/update-roles/:id' element={<EditRole />} />
      </Route>
      </Route>
       
       {/* Public Routes */}
      <Route path='/' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Routes>
      
    </div>
  );
}

export default App;
