import { Component, OnInit , ViewChild } from '@angular/core';
import {aboutservice} from 'src/app/service/aboutus.service';
import { FormGroup, FormBuilder, Validators ,ValidatorFn, AbstractControl,ValidationErrors,FormControl} from '@angular/forms';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { delay, switchMap, map, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
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
       public popoverTitle:string="Testimonial Delete Confirmation";
       public popoverMessage:string="Are you Sure went to Delete?";
      confirmClicked = false;
      cancelClicked = false;

      display='none';
      public gridData: any = [];
      resp:any;
      aboutAddEdit: FormGroup;
      isSubmitted = false;
      uniquId:any;
    
      rep:any=[];
      message:any;
    
      loading:any;
    
      ress:any;
      data1:any;
      uid:any;

      editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '20rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
      };

      upres:any;
      upresp:any;

  constructor(private listService:aboutservice,
              public http:HttpClient,
              private formBuilder: FormBuilder,
             private toastyService: ToastyService) { }

  ngOnInit() {
    this.isSubmitted = false;
    // this.loading=true;
    this.listService.getAboutUs().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
    });

    this.aboutAddEdit=this.formBuilder.group({
      name:['',[Validators.required]],
      designation:['',[Validators.required]],
      recomm:['',[Validators.required]]
    })
    }

    saveUser(){
      this.display= 'block';
    }
    
    onCloseHandled(){
      this.display='none';
      this.ngOnInit();
    }

    editAbout(id:any){
      this.uniquId=id;
        this.listService.getAboutUsById(id).subscribe(res=>{
            this.upres=res;
            this.upresp=this.upres.data.results[0];
            this.display='block';
            this.aboutAddEdit.reset({
              "name":this.upresp.name,
              "designation":this.upresp.designation,
              "recomm":this.upresp.recomm
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

    deleteAbout(id:any){
      this.loading=true;
      this.listService.DeleteAboutUs(id).subscribe(res=>{
        this.addToast("Testimonial Deleted Successfully!!",'success');
        this.ngOnInit();
        this.loading=false;
      })
    }
  
    get f() { return this.aboutAddEdit.controls; }

    async onSubmit() {
      this.isSubmitted = true;
      if (this.aboutAddEdit.invalid) {
        return;
      }else{
            if(!this.uniquId){
              var body={
                "name":this.aboutAddEdit.value.name,
                "designation":this.aboutAddEdit.value.designation,
                "recomm":this.aboutAddEdit.value.recomm
                 }
              this.listService.createAboutUs(body).subscribe(res=>{
               this.rep = res;
                  this.addToast('New Testimonial Create Successfully','success');
                    this.onCloseHandled();
                    // this.ngOnInit();
              },err=>{
                this.addToast("New Testimonial Not Added! Please Try Again!!",'error');
                this.onCloseHandled();
                // this.ngOnInit();
              });
            }
            else{
              var bo={
                "aid": this.uniquId,
                "name":this.aboutAddEdit.value.name,
                "designation":this.aboutAddEdit.value.designation,
                "recomm":this.aboutAddEdit.value.recomm
               }
               
              this.listService.UpdateAboutUs(bo).subscribe(res=>{
                this.rep = res;
                // this.message = this.rep.message;
                  this.addToast(this.rep.message,'success');
                  this.onCloseHandled();
                  // this.ngOnInit();
                  this.uniquId='';
              },err=>{
                this.addToast("Testimonials Not Updated Successfully!!",'error');
              });
            }     
          
      }
    }
   
}
