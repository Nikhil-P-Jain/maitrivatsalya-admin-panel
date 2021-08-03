import { Component, OnInit } from '@angular/core';
import {folderservice} from 'src/app/service/folder.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpClient, } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

const URL = 'http://api.maitrivatsalya.org/api/upload/file';
//const URL = 'http://localhost:3000/api/upload/file';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  
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
  public gridData: any = [];
  resp:any;
  folderAddEdit: FormGroup;
  isSubmitted = false;
  uniqueId:any;

  rep:any=[];
  message:any;
  


  loading:any;

  upres:any;
  upresp:any;

  fid:any;
  // folder:any;
  // fresp:any;
  isdisable:boolean;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no', 
  };

  constructor(private listService:folderservice,
    public http:HttpClient,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService) { }
  
  ngOnInit() {
    this.isSubmitted = false;

    this.listService.getfolder().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
      console.log("Getting Data :-", this.gridData);
    });
    this.folderAddEdit=this.formBuilder.group({
      fname:['',[Validators.required]]
    })
 }

  saveUser(){
    this.display= 'block';
  }

  onCloseHandled(){
    this.display='none';
    this.ngOnInit();
  }
 
  editfolder(id:any){
    this.uniqueId=id;
    console.log("Getting update id :-", id);
    this.listService.getfolderbyid(id).subscribe(res=>{
        this.upres=res;
        this.upresp=this.upres.data.results[0];
        console.log("Getting response :-", this.upresp);
        this.display='block';
        this.folderAddEdit.reset({
          "fname":this.upresp.fname
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
   
  deletefolder(id:any){
    this.loading=true;
    this.listService.deletefolder(id).subscribe(res=>{
      this.addToast("Gallery Deleted Successfully!!",'success');
      this.ngOnInit();
      this.loading=false;
    })
  }
   
  get f() { return this.folderAddEdit.controls; }

  async onSubmit() {
  this.isSubmitted = true;
  console.log("Getting FormData :-",this.folderAddEdit.value)
  if (this.folderAddEdit.invalid) {
    return;
  }
  else{
    if(!this.uniqueId){
      var body={
        "fname":this.folderAddEdit.value.fname
      }
      this.listService.createfolder(body).subscribe(res=>{
        this.rep = res;
        this.addToast('New Folder Created Successfully','success');
        this.onCloseHandled();
        // this.ngOnInit();
      },err=>{
        this.addToast("New Folder Not Added! Please Try Again!!",'error');
        this.onCloseHandled();
        // this.ngOnInit();
      });
    }
    else{
      var bo={
        "fid": this.uniqueId,
        "fname":this.folderAddEdit.value.fname 
      }  
      this.listService.updatefolder(bo).subscribe(res=>{
        this.rep = res;
        // this.message = this.rep.message;
        this.addToast(this.rep.message,'success');
        this.onCloseHandled();
        this.ngOnInit();
        this.uniqueId='';
      },err=>{
        this.addToast("Folder Not Updated!!",'error');
      });
    }      
  }
  }
}