import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators , FormControl} from '@angular/forms';
import { LoginService } from '../../../service/authentication.service';
//add Toast Module
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

   //for toast show
   position = 'top-right';
   title: string;
   msg: string;
   showClose = true;
   timeout = 5000;
   theme = 'bootstrap';
   type = 'default';
   closeOther = false;
   role:any;

  loginfrm: FormGroup;
  isSubmitted = false;
  r:any=[];
  constructor(
              private router:Router,
              private formBuilder: FormBuilder,
              private loginlist:LoginService,
              private cookieService: CookieService,
              private toastyService: ToastyService) { }

  ngOnInit() {
    // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.isSubmitted = false;
    var mobile=this.cookieService.get('mobile');
    var password=this.cookieService.get('password');
    var rememberMe = this.cookieService.get('remember');

    this.loginfrm = this.formBuilder.group({
      mobileNo: ['',[Validators.required]],
      password: ['',[Validators.required]],
      remember:'',
    });

    if(mobile != '' || password != ''){
      this.loginfrm.reset({
        mobileNo:mobile,
        password:password,
        remember:rememberMe,
      });
    }
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

  get f() { return this.loginfrm.controls; }

  onSubmit(){
    this.isSubmitted = true;
    if (this.loginfrm.invalid) {
      return;
    }else{ 
            var body={
              "username":this.loginfrm.value.mobileNo,
              "password":this.loginfrm.value.password
               }
               if(body.username == 'admin' && body.password == 'admin'){
                localStorage.setItem('user_id', '1');
                localStorage.setItem('user_name', body.username);
                    this.addToast("Login Successfully!!",'success');
                    this.router.navigate(['/users']);
               }else{
                 this.addToast("Invalid Username and Password!!",'error');
               }
            //   this.loginlist.login(body).subscribe(res=>{
            //   this.r= res;
            //   if(!this.r.error){
            //         if(this.loginfrm.value.remember == true || this.loginfrm.value.remember == "true"){
            //           this.cookieService.set('mobile', this.loginfrm.value.mobileNo , 30);  
            //           this.cookieService.set('password', this.loginfrm.value.password , 30); 
            //           this.cookieService.set('remember','true' , 30);
            //         }
            //         else{
            //           this.cookieService.set('mobile', '' , 30);  
            //           this.cookieService.set('password', '' ,30); 
            //           this.cookieService.set('remember','',30);
            //         }
            //             this.addToast(this.r.message,'success');
            //             setTimeout(() => {
            //               this.router.navigate(['/dashboard']);
            //               // this.loginfrm.reset();
            //                 }, 2000);
            //   }else{
            //     this.addToast(this.r.error,'error');
            //     // alert(this.r.message);
            //   }
             
            // } ,error=>{
            //   this.r=error;
            //   this.addToast(this.r.message,'error');
            //   // alert("Invalid Email and Password");
            // });     
    }
  }

  // login(){
  //   this.router.navigate(['/dashboard']);
  // }

}
