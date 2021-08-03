import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { bookservice } from 'src/app/service/book.service';

const URL = 'http://api.maitrivatsalya.org/api/upload/file';
// const URL = 'http://localhost:3000/api/upload/file';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
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
  public popoverTitle:string="Book Delete Confirmation";
  public popoverMessage:string="Are you Sure that you want to Delete?";
  confirmClicked = false;
  cancelClicked = false;

  display='none';
  import ="none";
  public gridData: any = [];
  resp:any;
  bookAddEdit: FormGroup;
  isSubmitted = false;
  uniqueId:any;

  rep:any=[];
  message:any;
  
  imgURL:any;
  images:any;
  pic:any;

  pdfURL: any;
  pdf: any;
  pdffile: any;

  disable:boolean;

  loading:any;

  upres:any;
  upresp:any;

  bid:any;
  folder:any;
  fresp:any;
  isdisable:boolean;
  pdfisdisable:boolean;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no', 
  };
  
  constructor(private listService:bookservice,
    public http:HttpClient,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.isSubmitted = false;

    this.listService.getbook().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
      console.log("Getting Data :-", this.gridData);
    });
    this.bookAddEdit=this.formBuilder.group({
      title:['',[Validators.required]],
      caption:['',[Validators.required]],
      description:['',[Validators.required]],
      image:[''],
      blink:[''],
    })
 }

  saveUser(){
    this.display= 'block';
  }

  onCloseHandled(){
    this.display='none';
    this.pic='';
    this.pdffile='';
    this.imgURL='';
    this.pdfURL='';
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
      // console.log("formdata append",formData.append('file', this.images));
      this.http.post<any>(URL, formData).subscribe(res=>{
        console.log("file path",res.file.path);
        this.pic = "http://api.maitrivatsalya.org/"+res.file.path;
        // this.pic = "http://localhost:3000/"+res.file.path;
        this.isdisable=false;
        this.disable=true;
        // this.disabled();
        console.log("Getting Image :-", this.pic);
      });
    }
  }
  // disabled(){
  //   this.isdisable=false;
  //   console.log("disable function",this.isdisable," and  ",this.pdfisdisable)
  //   if(this.isdisable==false && this.pdfisdisable==true){
  //     this.disable=true;
  //   }
  //   if(this.isdisable!=false && this.pdfisdisable==false){
  //     this.disable=false;
  //   }
  // }
  async uploadPDF(event){
    this.pdfisdisable=true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();  
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => {
        if(event != undefined){
          this.pdfURL = event.target.result;
        }
      }
    }
    if(event.target.files.length>0){
      const file1 = event.target.files[0];
      this.pdf = file1;
      const formData = new FormData();
      formData.append('file', this.pdf); 
      this.http.post<any>(URL, formData).subscribe(res=>{
        this.pdffile = "http://api.maitrivatsalya.org/"+res.file.path;
        // this.pdffile = "http://localhost:3000/"+res.file.path;
        this.pdfisdisable=false;
        // this.disabled();
        this.disable=false;
        console.log("Getting PDF :-", this.pdffile);
      });
    }
  }
  
  editbook(id:any){
    this.uniqueId=id;
    console.log("Getting update id :-", id);
    this.listService.getbookbyid(id).subscribe(res=>{
        this.upres=res;
        this.upresp=this.upres.data.results[0];
        console.log("Getting response :-", this.upresp);
        this.display='block';
        this.pic=this.upresp.image;
        this.imgURL=this.pic;
        this.bookAddEdit.reset({
          "title":this.upresp.title,
          "caption":this.upresp.caption,
          "description":this.upresp.description,
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
   
  deletebook(id:any){
    this.loading=true;
    this.listService.deletebook(id).subscribe(res=>{
      this.addToast("Book Deleted Successfully!!",'success');
      this.ngOnInit();
      this.loading=false;
    })
  }
   
  get f() { return this.bookAddEdit.controls; }

  async onSubmit() {
  this.isSubmitted = true;
  console.log("Getting FormData :-",this.bookAddEdit.value)
  if (this.bookAddEdit.invalid) {
    return;
  }
  else{
    if(!this.uniqueId){
      var body={
        "title":this.bookAddEdit.value.title,
        "caption":this.bookAddEdit.value.caption,                
        "description":this.bookAddEdit.value.description,
        "image":this.pic,
        "blink":this.pdffile
      }
      this.listService.createbook(body).subscribe(res=>{
        this.rep = res;
        this.addToast('New book Created Successfully','success');
        this.onCloseHandled();
        this.imgURL="";
        this.pdfURL="";
        // this.ngOnInit();
      },err=>{
        this.addToast("New book Not Added! Please Try Again!!",'error');
        this.onCloseHandled();
        // this.ngOnInit();
      });
    }
    else{
      var bo={
        "bid": this.uniqueId,
        "title":this.bookAddEdit.value.title,
        "caption":this.bookAddEdit.value.caption,
        "description":this.bookAddEdit.value.description,
        "image":this.pic,
        "blink":this.pdffile
      }  
      this.listService.updatebook(bo).subscribe(res=>{
        this.rep = res;
        // this.message = this.rep.message;
        this.addToast(this.rep.message,'success');
        this.onCloseHandled();
        this.ngOnInit();
        this.uniqueId='';
      },err=>{
        this.addToast("Book Not Updated!!",'error');
      });
    }      
  }
  }

}
