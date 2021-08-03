import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { ProfileComponent } from './my_profile/profile/profile.component';
import { ChangePasswordComponent } from './my_profile/change-password/change-password.component';
import { UsersComponent } from './admin_work/users/users.component';
import { CustomersComponent} from './admin_work/customers/customers.component';
import { RouteGuard } from "../app/service/auth-guard.service";
import { ProductComponent } from './admin_work/product/product.component';
import { InspirationComponent } from './admin_work/Inspiration/inspiration.component';
import { AdminMyteamComponent } from './admin_work/admin-myteam/admin-myteam.component';
import { StoryComponent } from './admin_work/story/story.component';
import { FolderComponent} from './admin_work/folder/folder.component';
import { SubfolderComponent } from './admin_work/subfolder/subfolder.component';
import { VisionComponent } from './admin_work/vision/vision.component';
import { VideosComponent } from './admin_work/videos/videos.component';
import { BooksComponent } from './admin_work/books/books.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [RouteGuard],
    children: [
      {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
      { path: 'dashboard', loadChildren: () => import('./admin_work/dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path:'profile', component:ProfileComponent, data: { breadcrumb: 'My Profile' }},
      { path:'changePassword', component:ChangePasswordComponent, data: { breadcrumb: 'Change Password' }},
      { path:'users', component:UsersComponent, data: { breadcrumb: 'Banners' }},
      { path:'customers', component:CustomersComponent, data: { breadcrumb: 'Counter' }},
      { path:'products', component:ProductComponent, data: { breadcrumb: 'About Us' }},
      { path:'adminMaster', component:InspirationComponent, data: { breadcrumb: 'Inspiration' }},
      { path:'adminMyteam', component:AdminMyteamComponent, data: { breadcrumb: 'Latest Activities' }},
      { path: 'map', loadChildren: () => import('./map/google-map/google-map.module').then(m => m.GoogleMapModule),},
      { path:'story', component:StoryComponent, data: { breadcrumb: 'How Did We Get Started?' }},
      { path:'folder', component:FolderComponent, data:{breadcrumb:'Gallery'}},
      { path:'subfolder', component:SubfolderComponent, data:{breadcrumb:'Image'}},
      { path:'vision', component:VisionComponent, data:{breadcrumb:'Vision'}},
      { path:'videos', component:VideosComponent, data:{breadcrumb:'Videos'}},
      { path:'books', component:BooksComponent, data:{breadcrumb:'Books'}},
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
