import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{Page1} from '../PageOne/pageone';
import { FormControl } from '@angular/forms';
import{Datanew} from '../../providers/datanew';
import 'rxjs/add/operator/debounceTime';
import {Master} from '../../models/master';
import {MasterProvider} from '../../providers/master_service';
import{AboutPage} from '../Home/home';
@Component({
    selector:'page-sd',
    templateUrl: 'sd.html'
})
export class StudentDetails {
showList:boolean = false;
student_details:Master[];
master:Master[];
searchTerm: string = '';
searchControl: FormControl;
items: any;
searching: any = false;
school_id:any;
cyf:any;
 
    constructor(public navCtrl: NavController, public dataService: Datanew, public master_service: MasterProvider) {
        this.searchControl = new FormControl();
        this.school_id = 1
        this.cyf="2017-2018"
    }
 
 
ionViewDidLoad() {
 
        
       this.fetchmaster(this.school_id, this.cyf);        
       this.onSearchInput()   
      
}

fetchmaster(school_id:any, cyf:any){
    this.master_service
    .getMaster(school_id, cyf)
            .subscribe(res => {this.student_details = <Master[]>res},
                       err =>  {this.errorToast()}); 

}

errorToast(){

}
 
onSearchInput(){

this.fetchmaster(this.school_id, this.cyf);        

if (this.searchControl.value.trim() != ' ')
    this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
    this.setFilteredItems(this.searchControl.value);
});

    }
 
setFilteredItems(searchTerm) {
 
    this.student_details = this.student_details.filter((item) => {
        return item.student_id.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;

    });

    this.showList =true;
  }

submit(x){

    console.log("I am coming here for the value" + x.student_id)

    this.navCtrl.push(Page1,{
        parm_master:x
    });
    //this.searchControl.value = x.student_id

}

student_add()
{
    this.navCtrl.push(Page1);
}




}