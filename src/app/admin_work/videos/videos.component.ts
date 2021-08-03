import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { videosservice} from 'src/app/service/videos.service';
const URL = 'http://api.maitrivatsalya.org/api/upload/file';
// const URL = 'http://localhost:3000/api/upload/file';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  
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
  videosAddEdit: FormGroup;
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
  
  constructor(private listService:videosservice,
    public http:HttpClient,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.loading=true;
    this.listService.getvideos().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
      console.log("Getting Data :-", this.gridData);
    });
    this.videosAddEdit=this.formBuilder.group({
      title:['',[Validators.required]],
      thumbnail:[''],
      vlink:['',[Validators.required]],
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
  
  editvideos(id:any){
    this.uniqueId=id;
    console.log("Getting update id :-", id);
    this.listService.getvideosbyid(id).subscribe(res=>{
        this.upres=res;
        this.upresp=this.upres.data.results[0];
        console.log("Getting response :-", this.upresp);
        this.display='block';
        this.pic=this.upresp.thumbnail;
        this.imgURL=this.upresp.thumbnail;
        this.isdisable=false;
        this.videosAddEdit.reset({
          "title":this.upresp.title,
          // "thumbnail":this.pic,
          "vlink":this.upresp.vlink,
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
   
  deletevideos(id:any){
    this.loading=true;
    this.listService.deletevideos(id).subscribe(res=>{
      this.addToast("Video Deleted Successfully!!",'success');
      this.ngOnInit();
      this.loading=false;
    })
  }
   
  get f() { return this.videosAddEdit.controls; }

  async onSubmit() {
  this.isSubmitted = true;
  console.log("Getting FormData :-",this.videosAddEdit.value)
  if (this.videosAddEdit.invalid) {
    return;
  }
  else{
    if(!this.uniqueId){
      var body={
        "title":this.videosAddEdit.value.title,
        "thumbnail":this.pic,
        "vlink":this.videosAddEdit.value.vlink,                
        "description":this.videosAddEdit.value.description
      }
      this.listService.createvideos(body).subscribe(res=>{
        this.rep = res;
        this.addToast('New video Created Successfully','success');
        this.onCloseHandled();
        this.imgURL="";
        // this.ngOnInit();
      },err=>{
        this.addToast("New video Not Added! Please Try Again!!",'error');
        this.onCloseHandled();
        // this.ngOnInit();
      });
    }
    else{
      var bo={
        "vid": this.uniqueId,
        "title":this.videosAddEdit.value.title,
        "thumbnail":this.pic,
        "vlink":this.videosAddEdit.value.vlink,
        "description":this.videosAddEdit.value.description   
      }  
      this.listService.updatevideos(bo).subscribe(res=>{
        this.rep = res;
        // this.message = this.rep.message;
        this.addToast(this.rep.message,'success');
        this.onCloseHandled();
        this.ngOnInit();
        this.uniqueId='';
      },err=>{
        this.addToast("Video Not Updated!!",'error');
      });
    }      
  }
  }
}

