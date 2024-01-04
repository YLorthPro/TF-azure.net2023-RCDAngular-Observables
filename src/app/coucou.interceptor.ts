import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class coucouInterceptor implements HttpInterceptor  {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log("coucou")

    const newReq = req.clone({
      headers: req.headers.set("Authorization", "El token")
      }
    )

    return next.handle(newReq);
  }
}
