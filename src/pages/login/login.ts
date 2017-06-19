import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AboutPage } from '../Home/home';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import { ToastController } from 'ionic-angular';
import {LoginProvider} from '../../providers/login-provider';
import {Login} from '../../models/login-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {GlobalVars} from '../../providers/global-provider';
import{MenuComponent} from '../Menu/menu';
@Component({
  selector: 'page-loginnew',
  templateUrl: 'login.html',
  providers:[LoginProvider]
})

export class LoginPage {
/*
// Values from the screen
 selected_login_id: string; 
 selected_password: string 

//Values from the provider 
 log_in: Login;

//values for parmscreen.
  parm_login: Login;

  constructor(public navCtrl: NavController, public loginProvider:LoginProvider, private toastController: ToastController,
              public navParams: NavParams) {}
  
  
  Submit(){
    // Value will be passed only for test; Selected fields will be getting value from ngModel
    this.selected_login_id = "abhi123"
    this.selected_password = "prasana123"
    
//    this.getpwddetails(this.selected_login_id);

//For the Demo purpose 
    this.navCtrl.push(AboutPage)
    this.navCtrl.setRoot(AboutPage)
 }

  getpwddetails(prvdr_selcted_user_name: string) {

      console.log("I am calling the provider")

        this.loginProvider
            .getLoginDetails(prvdr_selcted_user_name)
            .subscribe(res => {this.log_in = <Login>res,this.successToastreturn()},
                       err =>  this.errorToast()
                  ); 
    
        console.log("I am done with provider")  


  }

  successToastreturn() {
    
      this.selected_password  = this.log_in.password; 
    
      if(this.selected_password) { 
          console.log("password" + this.log_in.password)
          this.navCtrl.push(AboutPage); 
          this.navCtrl.setRoot(AboutPage, {
          parm_login_firstname :  this.log_in.first_name,
          parm_login_lastname  :  this.log_in.last_name,  
          parm_login_standard  :  this.log_in.standard,
          parm_login_section   :  this.log_in.section,
          parm_login_roll_no   :  "P"      
        });
        
      } else {
              console.log("I am in the else part")
              this.errorToast();
      }
  }

  errorToast() {
    let toast = this.toastController.create({
        message: "Password is incorrect. Please re-type username and password",
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }


  ForgotPassword(){
    this.navCtrl.push(ForgotpasswordPage);
    this.navCtrl.setRoot(ForgotpasswordPage);
  }
}

*/

  loginForm:FormGroup
  login:Login[]
  test: any;
  role_type:string;
  //global_var_login:Login[]
  teacher_menu:boolean;
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                public loginProvider:LoginProvider,
                public globalVars: GlobalVars,
                private toastController: ToastController) {
 
      this.loginForm = formBuilder.group({
 
      phNo: ['',Validators.compose([Validators.minLength(5),Validators.maxLength(10),Validators.pattern('[0-9]*')]),this.checkPhone.bind(this)]
      });

      
    }
    Submit() { 
    
       let phone = this.loginForm.value.phNo 
    //   for(let x of this.login){

      // }     
      for(let x of this.login) {

        if(x.roll==0){
              this.teacher_menu=false;
        }
        else{ 
              this.teacher_menu=true;
        }
            
    }
       if(this.teacher_menu){
         this.role_type="T";
       } 
       else
       {
         this.role_type="P"; 
       }
       
       this.globalVars.setMyGlobalVar(this.login,this.role_type)
       this.navCtrl.push(MenuComponent)
      
    }


    checkPhone(control: FormControl) : any { 

        this.login=[]

        let phone = control.value 
        console.log("I am coming" + phone)
        
        return new Observable(observer => {  
        this.loginProvider
             .getLoginDetails(phone)
             .subscribe(res => {this.login = <Login[]>res; 
                               if (this.login.length == 0){
                                 if(phone.length < 10) {
                                    observer.next({"Mobile Number in-correct":true})
                                    observer.complete()
                                }
                                  else { 
                                    observer.next({"Records not in the database" : true})
                                    observer.complete()
                                  } 
                                } else {
                                  console.log(" Else I am coming for the observer value")
                                  observer.next(null)
                                  observer.complete()
                                }
                              },
                        err => {
                            console.log("ERROR I am coming for the observer value")
                            observer.next ({"Records not updated" : true});
                            observer.complete()
                          })
        });
      
    } 
   
  
   
	}