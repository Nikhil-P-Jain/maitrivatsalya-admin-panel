import { Component, OnInit , ViewChild } from '@angular/core';
import {counterservice} from 'src/app/service/counter.service';
import { FormGroup, FormBuilder, Validators ,ValidatorFn, AbstractControl,ValidationErrors,FormControl} from '@angular/forms';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { delay, switchMap, map, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
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
       public popoverTitle:string="Counter Delete Confirmation";
       public popoverMessage:string="Are you Sure went to Delete?";
      confirmClicked = false;
      cancelClicked = false;

      display='none';
      public gridData: any = [];
      resp:any;
      counterAddEdit: FormGroup;
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

  constructor(private listService:counterservice,
              public http:HttpClient,
              private formBuilder: FormBuilder,
             private toastyService: ToastyService) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.loading=true;
    this.uid=localStorage.getItem("user_id");

    this.listService.getCounter().subscribe(res=>{
      this.resp = res;
      this.loading=false;
      this.gridData = this.resp.data.results;
    });

    this.counterAddEdit=this.formBuilder.group({
      cname:['',[Validators.required]],
      cvalue:['',[Validators.required]]
    })
    }

    saveUser(){
      this.display= 'block';
    }
    
    onCloseHandled(){
      this.display='none';
      this.ngOnInit();
    }

    editCounter(id:any){
      this.uniquId=id;
        this.listService.getCounterById(id).subscribe(res=>{
            this.upres=res;
            this.upresp=this.upres.data.results[0];
            // console.log("Getting response :-", this.upresp);
            this.display='block';
            this.counterAddEdit.reset({
              "cname":this.upresp.cname,
              "cvalue":this.upresp.cvalue
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

    deleteCounter(id:any){
      this.loading=true;
      this.listService.DeleteCounter(id).subscribe(res=>{
        this.addToast("Counter Deleted Successfully!!",'success');
        this.ngOnInit();
        this.loading=false;
      })
    }
  
    get f() { return this.counterAddEdit.controls; }

    async onSubmit() {
      this.isSubmitted = true;
      // console.log("Getting FormData :-",this.counterAddEdit.value)
      if (this.counterAddEdit.invalid) {
        return;
      }else{
            if(!this.uniquId){
              var body={
                "cname":this.counterAddEdit.value.cname,
                "cvalue":this.counterAddEdit.value.cvalue,
                 }
              // console.log("Getting Create Counter :-", body);
              this.listService.createCounter(body).subscribe(res=>{
               this.rep = res;
                  this.addToast('New Counter Create Successfully','success');
                    this.onCloseHandled();
                    // this.ngOnInit();
              },err=>{
                this.addToast("New Counter Not Added! Please Try Again!!",'error');
                this.onCloseHandled();
                // this.ngOnInit();
              });
            }
            else{
              var bo={
                "cid": this.uniquId,
                "cname":this.counterAddEdit.value.cname,
                "cvalue":this.counterAddEdit.value.cvalue,
               }
               
              this.listService.UpdateCounter(bo).subscribe(res=>{
                this.rep = res;
                // this.message = this.rep.message;
                  this.addToast(this.rep.message,'success');
                  this.onCloseHandled();
                  // this.ngOnInit();
                  this.uniquId='';
              },err=>{
                this.addToast("Counter Not Updated Successfully!!",'error');
              });
            }     
          
      }
    }
}