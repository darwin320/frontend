import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  msjError(e: HttpErrorResponse,message:string,message2:string) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, message2);
    } else {
      this.toastr.error(message, message2);
    }
  }
}
