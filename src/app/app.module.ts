import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { UserComponent } from './user/user.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { UserContextService } from './services/user-context.service';
import { MatToolbarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { RoutePanelComponent } from './route-panel/route-panel.component';
import { MatSidenavModule } from '@angular/material';
import { ChatComponent } from './chat/chat.component';
import { StartPageComponent } from './start-page/start-page.component';
import { StationsComponent } from './stations/stations.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { ForumComponent } from './forum/forum.component';
import { MyMeasurementComponent } from './my-measurement/my-measurement.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { MatTabsModule } from '@angular/material';
import { AdminMeasurementComponent } from './admin-measurement/admin-measurement.component';
import { AdminStationsComponent } from './admin-stations/admin-stations.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminStatisticComponent } from './admin-statistic/admin-statistic.component';
import { StationsService } from './services/stations.service';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { PapaParseModule } from 'ngx-papaparse';
import { MatPaginatorModule } from '@angular/material';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { AgGridModule } from 'ag-grid-angular';
import { LogAndRegComponent } from './log-and-reg/log-and-reg.component';
import {MeasurementService} from './services/measurement.service';
import { ForumThreadComponent } from './forum-thread/forum-thread.component';
import {ForumService} from './services/forum.service';
import {ChatService} from './services/chat.service';
import { BigchartComponent } from './bigchart/bigchart.component';
import {ChartColor} from 'chart.js';
import {ChartService} from './services/chart.service';
import {LogService} from './services/log.service';
import {MatMenuModule} from '@angular/material/menu';
import { PrognozaComponent } from './prognoza/prognoza.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'stations', component: StationsComponent },
  { path: 'measurement', component: MeasurementComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'mymeasurement', component: MyMeasurementComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'admin', component: AdminModuleComponent },
  { path: 'lodandreg', component: LogAndRegComponent },
  { path: 'thread', component: ForumThreadComponent },
  { path: 'chart', component: BigchartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    UserComponent,
    MainToolbarComponent,
    LoginComponent,
    RegisterComponent,
    RoutePanelComponent,
    ChatComponent,
    StartPageComponent,
    StationsComponent,
    MeasurementComponent,
    ForumComponent,
    MyMeasurementComponent,
    MyAccountComponent,
    AdminModuleComponent,
    AdminMeasurementComponent,
    AdminStationsComponent,
    AdminUsersComponent,
    AdminStatisticComponent,
    AdminLogComponent,
    StationListComponent,
    StationDetailComponent,
    LogAndRegComponent,
    ForumThreadComponent,
    BigchartComponent,
    PrognozaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    LayoutModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    CdkTableModule,
    PapaParseModule,
    MatPaginatorModule,
    MatMenuModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [UserService,
    UserContextService,
    StationsService,
    MeasurementService,
    ForumService,
    ChatService,
    ChartService,
    LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
