import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterNavigatorService {
  lastRoute: any;


  setLastRoute(route: any) {
    return this.lastRoute = route;
  }

  getLastRoute() {
    return this.lastRoute;
  }
}
