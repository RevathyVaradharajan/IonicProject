import { FormControl,FormGroup,Validators} from '@angular/forms';
 
export class UsernameValidator {
 
 /*
  static checkUsername(control: FormControl): any {
 
    return new Promise(resolve => {
 
      //Fake a slow response from server
 
      setTimeout(() => {
        if(control.value.toLowerCase() === "greg"){
 
          resolve({
            "username taken": true
          });
 
        } else {
          resolve(null);
        }
      }, 2000);
 
    });
  }
  */

static checkFromDate(control: FormControl): any {
   
    let  today: any = new Date();
    let  dd: any    = today.getDate();
    let  mm: any    = today.getMonth()+1; //January is 0!
    let  yyyy: any  = today.getFullYear();
    let  month: string;
    if(dd<10) {
         dd='0'+dd
    } 

    if(mm<10) {
         mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;

  if(today >= control.value){           
    return {
         "not a valid date": true
    };
  }
      return null;
  }


static checkTooDate
     (g:FormGroup): any {
    
       console.log ("Checktoodate main module" ) 
    
       let  from_dt = g.get('selected_from_date').value 
       let  to_dt   = g.get('selected_to_date').value 
        
        if ( to_dt < from_dt) {
            console.log("succesful in IF loop") 
            return {
                  "Less than": true
            }
        }  
            return null;
}

}