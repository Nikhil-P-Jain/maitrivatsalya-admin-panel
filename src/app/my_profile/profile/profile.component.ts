import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormControl} from '@angular/forms';
import { UserService } from '../../service/adminService/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {Router} from '@angular/router';

// const URL = 'http://apiveritrac.mehtaindia.co.in/api/upload/file';
const URL = 'http://localhost:3000/api/upload/file';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

       //for toast show
       position = 'top-center';
       title: string;
       msg: string;
       showClose = true;
       timeout = 5000;
       theme = 'bootstrap';
       type = 'default';
       closeOther = false;

  userAddEdit: FormGroup;
  isSubmitted = false;
  imgURL:any;
  designation_id:any;
  thumbnail:any;
  resp:any;
  user:any;
  pic:any;
  id:any;
  r:any;
  images:any;
  attachFile:any;
  base64Image: any;

  constructor(
    private userlisting:UserService,
    private formBuilder:FormBuilder,
    public http:HttpClient,
    private toastyService: ToastyService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.id= localStorage.getItem("user_id");

    this.userAddEdit = this.formBuilder.group({
      fname: ['',[Validators.required]],
      lname: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      mobile_no: ['',[Validators.required]],
      image: [''],
    });

    // this.userlisting.getUserById(this.id).subscribe(res=>{
    //   this.resp= res;
    //   this.user= this.resp.data.results[0];

    //   this.designation_id=this.user.designation_id;
    //   // this.imgURL = 'http://localhost:3000/'+this.user.image;
    //   if(this.user.image){
    //     this.pic=this.user.image;
    //     this.imgURL = this.user.showImage;
    //   }
      
    //   this.userAddEdit.reset({
    //     fname: this.user.first_name,
    //     lname:this.user.last_name,
    //     designation:this.user.designation,
    //     email:this.user.email,
    //     mobile_no:this.user.mobile_no,
    //     image:this.pic,
    //   });

    // });
    
  }

  async selectFile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => {
        if(event != undefined){
          this.imgURL = event.target.result;
        }
      }
    }

    if(event.target.files.length >0){
      const file = event.target.files[0];
      this.images = file;
      
      const formData = new FormData();
        formData.append('file', this.images);
  
      this.http.post<any>(URL, formData).subscribe(res=>{
        this.pic = res.file.path;
      });
    }
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

  get f() { return this.userAddEdit.controls; }

  onSubmit(){
    this.isSubmitted = true;
    if (this.userAddEdit.invalid) {
      return;
    }else{
            var body={
                "id": this.id,
                "fname":this.userAddEdit.value.fname,
                "lname":this.userAddEdit.value.lname,
                "designation":this.designation_id,
                "email":this.userAddEdit.value.email,
                "mobile_no":this.userAddEdit.value.mobile_no,
                "image": this.pic
               }
            // this.userlisting.updateLoginUser(body).subscribe(res=>{
            //   this.r= res;
            //   if(this.r.success == 1){
            //     // alert(this.r.message);
            //     this.addToast(this.r.message,'success');
            //     setTimeout(() => {
            //       this.router.navigate(['/dashboard']);
            //       this.ngOnInit();
            //         }, 2000);
            //     // this.userAddEdit.reset();
            //   }else{
            //     this.addToast(this.r.message,'error');
            //     // alert(this.r.message);
            //   }
             
            // });     
    }
  }

}
