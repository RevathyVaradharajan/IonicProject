import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/Home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
//import {TimeTablePage} from '../pages/Adding-new-ionic/timetable';
//import {TimeTable1} from '../pages/timetable/timetable';
import { NavgridPage} from '../pages/navgrid/navgrid';
import {QuizPage} from '../pages/quiz/quiz';
import {Quiz1} from '../pages/quiz_selected/quiz_selected';
import {QuizAdmin} from '../pages/quizadmin/quizadmin';
import {QuizAdmin1} from '../pages/quizadmin1/quizadmin1';
import {Resultview} from '../pages/exam_selected/exam_selected';
import {Test} from '../pages/quiz1/quiz1';
import {Test1} from '../pages/test/test';
import {Result} from '../pages/test_result/test_result';
import {MappagePage} from '../pages/mappage/mappage';
import { ConnectivityService } from '../providers/connectivity-service';
import {GalleryPage} from '../pages/gallery/gallery';
import { LocationTracker } from '../providers/location-tracker';
import {glocationPage} from '../pages/glocation/glocation';
import {MapPage} from '../pages/map/map';
import {PhotodisplayPage} from '../pages/photodisplay/photodisplay';
import {FlashCardComponent } from '../components/flash-card/flash-card';
import {Data} from '../providers/data';
import {notifyPage} from '../pages/notification_selected/notification_selected';
import { FeedListPage } from '../pages/feedlist/feedlist';
import { FeedService } from '../providers/feedservice';
import { Storage } from '@ionic/storage';
import {feedHomePage} from '../pages/feedhome/feedhome';
import {LoginPage} from '../pages/login/login';
import {Auth} from '../providers/auth';
import {HalfyearlyPage} from '../pages/halfyearly/halfyearly';
import {AnnualdayPage} from '../pages/annualday/annualday';
import {MarkAttendancePage} from '../pages/class/attendance/mark-attendance';
import {AttendanceReport} from '../pages/attendance-report/attendancereport';
import {DailyDiary} from '../pages/dailydiary/dailydiary';
import {ContactPage} from '../pages/dailydiary_selected/dailydiary_selected';
import {Exam} from '../pages/Exam/exam';
import {Notifynew} from '../pages/notification_view/notification_view';
import { Quiz2Page } from '../pages/quiz_result/quiz_result';
import {examNew} from '../pages/exam_view/exam_view';
import {ParentMeeting} from '../pages/parentmeeting/parentmeeting';
import {ParentMeeting_selected} from '../pages/parentmeeting_selected/parentmeeting_selected';
import {AttendanceReportSelected} from '../pages/attendancereport_selected/attendancereport_selected';


/*Services*/
import {ClassProvider} from '../providers/class-provider';
import {ConferenceData} from '../providers/Conference-Data';
import { QuizProvider} from '../providers/quiz-provider';

import {UserData} from '../providers/user-data';
import {ParentProvider} from '../providers/parent-provider';
import {ShareService} from '../providers/share-service';
import {ForgotpasswordPage} from '../pages/forgotpassword/forgotpassword';
import {AttendancePage} from '../pages/attendance/attendance';
import {MockattendancePage} from '../pages/mockattendance/mockattendance';
import {NotifyhomePage} from '../pages/notifyhome/notifyhome';
import {NotifybydatePage} from '../pages/notification/notification';
import {ClassYear} from '../pages/admin/class-year/class-year';
import {ClassMenuPage} from '../pages/admin/class-menu/class-menu-page';
import {ClassTimeTablePage} from '../pages/class/class-time-table/class-time-table';
import {ClassSubject} from '../pages/admin/class-subject/class-subject';
import {Attendance2Page} from '../pages/attendance_selected/attendance_selected';
import {ClassSubjectTeacherPage} from '../pages/admin/class-subject-teacher/class-subject-teacher';
import {ClassReferenceTimePage} from '../pages/admin/class-reference-time/class-reference-time';
import {ParentProfile} from '../pages/parent-profile/parent-profile';
import {StudentProfile} from '../pages/student-profile/student-profile';
import {Timetable2} from '../pages/time-table2/time-table2';
import {DiaryviewPage} from '../pages/diaryview/diaryview';
import {NotifythanksPage} from '../pages/notifythanks/notifythanks';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Angular2mapsPage } from '../pages/angular2maps/angular2maps';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LoginProvider} from '../providers/login-provider';
import {NotifyProvider} from '../providers/notify-provider';
import {DailydiaryProvider} from '../providers/dailydiary-provider';
import {ExamtimetableProvider} from '../providers/examtimetable-provider';
import {TimetableProvider} from '../providers/Timetable-provider';
import {ResultProvider} from '../providers/Result-provider';
import{AttendanceView} from '../pages/attendanceview/attendanceview';
import{Diaryview} from '../pages/dailydiary2/dailydiary2';
import {TimeTablePage} from '../pages/timetable/timetable';
import {timetable_create} from '../pages/timetable_create/timetable_create';
import {timetable_select} from '../pages/timetable_select/timetable_select';
import {TimeTableEdit} from '../pages/timetable_edit/timetable_edit';
import {ParentMeetProvider} from '../providers/parentmeet';
import {GlobalVars} from '../providers/global-provider';
import{MenuComponent} from '../pages/Menu/menu';
import{Page1} from '../pages/PageOne/pageone';
import{Period} from '../pages/period/period';
import{StudentDetails}from '../pages/studentDetails/sd';
import{adminmain} from '../pages/admin/adminmain/adminmain';
import{Datanew} from '../providers/datanew';
import {timetable_parent} from '../pages/timetable_parent/timetable_parent';
import{MasterProvider} from '../providers/master_service';
import{ParentView} from '../pages/Parentview/parentview';
/*import {ParallaxHeader} from '../components/parallax-header/parallax-header';*/


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ItemDetailsPage,
    ListPage,
    NavgridPage,
    QuizPage,
    Quiz1,
    QuizAdmin,
    Resultview,
    Test,
    MappagePage,
    GalleryPage,
    glocationPage,
    MapPage,
    PhotodisplayPage,
    FlashCardComponent,
    notifyPage,
    LoginPage,
    HalfyearlyPage,
    AnnualdayPage,
    MarkAttendancePage,
    ForgotpasswordPage,
    AttendancePage,
    MockattendancePage,
    NotifyhomePage,
    NotifybydatePage,
    ClassYear,
    ClassMenuPage,
    ClassTimeTablePage,
    ClassSubject,
    ClassSubjectTeacherPage,
    ClassReferenceTimePage,
    ParentProfile,
    StudentProfile,
    Timetable2,
    NotifythanksPage,
    Angular2mapsPage,
    Attendance2Page,
    AttendanceReport,
    DailyDiary,
    ContactPage,
    QuizAdmin1,Test1,
    Result,
    Exam,
    Notifynew,
    Quiz2Page,
    DiaryviewPage,
    examNew,
    ParentMeeting,
    ParentMeeting_selected,
    AttendanceView,
    Diaryview,
    TimeTablePage,
    timetable_create,
    timetable_select,
    TimeTableEdit,
    AttendanceReportSelected,
    MenuComponent,
    Page1,
    Period,
    adminmain,
    timetable_parent,
    StudentDetails,
    ParentView
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1EaqHjvkfEU2KsO-WQl2R6Kdc-jz9EJ8'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ItemDetailsPage,
    ListPage,
    NavgridPage,
    QuizPage,
    Quiz1,
    QuizAdmin,
    Resultview,
    Test,
    MappagePage,
    GalleryPage,
    glocationPage,
    MapPage,
    PhotodisplayPage,
    notifyPage,
    LoginPage,
    HalfyearlyPage,
    AnnualdayPage,
    MarkAttendancePage,
    ForgotpasswordPage,
    AttendancePage,
    MockattendancePage,
    NotifyhomePage,
    NotifybydatePage,
    AttendanceReport,
    DailyDiary,
    ContactPage,
    QuizAdmin1,
  ClassYear,
  ClassMenuPage,
  ClassTimeTablePage,
  ClassSubject,
  ClassSubjectTeacherPage,
  ClassReferenceTimePage,
  ParentProfile,
  StudentProfile,
  Timetable2,
  NotifythanksPage,
  Angular2mapsPage,
  Attendance2Page,
  Test1,
  Result,
  Exam,
  Notifynew,
  Quiz2Page,
  examNew,
  DiaryviewPage,
  ParentMeeting,
  ParentMeeting_selected,
  AttendanceView,
  Diaryview,
  timetable_parent,
      TimeTablePage,
    timetable_create,
    timetable_select,
    TimeTableEdit,
    AttendanceReportSelected,
    MenuComponent,
    Page1,
    Period,
    adminmain,
    StudentDetails,
    ParentView
  
  ],
  providers: [ConnectivityService,
               LocationTracker,
               Data,FeedService,
               Storage,Auth,
               ClassProvider,
               LoginProvider,
               ParentProvider,
               ConferenceData,
               UserData,
               ShareService, 
               NotifyProvider,
               DailydiaryProvider,
               ExamtimetableProvider,
               TimetableProvider, 
               ResultProvider,
               QuizProvider,
               ParentMeetProvider,
               GlobalVars,Datanew,
               MasterProvider]
              
})
export class AppModule {}
