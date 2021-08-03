import { Component, OnInit , ViewChild } from '@angular/core';
import {activityservice} from 'src/app/service/activities.service';
import { FormGroup, FormBuilder, Validators ,ValidatorFn, AbstractControl,ValidationErrors,FormControl} from '@angular/forms';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

const URL = 'http://api.maitrivatsalya.org/api/upload/file';
//const URL = 'http://localhost:3000/api/upload/file';


@Component({
  selector: 'admin-myteam',
  templateUrl: './admin-myteam.component.html',
  styleUrls: ['./admin-myteam.component.css']
})

export class AdminMyteamComponent implements OnInit {
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
       public popoverTitle:string="Activity Delete Confirmation";
       public popoverMessage:string="Are you Sure went to Delete?";
      confirmClicked = false;
      cancelClicked = false;

      display='none';
      import ="none";
      public gridData: any = [];
      resp:any;
      activityAddEdit: FormGroup;
      isSubmitted = false;
      uniquId:any;
    
      rep:any=[];
      message:any;
    
      loading:any;
    
      // ress:any;
      // data1:any;
      uid:any;

      upres:any;
      upresp:any;

      editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '20rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
      };

      imgURL:any;
      images:any;
      pic:any;
      isdisable:boolean;

  constructor(private listService:activityservice,
              public http:HttpClient,
              private formBuilder: FormBuilder,
             private toastyService: ToastyService) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.loading=true;
    this.uid=localStorage.getItem("user_id");

    this.listService.getActivity().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
    });

    this.activityAddEdit=this.formBuilder.group({
      caption:['',[Validators.required]],
      heading:['',[Validators.required]],
      img:[''],
      description:['',[Validators.required]],
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
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => {
          if(event != undefined){
            this.imgURL = event.target.result;
          }
        }
      }
      
      if(event.target.files.length>0){
        const file = event.target.files[0];
        this.images = file;
        
        const formData = new FormData();
          formData.append('file', this.images);
    
        this.http.post<any>(URL, formData).subscribe(res=>{
          this.pic = "http://api.maitrivatsalya.org/"+res.file.path;
          // this.pic = "http://localhost:3000/"+res.file.path;
          this.isdisable=false;
          console.log("Getting Image :-", this.pic);
        });
      }
    }

    editActivities(id:any){
      this.uniquId=id;
        this.listService.getActivityById(id).subscribe(res=>{
            this.upres=res;
            this.upresp=this.upres.data.results[0];
            // console.log("Getting response :-", this.upresp);
            this.display='block';
            this.imgURL=this.upresp.image;
            this.pic=this.upresp.image;
            this.isdisable=false;
            this.activityAddEdit.reset({
              "caption":this.upresp.caption,
              "heading":this.upresp.heading,
              "description":this.upresp.description
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

    deleteActivities(id:any){
      this.loading=true;
      this.listService.DeleteActivity(id).subscribe(res=>{
        this.addToast("Letest Activities Deleted Successfully!!",'success');
        this.ngOnInit();
        this.loading=false;
      })
    }
  
    get f() { return this.activityAddEdit.controls; }

    async onSubmit() {
      this.isSubmitted = true;
      // console.log("Getting FormData :-",this.activityAddEdit.value)
      if (this.activityAddEdit.invalid) {
        return;
      }else{
            if(!this.uniquId){
              var body={
                "caption":this.activityAddEdit.value.caption,
                "heading":this.activityAddEdit.value.heading,                
                "image":this.pic,
                "description":this.activityAddEdit.value.description                
                 }
              // console.log("Getting Create Activities :-", body);
              this.listService.createActivity(body).subscribe(res=>{
               this.rep = res;
                  this.addToast('New Activity Create Successfully','success');
                    this.onCloseHandled();
                    this.imgURL="";
                    // this.ngOnInit();
              },err=>{
                this.addToast("New Activity Not Added! Please Try Again!!",'error');
                this.onCloseHandled();
                // this.ngOnInit();
              });
            }
            else{
              var bo={
                  "lid": this.uniquId,
                  "caption":this.activityAddEdit.value.caption,
                  "heading":this.activityAddEdit.value.heading,                
                  "image":this.pic,
                  "description":this.activityAddEdit.value.description
               }
               
              this.listService.UpdateActivity(bo).subscribe(res=>{
                this.rep = res;
                // this.message = this.rep.message;
                  this.addToast(this.rep.message,'success');
                  this.onCloseHandled();
                  this.uniquId='';
              },err=>{
                this.addToast("Activity Not Updated Successfully!!",'error');
              });
            }     
          
      }
    }
}
