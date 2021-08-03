import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule , ExcelModule } from '@progress/kendo-angular-grid';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent, UploadInterceptor } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular goggle map
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ProfileComponent } from './my_profile/profile/profile.component';
import { ChangePasswordComponent } from './my_profile/change-password/change-password.component';
import { UsersComponent } from './admin_work/users/users.component';
import { CustomersComponent } from './admin_work/customers/customers.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DatePipe } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { OrgChartModule } from 'angular-org-chart';
import { ProductComponent } from './admin_work/product/product.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { InspirationComponent } from './admin_work/Inspiration/inspiration.component';
import { AdminMyteamComponent } from './admin_work/admin-myteam/admin-myteam.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { StoryComponent } from './admin_work/story/story.component';
import { FolderComponent } from './admin_work/folder/folder.component';
import { SubfolderComponent } from './admin_work/subfolder/subfolder.component';
import { VisionComponent } from './admin_work/vision/vision.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { VideosComponent } from './admin_work/videos/videos.component';
import { BooksComponent } from './admin_work/books/books.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    AuthComponent,
    ProfileComponent,
    ChangePasswordComponent,
    UsersComponent,
    CustomersComponent,
    ProductComponent,
    InspirationComponent,
    AdminMyteamComponent,
    StoryComponent,
    FolderComponent,
    SubfolderComponent,
    VisionComponent,
    VideosComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ExcelModule ,
    SharedModule,
    HttpClientModule,
    OrgChartModule,
    FormsModule,
    GridModule,
    InputsModule,
    AngularEditorModule ,
    DropDownsModule,
    TreeViewModule,
    PopupModule,
    GaugesModule,
    ChartsModule,
    UploadsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    DateInputsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3KFXnK3IJcS1mbblaMpwYbV1ahZHy1zg',
    }),
    AgmDirectionModule, 
     // Specify ng-circle-progress as an import
     NgCircleProgressModule.forRoot({}),
     ConfirmationPopoverModule.forRoot({confirmButtonType:'danger'})
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: UploadInterceptor,
    multi: true
}],
  bootstrap: [AppComponent],
})
export class AppModule { }
