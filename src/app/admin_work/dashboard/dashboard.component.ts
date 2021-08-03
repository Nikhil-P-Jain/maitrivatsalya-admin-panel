import {Component, OnInit, ViewEncapsulation , ViewChild} from '@angular/core';
import { dashboardService } from '../../service/dashboard.service';
import { DatePipe } from '@angular/common';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  //for toast show
  position = 'top-center';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  
  resp:any;
  userid:any;

  loading:boolean;

  date:any;
  currentDate:any;

  stresp:any;

  state_id: any;
  allstate: Array<{ state: string}>;

  diresp:any;
  dist_id:any;
  alldist:Array<{ district:string}>;

  devesp:any;
  device_id:any;
  alldevice:Array<{ msg:string}>;

  sdata:any;
  datetime:any;
  deviceData:any;
  nowGenrating:any;
  totalGenrating:any;
  flowRate:any;
  totalFlow:any;
  totalonTime:any;
  dcVoltage:any;
  dcCurrent:any;
  motorPower:any;
  motorCurrent:any;
  motorSpeed:any;
  motorVoltage:any;
  gridData:any;

  cfy:any=[];
  cf:any;
  cfx:any=[];
  series:any[];

  mpy:any=[];
  mp:any;
  mpx:any=[];
  mpSeries:any[];

  opy:any=[];
  op:any;
  opx:any=[];
  opSeries:any[];

  crossingValues:any=[];
  sitedata:any;

  ChartValue:any="Output Power";
  display:any='none';
  did:any;
  total_sites:any;
  online:any;
  alert:any;
  statusData:any;

  // @ViewChild('chart1', {static: false}) chart: any;

  // title = 'zing-app';
  // series:zingchart.series = {
  //   values: randomData(10)
  // }
  config:any;
  config1:any;
  config2:any;
  // updater = setInterval(() => {
  //   this.series = {
  //     values: randomData(10)
  //   };
  // }, 1000);

  // getConfig() {
  //   return (this.config) ? JSON.stringify(this.config) : '';
  // }
  // getSeries() {
  //   return (this.series) ? JSON.stringify(this.series) : '';
  // }

  constructor(
          private datepipe:DatePipe,
          private toastyService: ToastyService,
          private dbservice:dashboardService) {}

          // public series: any[] = [{
          //   name: 'India',
          //   data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
          // }];

          public seriesData: number[] = [2034, 40124, 45234, 30234, 50234];

          public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];

          public value = 60;
  ngOnInit() {
    this.crossingValues= [0, 1000];
    this.date = new Date();
    this.currentDate = this.datepipe.transform(this.date,'yyyy-MM-dd');
    this.userid = localStorage.getItem("user_id");
    var body={
      "userId":this.userid
    }
    this.dbservice.getAllState(body).subscribe(res=>{
      this.stresp=res;
      this.allstate=this.stresp.state;
      this.state_id=this.allstate[0];

      var body1={
          "userId":this.userid,
          "state_name": this.state_id.state
      }
      this.dbservice.getDist(body1).subscribe(res=>{
        this.diresp=res
        this.alldist=this.diresp.dist;
        this.dist_id=this.alldist[0];

        var body2={
          "userId":this.userid,
          "district": this.dist_id.district
       }
      this.dbservice.getDevice(body2).subscribe(res=>{
        this.devesp=res
        this.alldevice=this.devesp.msg;
        this.device_id=this.alldevice[0];
        this.did=this.device_id.device_id.split(":- ")
        var body3={
                "user_id":this.userid,
                "deviceId":this.did[1],
                }
          this.dbservice.getDeviceDate(body3).subscribe(res=>{
              this.sdata=res;
              this.loading=false;
              this.deviceData=this.sdata.data;
              this.total_sites=this.sdata.total_site;
              this.statusData=this.sdata.status;
              console.log("Getting CF Value :-", this.total_sites);
              this.online=this.statusData.online;
              this.alert=this.statusData.alert;
              this.datetime=this.deviceData.date+" "+this.deviceData.time;
              this.nowGenrating=this.deviceData.output_power;
              this.totalGenrating=this.deviceData.total_energy;
              this.flowRate=this.deviceData.current_flow;
              this.totalFlow=this.deviceData.total_flow;
              this.totalonTime=this.deviceData.total_on_time;
              this.dcVoltage=this.deviceData.dv_v;
              this.dcCurrent=this.deviceData.dc_c;
              this.motorPower=this.deviceData.inst_power;
              this.motorCurrent=this.deviceData.motor_c;
              this.motorSpeed=this.deviceData.motor_speed;
              this.motorVoltage=this.deviceData.motor_v;
              this.gridData=this.deviceData.table_data;
              this.sitedata=this.deviceData.sitedetails;
              this.cf=this.deviceData.cf;
              this.mp=this.deviceData.ipss;
              this.op=this.deviceData.outputp;
              if(this.cf.lenght != 0){
                // for(var i=0;i<this.cf.length;i++){
                //   this.cfx.push(this.cf[i].x);
                //   this.cfy.push(parseFloat(this.cf[i].y));
                // }
                //   this.series= [{
                //     name: 'Current Flow',
                //     data: this.cfy,
                //   }];
                this.config={
                  type: 'line', 
                  plot: {
                    decimals: 5,
                    tooltip: {
                      "decimals": 4,
                      'background-color': "white",
                      'border-width': 1,
                      "font-color":"black",
                      'border-color': "black",
                      'border-radius': "9px",
                      padding: "5%",
                      callout: true
                    },
                    marker: {
                        size:1,
                        "border-width":0,
                    }
                  },
                  series: [{ values: this.cf }] 
                }
                }
                  if(this.mp.lenght != 0){
                    // for(var i=0;i<this.mp.length;i++){
                    //   this.mpx.push(this.mp[i].x);
                    //   this.mpy.push(parseFloat(this.mp[i].y));
                    // }
                    //   this.mpSeries= [{
                    //     name: 'Motor Power',
                    //     data: this.mpy
                    //   }];
                    this.config1={
                      type: 'line',
                      plot: {
                        decimals: 5,
                        tooltip: {
                          "decimals": 4,
                          'background-color': "white",
                          'border-width': 1,
                          "font-color":"black",
                          'border-color': "black",
                          'border-radius': "9px",
                          padding: "5%",
                          callout: true
                        },
                        marker: {
                            size:1,
                            "border-width":0,
                        }
                      }, 
                        series: [{ values: this.mp }] 
                    }
              }
              if(this.op.lenght != 0){
                // for(var i=0;i<this.op.length;i++){
                //   this.opx.push(this.op[i].x);
                //   this.opy.push(parseFloat(this.op[i].y));
                // }
                //   this.opSeries= [{
                //     name: this.ChartValue,
                //     data: this.mpy
                //   }];
                this.config2={
                  type: 'line', 
                  plot: {
                    decimals: 5,
                    tooltip: {
                      "decimals": 4,
                      'background-color': "white",
                      'border-width': 1,
                      "font-color":"black",
                      'border-color': "black",
                      'border-radius': "9px",
                      padding: "5%",
                      callout: true
                    },
                    marker: {
                        size:1,
                        "border-width":0,
                    }
                  },
                    series: [{ values: this.op }] 
                }
          }
          },error=>{
            this.loading=false;
            this.addToast("Data Not Found!",'error');
          })
        })
      })
    })
   }

   getData(){
     this.display='block';
   }

   onChangeState(){
    this.loading=true;
    var body1={
      "userId":this.userid,
      "state_name": this.state_id.state
  }
  this.dbservice.getDist(body1).subscribe(res=>{
    this.diresp=res
    this.alldist=this.diresp.dist;
    this.dist_id=this.alldist[0];

    var body2={
      "userId":this.userid,
      "district": this.dist_id.district
   }
  this.dbservice.getDevice(body2).subscribe(res=>{
    this.devesp=res
    this.alldevice=this.devesp.msg;
    this.device_id=this.alldevice[0];
    this.did=this.device_id.device_id.split(":- ")
    var body3={
            "user_id":this.userid,
            "deviceId":this.did[1],
            }
      this.dbservice.getDeviceDate(body3).subscribe(res=>{
          this.sdata=res;
          this.loading=false;
          this.deviceData=this.sdata.data;
          this.total_sites=this.sdata.total_site;
          this.statusData=this.sdata.status;
          console.log("Getting CF Value :-", this.statusData);
          this.online=this.statusData.online;
          this.alert=this.statusData.alert;
          this.datetime=this.deviceData.date+" "+this.deviceData.time;
          this.nowGenrating=this.deviceData.output_power;
          this.totalGenrating=this.deviceData.total_energy;
          this.flowRate=this.deviceData.current_flow;
          this.totalFlow=this.deviceData.total_flow;
          this.totalonTime=this.deviceData.total_on_time;
          this.dcVoltage=this.deviceData.dv_v;
          this.dcCurrent=this.deviceData.dc_c;
          this.motorPower=this.deviceData.inst_power;
          this.motorCurrent=this.deviceData.motor_c;
          this.motorSpeed=this.deviceData.motor_speed;
          this.motorVoltage=this.deviceData.motor_v;
          this.sitedata=this.deviceData.sitedetails;
          this.gridData=this.deviceData.table_data;
          this.cf=this.deviceData.cf;
          this.mp=this.deviceData.ipss;
          this.op=this.deviceData.outputp;
          if(this.cf.lenght != 0){
            // for(var i=0;i<this.cf.length;i++){
            //   this.cfx.push(this.cf[i].x);
            //   this.cfy.push(parseFloat(this.cf[i].y));
            // }
            //   this.series= [{
            //     name: 'Current Flow',
            //     data: this.cfy,
            //   }];
            this.config={
              type: 'line', 
              plot: {
                decimals: 5,
                tooltip: {
                  "decimals": 4,
                  'background-color': "white",
                  'border-width': 1,
                  "font-color":"black",
                  'border-color': "black",
                  'border-radius': "9px",
                  padding: "5%",
                  callout: true
                },
                marker: {
                    size:1,
                    "border-width":0,
                }
              },
                series: [{ values: this.cf }] 
            }
            }
              if(this.mp.lenght != 0){
                // for(var i=0;i<this.mp.length;i++){
                //   this.mpx.push(this.mp[i].x);
                //   this.mpy.push(parseFloat(this.mp[i].y));
                // }
                //   this.mpSeries= [{
                //     name: 'Motor Power',
                //     data: this.mpy
                //   }];
                this.config1={
                  type: 'line',
                  plot: {
                    decimals: 5,
                    tooltip: {
                      "decimals": 4,
                      'background-color': "white",
                      'border-width': 1,
                      "font-color":"black",
                      'border-color': "black",
                      'border-radius': "9px",
                      padding: "5%",
                      callout: true
                    },
                    marker: {
                        size:1,
                        "border-width":0,
                    }
                  }, 
                    series: [{ values: this.mp }] 
                }
          }
          if(this.op.lenght != 0){
            // for(var i=0;i<this.op.length;i++){
            //   this.opx.push(this.op[i].x);
            //   this.opy.push(parseFloat(this.op[i].y));
            // }
            //   this.opSeries= [{
            //     name: this.ChartValue,
            //     data: this.mpy
            //   }];
            this.config2={
              type: 'line', 
              plot: {
                decimals: 5,
                tooltip: {
                  "decimals": 4,
                  'background-color': "white",
                  'border-width': 1,
                  "font-color":"black",
                  'border-color': "black",
                  'border-radius': "9px",
                  padding: "5%",
                  callout: true
                },
                marker: {
                    size:1,
                    "border-width":0,
                }
              },
                series: [{ values: this.op }] 
            }
      }
      },error=>{
        this.loading=false;
        this.addToast("Data Not Found!",'error');
      })
    })
  })
   }

   onChangeDistrict(){
     this.loading=true;
    var body2={
      "userId":this.userid,
      "district": this.dist_id.district
   }
  this.dbservice.getDevice(body2).subscribe(res=>{
    this.devesp=res
    this.alldevice=this.devesp.msg;
    this.device_id=this.alldevice[0];
    this.did=this.device_id.device_id.split(":- ")
    var body3={
            "user_id":this.userid,
            "deviceId":this.did[1],
            }
      this.dbservice.getDeviceDate(body3).subscribe(res=>{
          this.sdata=res;
          this.loading=false;
          this.deviceData=this.sdata.data;
          this.total_sites=this.sdata.total_site;
          this.statusData=this.sdata.status;
          console.log("Getting CF Value :-", this.statusData);
          this.online=this.statusData.online;
          this.alert=this.statusData.alert;
          this.datetime=this.deviceData.date+" "+this.deviceData.time;
          this.nowGenrating=this.deviceData.output_power;
          this.totalGenrating=this.deviceData.total_energy;
          this.flowRate=this.deviceData.current_flow;
          this.totalFlow=this.deviceData.total_flow;
          this.totalonTime=this.deviceData.total_on_time;
          this.dcVoltage=this.deviceData.dv_v;
          this.dcCurrent=this.deviceData.dc_c;
          this.motorPower=this.deviceData.inst_power;
          this.motorCurrent=this.deviceData.motor_c;
          this.motorSpeed=this.deviceData.motor_speed;
          this.motorVoltage=this.deviceData.motor_v;
          this.sitedata=this.deviceData.sitedetails;
          this.gridData=this.deviceData.table_data;
          this.cf=this.deviceData.cf;
          this.mp=this.deviceData.ipss;
          this.op=this.deviceData.outputp;
          if(this.cf.lenght != 0){
            // for(var i=0;i<this.cf.length;i++){
            //   this.cfx.push(this.cf[i].x);
            //   this.cfy.push(parseFloat(this.cf[i].y));
            // }
            //   this.series= [{
            //     name: 'Current Flow',
            //     data: this.cfy,
            //   }];
            this.config={
              type: 'line', 
              plot: {
                decimals: 5,
                tooltip: {
                  "decimals": 4,
                  'background-color': "white",
                  'border-width': 1,
                  "font-color":"black",
                  'border-color': "black",
                  'border-radius': "9px",
                  padding: "5%",
                  callout: true
                },
                marker: {
                    size:1,
                    "border-width":0,
                }
              },
                series: [{ values: this.cf }] 
            }
            }
              if(this.mp.lenght != 0){
                // for(var i=0;i<this.mp.length;i++){
                //   this.mpx.push(this.mp[i].x);
                //   this.mpy.push(parseFloat(this.mp[i].y));
                // }
                //   this.mpSeries= [{
                //     name: 'Motor Power',
                //     data: this.mpy
                //   }];
                this.config1={
                  type: 'line',
                  plot: {
                    decimals: 5,
                    tooltip: {
                      "decimals": 4,
                      'background-color': "white",
                      'border-width': 1,
                      "font-color":"black",
                      'border-color': "black",
                      'border-radius': "9px",
                      padding: "5%",
                      callout: true
                    },
                    marker: {
                        size:1,
                        "border-width":0,
                    }
                  },
                    series: [{ values: this.mp }] 
                }
          }
          if(this.op.lenght != 0){
            // for(var i=0;i<this.op.length;i++){
            //   this.opx.push(this.op[i].x);
            //   this.opy.push(parseFloat(this.op[i].y));
            // }
            //   this.opSeries= [{
            //     name: this.ChartValue,
            //     data: this.mpy
            //   }];
            this.config2={
              type: 'line', 
              plot: {
                decimals: 5,
                tooltip: {
                  "decimals": 4,
                  'background-color': "white",
                  'border-width': 1,
                  "font-color":"black",
                  'border-color': "black",
                  'border-radius': "9px",
                  padding: "5%",
                  callout: true
                },
                marker: {
                    size:1,
                    "border-width":0,
                }
              },
                series: [{ values: this.op }] 
            }
      }
      },error=>{
        this.loading=false;
        this.addToast("Data Not Found!",'error');
      })
    })
   }

   addToast(msgg:any,type:any) {
    // this.position = this.position;
    const toastOptions: ToastOptions = {
      title: "Royal India",
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

   filter(data:any){
     this.loading=true;
      
   }

   onSubmit(){
     this.loading=true;
     this.did=this.device_id.device_id.split(":- ")
     var body3={
            "user_id":this.userid,
             "deviceId":this.did[1],
             }
this.dbservice.getDeviceDate(body3).subscribe(res=>{
    this.loading=false;
    this.sdata=res;
    this.deviceData=this.sdata.data;
    this.total_sites=this.sdata.total_site;
    this.statusData=this.sdata.status;
    console.log("Getting CF Value :-", this.statusData);
    this.online=this.statusData.online;
    this.alert=this.statusData.alert;
    this.datetime=this.deviceData.date+" "+this.deviceData.time;
    this.nowGenrating=this.deviceData.output_power;
    this.totalGenrating=this.deviceData.total_energy;
    this.flowRate=this.deviceData.current_flow;
    this.totalFlow=this.deviceData.total_flow;
    this.totalonTime=this.deviceData.total_on_time;
    this.dcVoltage=this.deviceData.dv_v;
    this.dcCurrent=this.deviceData.dc_c;
    this.motorPower=this.deviceData.inst_power;
    this.motorCurrent=this.deviceData.motor_c;
    this.motorSpeed=this.deviceData.motor_speed;
    this.motorVoltage=this.deviceData.motor_v;
    this.sitedata=this.deviceData.sitedetails;
    this.gridData=this.deviceData.table_data;
    this.cf=this.deviceData.cf;
    this.mp=this.deviceData.ipss;
    this.op=this.deviceData.outputp;
    if(this.cf.lenght != 0){
      // for(var i=0;i<this.cf.length;i++){
      //   this.cfx.push(this.cf[i].x);
      //   this.cfy.push(parseFloat(this.cf[i].y));
      // }
      //   this.series= [{
      //     name: 'Current Flow',
      //     data: this.cfy
      //   }];
      this.config={
        type: 'line',
        plot: {
          decimals: 5,
          tooltip: {
            "decimals": 4,
            'background-color': "white",
            'border-width': 1,
            "font-color":"black",
            'border-color': "black",
            'border-radius': "9px",
            padding: "5%",
            callout: true
          },
          marker: {
              size:1,
              "border-width":0,
          }
        },
          series: [{ values: this.cf }] 
      }
      }
        if(this.mp.lenght != 0){
          // for(var i=0;i<this.mp.length;i++){
          //   this.mpx.push(this.mp[i].x);
          //   this.mpy.push(parseFloat(this.mp[i].y));
          // }
          //   this.mpSeries= [{
          //     name: 'Motor Power',
          //     data: this.mpy
          //   }];
          this.config1={
            type: 'line',
            plot: {
              decimals: 5,
              tooltip: {
                "decimals": 4,
                'background-color': "white",
                'border-width': 1,
                "font-color":"black",
                'border-color': "black",
                'border-radius': "9px",
                padding: "5%",
                callout: true
              },
              marker: {
                  size:1,
                  "border-width":0,
              }
            },
              series: [{ values: this.mp }] 
          }
    }
    if(this.op.lenght != 0){
      // for(var i=0;i<this.op.length;i++){
      //   this.opx.push(this.op[i].x);
      //   this.opy.push(parseFloat(this.op[i].y));
      // }
      //   this.opSeries= [{
      //     name: this.ChartValue,
      //     data: this.mpy
      //   }];
      this.config2={
        type: 'line', 
        plot: {
          decimals: 5,
          tooltip: {
            "decimals": 4,
            'background-color': "white",
            'border-width': 1,
            "font-color":"black",
            'border-color': "black",
            'border-radius': "9px",
            padding: "5%",
            callout: true
          },
          marker: {
              size:1,
              "border-width":0,
          }
        },
          series: [{ values: this.op }] 
      }
}
},error=>{
  this.loading=false;
  this.addToast("Data Not Found!",'error');
})
  }

   filter1(data:any){
     this.ChartValue=data;
     if(this.ChartValue == 'Output Power'){
      this.op=this.deviceData.outputp;
      if(this.op.lenght != 0){
        // for(var i=0;i<this.op.length;i++){
        //   this.opx.push(this.op[i].x);
        //   this.opy.push(parseFloat(this.op[i].y));
        // }
        //   this.opSeries= [{
        //     name: this.ChartValue,
        //     data: this.mpy
        //   }];
        this.config2={
          type: 'line', 
          plot: {
            decimals: 5,
            tooltip: {
              "decimals": 4,
              'background-color': "white",
              'border-width': 1,
              "font-color":"black",
              'border-color': "black",
              'border-radius': "9px",
              padding: "5%",
              callout: true
            },
            marker: {
                size:1,
                "border-width":0,
            }
          },
            series: [{ values: this.op }] 
        }
       }
     }
     else if(this.ChartValue == 'DC Current'){
      this.op=this.deviceData.dch;
      if(this.op.lenght != 0){
        // for(var i=0;i<this.op.length;i++){
        //   this.opx.push(this.op[i].x);
        //   this.opy.push(parseFloat(this.op[i].y));
        // }
        //   this.opSeries= [{
        //     name: this.ChartValue,
        //     data: this.mpy
        //   }];
        this.config2={
          type: 'line', 
          plot: {
            decimals: 5,
            tooltip: {
              "decimals": 4,
              'background-color': "white",
              'border-width': 1,
              "font-color":"black",
              'border-color': "black",
              'border-radius': "9px",
              padding: "5%",
              callout: true
            },
            marker: {
                size:1,
                "border-width":0,
            }
          },
            series: [{ values: this.op }] 
        }
       }
     }
     else if(this.ChartValue == 'DC Voltage'){
      this.op=this.deviceData.dvv;
      if(this.op.lenght != 0){
        // for(var i=0;i<this.op.length;i++){
        //   this.opx.push(this.op[i].x);
        //   this.opy.push(parseFloat(this.op[i].y));
        // }
        //   this.opSeries= [{
        //     name: this.ChartValue,
        //     data: this.mpy
        //   }];
        this.config2={
          type: 'line', 
          plot: {
            decimals: 5,
            tooltip: {
              "decimals": 4,
              'background-color': "white",
              'border-width': 1,
              "font-color":"black",
              'border-color': "black",
              'border-radius': "9px",
              padding: "5%",
              callout: true
            },
            marker: {
                size:1,
                "border-width":0,
            }
          },
            series: [{ values: this.op }] 
        }
       }
     }

     else if(this.ChartValue == 'Motor V'){
      this.op=this.deviceData.ipss;
      if(this.op.lenght != 0){
      //   for(var i=0;i<this.op.length;i++){
      //     this.opx.push(this.op[i].x);
      //     this.opy.push(parseFloat(this.op[i].y));
      //   }
      //     this.opSeries= [{
      //       name: this.ChartValue,
      //       data: this.mpy
      //     }];
      this.config2={
        type: 'line', 
        plot: {
          decimals: 5,
          tooltip: {
            "decimals": 4,
            'background-color': "white",
            'border-width': 1,
            "font-color":"black",
            'border-color': "black",
            'border-radius': "9px",
            padding: "5%",
            callout: true
          },
          marker: {
              size:1,
              "border-width":0,
          }
        },
          series: [{ values: this.op }] 
      }
       }
     }
  }

}
