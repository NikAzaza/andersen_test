import { Component, ViewChild, ViewChildren, OnInit, ElementRef, Renderer2} from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions, Http} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'webrtc-adapter/out/adapter.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private video;
  private nav;
  private dev;
  private stream;
  private isCam = false;


  @ViewChild('hardwareVideo') hardwareVideo: any;

constructor(private http: HttpClient,
            private h: Http,
            private renderer: Renderer2) { }
  ngOnInit(): void {

    this.video = this.hardwareVideo.nativeElement;
    this.nav = <any>navigator;

    const constraints = { video: true };
    this.nav.mediaDevices.getUserMedia(constraints)
    .then(stream => {this.stream = stream; console.log(stream); } )
    .catch(e => console.error(e));
  
  }

  videoStart() {
    this.renderer.setStyle(this.video, 'display', 'block');
     if ('srcObject' in this.video) {
          this.video.srcObject = this.stream;
        } else {
          this.video.src = window.URL.createObjectURL(this.stream);
        }
    if (this.stream) {
      this.isCam = true;
    }
    this.video.play();
  }

  videoPause() {
    this.video.pause();
    // this.video.src = null;
  }

  print(): void {
    let curr = document.documentElement;
      let printContents, popupWin;
      printContents = document.getElementById('printSection').innerHTML;
    // popupWin = window.open('data:text/html,' + encodeURIComponent(printContents), '_blank');
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();

      popupWin.document.write(`
        <html>
            <head>
                <title>Print tab</title>
                <style>
                    //........Customized style.......
                </style>
            </head>
            <!-- <body onload="window.print(); window.close()"> -->
            <body >
            ${printContents}
            </body>
            <script>setTimeout( function(){ window.print();}, 100);</script>
        </html>`
      );
    popupWin.document.close();
  }

  public picToCanvas() {
    const video = <any>document.getElementsByTagName('video')[0];
    const canvas = <any>document.getElementsByTagName('canvas')[0];
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
    }
  }

  public clearPhoto() {
    const canvas = <any>document.getElementsByTagName('canvas')[0];
    let context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
  }

  public savePhoto() {
     const canvas = <any>document.getElementsByTagName('canvas')[0];
     const save = <any>document.getElementById('save');
      save.href = canvas.toDataURL();
      save.download = 'mypainting.png';
  }

  public makePhoto() {
    this.videoPause();
    this.picToCanvas();
    this.stream = null;
   // const video = <any>document.getElementsByTagName('video')[0];
    this.renderer.setStyle(this.video, 'display', 'none');
  }

  public sendPicToServer() {
    const canvas = <any>document.getElementsByTagName('canvas')[0];
    let photo = canvas.toDataURL('image/jpeg');
    const body = JSON.stringify(photo);

    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    headers.set('Access-Control-Allow-Origin', '*');

     // this.h.post('https://andersen:443/image.php', body, {headers: headers}) // For testing on PC
     this.h.post('http://localhost:8001/image.php', body, {headers: headers}) // For mobile
      .map((resp: Response) => resp.json())
      .catch((error: any) => {
        return Observable.throw(error);
      }).subscribe((data) => {
        console.log(data);
    });
  }
}
