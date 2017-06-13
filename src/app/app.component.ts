import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AboutPage } from '../pages/Home/home';
import { ListPage } from '../pages/list/list';
//import {TimeTablePage} from '../pages/Adding-new-ionic/timetable';

import {QuizPage} from '../pages/quiz/quiz';
import {Quiz1} from '../pages/quiz_selected/quiz_selected';
import {Test} from '../pages/quiz1/quiz1';
import {Test1} from '../pages/test/test';
import {Result} from '../pages/test_result/test_result';
import {QuizAdmin} from '../pages/quizadmin/quizadmin';
import {QuizAdmin1} from '../pages/quizadmin1/quizadmin1';
import {Resultview} from '../pages/exam_selected/exam_selected';
import {Exam} from '../pages/Exam/exam';
import {MappagePage} from '../pages/mappage/mappage';
import {GalleryPage} from '../pages/gallery/gallery';
import {glocationPage} from '../pages/glocation/glocation';
import {MapPage} from '../pages/map/map';
import {PhotodisplayPage} from '../pages/photodisplay/photodisplay';
import {notifyPage} from '../pages/notification_selected/notification_selected';
import {Notifynew} from '../pages/notification_view/notification_view';
import { FeedListPage } from '../pages/feedlist/feedlist';
import { FeedService } from '../providers/feedservice';
import { Storage } from '@ionic/storage';
import {feedHomePage} from '../pages/feedhome/feedhome';
import {LoginPage} from '../pages/login/login';
import {Auth} from '../providers/auth';
import {HalfyearlyPage} from '../pages/halfyearly/halfyearly';
import {AnnualdayPage} from '../pages/annualday/annualday';
import {ForgotpasswordPage} from '../pages/forgotpassword/forgotpassword';
import {AttendancePage} from '../pages/attendance/attendance';
import {MockattendancePage} from '../pages/mockattendance/mockattendance';
import {NotifyhomePage} from '../pages/notifyhome/notifyhome';
import {NotifybydatePage} from '../pages/notification/notification';
import {DailyDiary} from '../pages/dailydiary/dailydiary';
import {ContactPage} from '../pages/dailydiary_selected/dailydiary_selected';
import {NotifyProvider} from '../providers/notify-provider';
import {ExamtimetableProvider} from '../providers/examtimetable-provider';
import {TimetableProvider} from '../providers/Timetable-provider';
import {ResultProvider} from '../providers/Result-provider';
import { Quiz} from '../models/Quiz-model';
import { QuizProvider} from '../providers/quiz-provider';
import { Quiz2Page } from '../pages/quiz_result/quiz_result';
import {examNew} from '../pages/exam_view/exam_view';
import {ParentMeeting} from '../pages/parentmeeting/parentmeeting';
import {ParentMeeting_selected} from '../pages/parentmeeting_selected/parentmeeting_selected';
import {AttendanceReportSelected} from '../pages/attendancereport_selected/attendancereport_selected';

//import {MarkAttendancePage} from '../pages/class/attendance//mark-attendance';
import {ClassYear} from '../pages/admin/class-year/class-year';
import { Angular2mapsPage } from '../pages/angular2maps/angular2maps';
import {Attendance2Page} from '../pages/attendance_selected/attendance_selected';
import {AttendanceReport} from '../pages/attendance-report/attendancereport';
import {DailydiaryProvider} from '../providers/dailydiary-provider';
import {DiaryviewPage} from '../pages/diaryview/diaryview';
import{AttendanceView} from '../pages/attendanceview/attendanceview';
import{Diaryview} from '../pages/dailydiary2/dailydiary2';
import {TimeTablePage} from '../pages/timetable/timetable';

import {timetable_parent} from '../pages/timetable_parent/timetable_parent';

import {timetable_create} from '../pages/timetable_create/timetable_create';
import {timetable_select} from '../pages/timetable_select/timetable_select';
import {TimeTableEdit} from '../pages/timetable_edit/timetable_edit';
import {ParentMeetProvider} from '../providers/parentmeet';
import{Datanew} from '../providers/datanew';
import {GlobalVars} from '../providers/global-provider';
import{MenuComponent} from '../pages/Menu/menu';
import{Page1} from '../pages/PageOne/pageone';
import{Period} from '../pages/period/period';
import{adminmain} from '../pages/admin/adminmain/adminmain';
import{StudentDetails}from '../pages/studentDetails/sd';
import{ParentView} from '../pages/Parentview/parentview';

@Component({
  selector:'page-main',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
//  pages: Array<{title: string, component: any, icon:string}>;


  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {


  //  this.initializeApp();
    // set our app's pages
    console.log("am coming here test the menu while leaving")  
   /* this.pages = [
      { title: 'Home', component: AboutPage,icon:"home" },
      {title:'Daily Diary', component:DailyDiary,icon:"book"},
      /*{title:'Angular2maps',component:Angular2mapsPage},*/
//      { title :'Admin',component:ClassYear,icon:"create"},
  //    {title: 'Attendance',component:AttendancePage,icon:"timer"},
    //  {title: 'Attendance Report',component:AttendanceReportSelected,icon:"timer"},
      //{ title: 'Quiz',component:QuizPage,icon:"school"},
      //{ title:'Quiz1', component:Quiz1},
      //{title:'Quiz1', component:Test,icon:"school"},
     // { title:'QuizAdmin', component:QuizAdmin1,icon:"school"},
      //{title:'Test', component:Test},
      //{title:'Test', component:Test1,icon:"paper"}, 
      //{title:'TimeTable', component:TimeTablePage,icon:"home"}, 
      //{title:'TimeTable Upload', component:timetable_create,icon:"home"}, 
      //{title:'Parent Meet', component: ParentMeeting,icon:"home"},
      //{title : ' School Gallery',component:GalleryPage,icon:"image"},
      /*{title:'Map',component:MapPage},*/
      //{title: 'Locate Us',component:MappagePage,icon:"globe"},
      //{title:'Track',component:glocationPage,icon:"locate"},
     // { title: 'TimeTable',component:TimeTablePage},
      //{title:'Exam',component:Exam,icon:"clipboard"},
      //{title:'Upload',component:PhotodisplayPage,icon:"share"},
      /*{title:'Attendance',component:MockattendancePage},*/
      //{title:'Notifications',component:NotifybydatePage,icon:"notification"},
      /*{title :'reversegeocoding' ,component:AppComponent }*/
      /*{title:'FeedListPage',component:FeedListPage},*/
      /*{title:'feedHomePage',component:feedHomePage},*/
      
  }

  ionViewCanLeave(){
    console.log("am coming here test the menu while leaving")
  }

  
 //initializeApp() {
   // this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // StatusBar.styleDefault();
    //});
 //}
  //openPage(page) {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
 // }
}
