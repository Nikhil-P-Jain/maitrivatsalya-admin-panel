import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators , FormControl} from '@angular/forms';
import { LoginService } from '../../service/authentication.service';
//add Toast Module
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';

@Component({
  selector: 'app-forgotPass',
  templateUrl: './forgotPass.component.html',
  styleUrls: ['./forgotPass.component.scss']
})
export class ForgotPassComponent implements OnInit {

   //for toast show
   position = 'top-center';
   title: string;
   msg: string;
   showClose = true;
   timeout = 5000;
   theme = 'bootstrap';
   type = 'default';
   closeOther = false;

  loginfrm: FormGroup;
  isSubmitted = false;
  r:any;
  constructor(private router:Router,
              private formBuilder: FormBuilder,
              private loginlist:LoginService,
              private toastyService: ToastyService) { }

  ngOnInit() {
    // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.isSubmitted = false;

    this.loginfrm = this.formBuilder.group({
      mobileNo: ['',[Validators.required]],
    });

  }

  addToast(msgg:any,type:any) {
    // this.position = this.position;
    const toastOptions: ToastOptions = {
      title: "Mehta Cad Cam",
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

  get f() { return this.loginfrm.controls; }

  onSubmit(){
    this.isSubmitted = true;
    
    if (this.loginfrm.invalid) {
      return;
    }else{
            var body={
              "mobile_no":this.loginfrm.value.mobileNo,
               }
            //   this.loginlist.forgotPass(body).subscribe(res=>{
            //   this.r= res;
            //   if(this.r.status == 1){
            //     this.addToast(this.r.message,'success');
            //     // this.ngOnInit();
            //     setTimeout(() => {
            //       this.router.navigate(['/auth/login']);
            //       this.loginfrm.reset();
            //     }, 10000);
            //   }else{
            //     this.addToast(this.r.message,'error');
            //   }
             
            // } ,error=>{
            //   alert("Invalid Email and Password");
            // });     
    }
  }

  // login(){
  //   this.router.navigate(['/dashboard']);
  // }

}
