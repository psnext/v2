
import * as React from 'react';
import AppLayout from './AppLayout';
import Typography from "@mui/material/Typography";
import AdminLayout from '@/pages/admin/layout/layout';

const Unauthorized = ()=>(
  <div>
    <Typography variant='h2' color='error'>Unauthorized!</Typography>
  </div>
)

const PageLoadingPlaceholder = ()=>(
  <div>
    <Typography variant='h6' color='info'>Loading....</Typography>
  </div>
)

const Dashboard = React.lazy(() =>import('../pages/Dashboard/dashboard'));
const DashboardPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><Dashboard/></React.Suspense>

const Login = React.lazy(() => import("@/pages/Login/login"));
const LoginPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><Login/></React.Suspense>

const Profile = React.lazy(() => import('@/pages/Profile/profile'));
const ProfilePage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><Profile/></React.Suspense>

const Teams = React.lazy(() => import('@/pages/Teams/teams'));
const TeamsPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><Teams/></React.Suspense>

const DevSettings = React.lazy(() => import('@/pages/devsettings/devsettings'));
const DevSettingsPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><DevSettings/></React.Suspense>


const AdminDashboard = React.lazy(() => import('@/pages/admin/dashboard/dashboard'));
const AdminDashboardPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><AdminDashboard/></React.Suspense>

const AdminUsers = React.lazy(() => import('@/pages/admin/users/admin.users'));
const AdminUsersPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><AdminUsers/></React.Suspense>

const AdminRoles = React.lazy(() => import('@/pages/admin/roles/admin.roles'));
const AdminRolesPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><AdminRoles/></React.Suspense>

const AdminPerms = React.lazy(() => import('@/pages/admin/permissions/admin.permissions'));
const AdminPermsPage = ()=><React.Suspense fallback={<PageLoadingPlaceholder/>}><AdminPerms/></React.Suspense>

export type RouteMap = {
  path?: string,
  element?: JSX.Element,
  routes?: Array<RouteMap>,
  roles?:Array<string>,
  index?:boolean
}

const routeMap:RouteMap ={
  path: '/',
  element:<AppLayout/>,
  routes: [
    {
      roles:[],
      routes:[
        {path:'/login', element:<LoginPage/>,},
        {path:'/unauthorized', element:<Unauthorized/>}
      ]
    },
    {
      roles:['default'],
      routes:[
        {index:true, path:'/', element:<DashboardPage/>},
        {path:'/profile/:userId', element:<ProfilePage/>},
        {path:'/teams', element:<TeamsPage/>},
        {path:'/developer', element:<DevSettingsPage/>},
      ]
    },
    {
      roles:['admin'],
      routes:[
        {path:'/admin', element:<AdminLayout/>, routes:[
          {index:true, path:'', element:<AdminDashboardPage/>},
          {path:'users', element:<AdminUsersPage/>},
          {path:'roles', element:<AdminRolesPage/>},
          {path:'permissions', element:<AdminPermsPage/>},
        ]}
      ]
    }
  ]
};

export default routeMap;
