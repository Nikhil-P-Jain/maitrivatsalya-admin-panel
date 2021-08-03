import { Component, OnInit , ViewChild } from '@angular/core';
import {UserService} from 'src/app/service/adminService/user.service';
import { FormGroup, FormBuilder, Validators ,ValidatorFn, AbstractControl,ValidationErrors,FormControl} from '@angular/forms';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { delay, switchMap, map, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';

const URL = 'http://api.maitrivatsalya.org/api/upload/file';
// const URL = 'http://localhost:3000/api/upload/file';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  uploadSaveUrl = 'saveUrl';
  uploadRemoveUrl = 'removeUrl';
       //for toast show
       position = 'top-center';
       title: string;
       msg: string;
       showClose = true;
       timeout = 5000;
       theme = 'bootstrap';
       type = 'default';
       closeOther = false;
  
       //show delete confirmation message
       public popoverTitle:string="Banner Deactive Confirmation";
       public popoverMessage:string="Are you Sure went to Deactive?";
      confirmClicked = false;
      cancelClicked = false;

      display='none';
      public gridData: any = [];
      resp:any;
      bannerAddEdit: FormGroup;
      isSubmitted = false;
      uniquId:any;
    
      rep:any=[];
      message:any;
    
      loading:boolean;
    
      ress:any;
      data1:any;
      uid:any;

      upres:any;
      upresp:any;

      imgURL:any;
      images:any;
      pic:any;
      isdisable:boolean;

  constructor(private listService:UserService,
              public http:HttpClient,
              private formBuilder: FormBuilder,
             private toastyService: ToastyService) { }

  ngOnInit() {
    this.isSubmitted = false;
    // this.loading=true;
    this.uid=localStorage.getItem("user_id");

    this.listService.getBanner().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      console.log("Getting Data :-", this.resp.msg);
      this.gridData = this.resp.data.results;
    });

    this.bannerAddEdit=this.formBuilder.group({
      name:['',[Validators.required]],
      img:['']
    })
    }

    saveUser(){
      this.display= 'block';
    }
    
    onCloseHandled(){
      this.display='none';
      this.ngOnInit();
    }

    async selectFile(event){
      this.isdisable=true;
      // this.loading=true;
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
          this.pic = "http://api.maitrivatsalya.org/"+res.file.path;
          // this.pic = "http://localhost:3000/"+res.file.path;
          this.loading=false;
          this.isdisable=false;
          console.log("Getting Image :-", this.pic);
        });
      }
    }

    editBanner(id:any){
      this.uniquId=id;
        this.listService.getBannerById(id).subscribe(res=>{
            this.upres=res;
            this.upresp=this.upres.data.results[0];
            console.log("Getting response :-", this.upresp);
            this.display='block';
            this.imgURL=this.upresp.blink;
            this.pic=this.upresp.blink;
            this.isdisable=false;
            this.bannerAddEdit.reset({
              "name":this.upresp.bname,
            })
        })
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

    deleteBanner(id:any){
      var bb={
        "status":0,
        "bid":id
      }
      this.loading=true;
      this.listService.softDel(bb).subscribe(res=>{
        this.addToast("Banner Deleted Successfully!!",'success');
        this.ngOnInit();
        this.loading=false;
      })
    }
  
    get f() { return this.bannerAddEdit.controls; }

    async onSubmit() {
      this.isSubmitted = true;
      console.log("Getting FormData :-",this.bannerAddEdit.value)
      if (this.bannerAddEdit.invalid) {
        return;
      }else{
            if(!this.uniquId){
              var body={
                "bname":this.bannerAddEdit.value.name,
                "blink":this.pic,
                "status":1                
                 }
              console.log("Getting Create Banner :-", body);
              this.listService.createBanner(body).subscribe(res=>{
               this.rep = res;
                  this.addToast('New Banner Create Successfully','success');
                    this.onCloseHandled();
                    this.imgURL="";
                    // this.ngOnInit();
              },err=>{
                this.addToast("New Banner Not Added! Please Try Again!!",'error');
                this.onCloseHandled();
                // this.ngOnInit();
              });
            }
            else{
              var bo={
                "bid": this.uniquId,
                "bname":this.bannerAddEdit.value.name,
                "blink":this.pic,
                "status":1    
               }
               console.log("Getting Update Body :-", bo);
              this.listService.updateBanner(bo).subscribe(res=>{
                this.rep = res;
                // this.message = this.rep.message;
                  this.addToast(this.rep.message,'success');
                  this.onCloseHandled();
                  // this.ngOnInit();
                  this.uniquId='';
              },err=>{
                this.addToast("Banner Not Updated Successfully!!",'error');
              });
            }     
          
      }
    }
  
}