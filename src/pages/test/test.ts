import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Result } from '../../pages/test_result/test_result';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import{LoadingController} from 'ionic-angular';

@Component({
  selector:'page-test',
  templateUrl: 'test.html'
})

export class Test1 {

      selected_exam_type: any;
      selected_standard: any;
      selected_section: any;
      selected_subject:any;
      parm_school_id:any;
      parm_standard:any;
      parm_class_id:any;
      loader:any;
      class: ClassSectionYear[];
      sec: ClassSectionYear[];

      
        constructor(public navCtrl: NavController,navParams: NavParams,
                    public classProvider: ClassProvider, 
                    public toastController: ToastController,
                    public loadingController:LoadingController){
                    this.parm_school_id= 1;

        }


      ngOnInit() {
        this.loading();
        this.fetchstandard(this.parm_school_id);

       }
     loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }
    
    fetchstandard(school_id: number)  {
        this.classProvider
        .getAllClassesForSchool(school_id)
                .subscribe(res => {this.class = <ClassSectionYear[]>res,this.loader.dismiss()},
                          err =>  {this.loader.dismiss(),this.errorToast()}); 

    } 

    fetchsection(school_id:number,standard:any) {
        this.classProvider
        .getAllSectionForClass(school_id, standard)
                .subscribe(res => {this.sec = <ClassSectionYear[]>res,this.loader.dismiss()},
                          err =>  {this.loader.dismiss().this.errorToast()}); 

    }


    class_selected() {

      this.fetchsection(this.parm_school_id,this.selected_standard) 
      
    }


   private errorToast() {
        let toast = this.toastController.create({
            message: "quiz not loaded, please try after sometime",
            duration: 1000,
            position: 'middle'
            });
            toast.present();

      }

    submit(){
          this.navCtrl.push(Result,{
              parm_created_by: this.selected_exam_type,
              parm_standard: this.selected_standard,
              parm_section:  this.selected_section
          });
      }

  }
