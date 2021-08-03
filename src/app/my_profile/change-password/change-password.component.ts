import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,ValidatorFn, AbstractControl,ValidationErrors,FormControl} from '@angular/forms';
import { LoginService } from '../../service/authentication.service';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  //for toast show
  position = 'top-center';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  changepass: FormGroup;
  isSubmitted = false;
  r:any;
  userid:any;
  mismatch:any;
  constructor(private formBuilder:FormBuilder,
              private loginlist:LoginService,
              private toastyService: ToastyService,
              private router:Router,) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.userid = localStorage.getItem("user_id");
    this.changepass =  this.formBuilder.group({
      new_password: ['',[Validators.required]],
      cnfrm_password: ['',[Validators.required,confirmPasswordValidator]],
    });

  }

  addToast(msgg:any,type:any) {
    // this.position = this.position;
    const toastOptions: ToastOptions = {
      title: "Maitri Trust",
      msg: msgg,
      showClose: this.showClose,
      timeout: this.timeout,
      theme: this.theme,
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added removed!');
      }
    }
    switch (type) {
      case 'success': this.toastyService.success(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
    }
    // this.toastyService.success(toastOptions);
  }

  get f() { return this.changepass.controls; }

  onSubmit(){
    this.isSubmitted = true;
    if (this.changepass.invalid) {
      return;
    }else{
            var body={
              "user_id":this.userid,
              "password":this.changepass.value.new_password,
               }
            this.loginlist.changePass(body).subscribe(res=>{
              this.r= res;
                this.addToast(this.r.msg,'success');
                setTimeout(() => {
                  this.router.navigate(['/dashboard']);
                    }, 2000);
            });     
    }
  }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('new_password');
  const passwordConfirm = control.parent.get('cnfrm_password');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {'passwordsNotMatching': true};
};
