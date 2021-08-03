import {Component, Injectable, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { concat, fromEvent, Observable, of, Subscription } from 'rxjs';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  //for toast show
  position = 'top-center';
  showClose = true;
  timeout = 10000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];

  public connectionStatusMessage: string;
    public connectionStatus: string;

  constructor(private router: Router,private toastyService: ToastyService) { }

  ngOnInit() {
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! Please Check Your Internet Connection';
      this.connectionStatus = 'offline';
      this.addToast(this.connectionStatusMessage,'error');
      console.log("Connection status :-", this.connectionStatusMessage)
    }));

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  addToast(msgg:any,type:any) {
    // this.position = this.position;
    const toastOptions: ToastOptions = {
      title: "Maitri",
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
}

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'saveUrl') {
      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).pipe(delay(1000)));

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === 'removeUrl') {
        return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
