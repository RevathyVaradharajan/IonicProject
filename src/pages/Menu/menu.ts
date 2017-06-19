import { Component, ViewChild } from '@angular/core';
import { AboutPage } from '../Home/home';
import{DailyDiary} from '../dailydiary/dailydiary';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import{Page1} from'../PageOne/pageone';
import {Test} from '../quiz1/quiz1';
import{AttendanceReport} from '../attendance-report/attendancereport';
import {GlobalVars} from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import {Login} from '../../models/login-model';
import {Quiz1} from '../quiz_selected/quiz_selected';
import {TimeTablePage} from '../timetable/timetable';
import {GalleryPage} from '../gallery/gallery';
import {glocationPage} from '../glocation/glocation';
import {Exam} from '../Exam/exam';
import {QuizPage} from '../quiz/quiz';
//
import {ClassYear} from '../admin/class-year/class-year';
import {AttendancePage} from '../attendance/attendance';
import {QuizAdmin1} from '../quizadmin1/quizadmin1';
import {Test1} from '../test/test';
import {ParentMeeting} from '../parentmeeting/parentmeeting';
import {MappagePage} from '../mappage/mappage';
import {PhotodisplayPage} from '../photodisplay/photodisplay';
import {NotifybydatePage} from '../notification/notification';
import{Period} from '../period/period';
import {timetable_create} from '../timetable_create/timetable_create';
import{adminmain} from '../admin/adminmain/adminmain';
import{timetable_parent} from '../timetable_parent/timetable_parent';


@Component({
    selector:'page-menu',
  templateUrl: 'menu.html'
})

export class MenuComponent {
@ViewChild('content') nav: Nav;
@ViewChild('sectionSelect') sectionSelect: Select;
  
  
  rootPage: any = AboutPage;

  pages: Array<{title: string, component: any,icon:string}>;
  selected_record:any;
  selected_roll_no:any;
  login:Login[]
  teacher_menu:boolean;
  role_type:string;
  role_header:boolean;
  constructor(public menu: MenuController,
  public globalVars:GlobalVars) {
  
 this.login = this.globalVars.getMyGlobalVar()
 this.role_type = this.globalVars.getMyGlobalrole()
    

   
   if(this.role_type=="P")
       {
          this.role_header=true;
           console.log("My role id"+ this.role_type)
           this.pages = [
      //{title: 'home', component: AboutPage },
      
     
       { title: 'Home', component: AboutPage,icon:"home"  },
       {title:'Attendance Report', component:AttendanceReport,icon:"timer"},
       {title:'TimeTable', component:timetable_parent,icon:"clipboard"},
       {title:'Exam',component:Exam,icon:"clipboard"},  
   //  {title:'quiz', component:QuizPage,icon:"school"},
       {title:'Take Test', component:Test,icon:"school"},
       {title:'Track',component:glocationPage,icon:"locate"},
       {title:'About us',component:GalleryPage,icon:"images"}

        ];
  }

else{
    this.pages = [  
         { title: 'Home', component: AboutPage,icon:"home"  },
         {title :'Admin',component:adminmain,icon:"create"},
       //{title:'TimeTable', component:TimeTablePage,icon:"calendar"},
         {title:'TimeTable', component:timetable_create,icon:"calendar"},
         {title:'Daily Diary', component:DailyDiary,icon:"book"},    
       //{title:'Period',component:Period,icon:"timer"},
         {title: 'Attendance',component:AttendancePage,icon:"timer"},
         {title:'Exam',component:Exam,icon:"clipboard"},
         {title:'Result', component:Test1,icon:"paper"},
         {title:'Take Test', component:Test,icon:"school"},  
         {title:'Parent Meet', component: ParentMeeting,icon:"people"},
       //{title: 'Locate Us',component:MappagePage,icon:"locate"},
       //{title:'Upload',component:PhotodisplayPage,icon:"share"},
         {title:'Notifications',component:NotifybydatePage,icon:"notifications"},
         
         
    ];


}
  }
  
 openPage(page) {
     console.log("hello am too working")
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
