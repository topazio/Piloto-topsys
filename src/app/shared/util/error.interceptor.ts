import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { PrimeToastService } from "./prime-toast.service";



export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(PrimeToastService);

  return next(req).pipe(
    catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {

        if(err.status === 404){
          snackBar.error('Não encontrou!');
        }else{
          snackBar.error('Ocorreu um erro no sistema!');
          console.error('HTTP error:', err);
        }


      } else {

        snackBar.error('Ocorreu um erro!');
        console.error('Um erro ocorreu:', err);
      }

      return throwError(() => err);
    })
  );;
};
