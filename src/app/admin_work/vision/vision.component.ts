import { Component, OnInit } from '@angular/core';
import {visionservice} from 'src/app/service/vision.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpClient, } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

const URL = 'http://api.maitrivatsalya.org/api/upload/file';
//const URL = 'http://localhost:3000/api/upload/file';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.css']
})
export class VisionComponent implements OnInit {
  
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
  public popoverTitle:string="subfolder Delete Confirmation";
  public popoverMessage:string="Are you Sure that you want to Delete?";
  confirmClicked = false;
  cancelClicked = false;

  display='none';
  import ="none";
  public gridData: any = [];
  resp:any;
  visionAddEdit: FormGroup;
  isSubmitted = false;
  uniqueId:any;

  rep:any=[];
  message:any;
  
  imgURL:any;
  images:any;
  pic:any;

  loading:any;

  upres:any;
  upresp:any;

  vid:any;
  folder:any;
  fresp:any;
  isdisable:boolean;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no', 
  };

  constructor(private listService:visionservice,
    public http:HttpClient,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService) { }
  
  ngOnInit() {
    this.isSubmitted = false;

    this.listService.getvision().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
      console.log("Getting Data :-", this.gridData);
    });
    this.visionAddEdit=this.formBuilder.group({
      title:['',[Validators.required]],
      caption:['',[Validators.required]],
      image:[''],
      description:['',[Validators.required]]
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
    // console.log("calling selectfile function", event); 
    if (event.target.files && event.target.files[0]) {
      // console.log("Event File: ",event.files);
      // console.log("raw file", (event.files)[0].rawFile);
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
        //this.pic = "http://localhost:3000/"+res.file.path;
        this.isdisable=false;
        console.log("Getting Image :-", this.pic);
      });
    }
  }
  
  editvision(id:any){
    this.uniqueId=id;
    console.log("Getting update id :-", id);
    this.listService.getvisionbyid(id).subscribe(res=>{
        this.upres=res;
        this.upresp=this.upres.data.results[0];
        console.log("Getting response :-", this.upresp);
        this.display='block';
        this.pic=this.upresp.image;
        this.imgURL=this.upresp.image;
        this.isdisable=false;
        this.visionAddEdit.reset({
          "title":this.upresp.title,
          "caption":this.upresp.caption,
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
   
  deletevision(id:any){
    this.loading=true;
    this.listService.deletevision(id).subscribe(res=>{
      this.addToast("Vision Deleted Successfully!!",'success');
      this.ngOnInit();
      this.loading=false;
    })
  }
   
  get f() { return this.visionAddEdit.controls; }

  async onSubmit() {
  this.isSubmitted = true;
  console.log("Getting FormData :-",this.visionAddEdit.value)
  if (this.visionAddEdit.invalid) {
    return;
  }
  else{
    if(!this.uniqueId){
      var body={
        "title":this.visionAddEdit.value.title,
        "caption":this.visionAddEdit.value.caption,                
        "image":this.pic,
        "description":this.visionAddEdit.value.description
      }
      this.listService.createvision(body).subscribe(res=>{
        this.rep = res;
        this.addToast('New Vision Created Successfully','success');
        this.onCloseHandled();
        this.imgURL="";
        // this.ngOnInit();
      },err=>{
        this.addToast("New Vision Not Added! Please Try Again!!",'error');
        this.onCloseHandled();
        // this.ngOnInit();
      });
    }
    else{
      var bo={
        "vid": this.uniqueId,
        "title":this.visionAddEdit.value.title,
        "caption":this.visionAddEdit.value.caption,
        "image":this.pic,
        "description":this.visionAddEdit.value.description   
      }  
      this.listService.updatevision(bo).subscribe(res=>{
        this.rep = res;
        // this.message = this.rep.message;
        this.addToast(this.rep.message,'success');
        this.onCloseHandled();
        this.ngOnInit();
        this.uniqueId='';
      },err=>{
        this.addToast("Vision Not Updated!!",'error');
      });
    }      
  }
  }
}