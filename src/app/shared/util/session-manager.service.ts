import { inject, Injectable } from '@angular/core';
import { RouterNavigatorService } from './router-navigator.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  routerNavigator = inject(RouterNavigatorService);


  incluirFiltros(formGroup: FormGroup, sessionKey?: string) {
    if (formGroup.value) {
      sessionStorage.setItem(sessionKey ?? 'filtros', JSON.stringify(formGroup.value))
    }
  }
  getFiltros(sessionKey?: string) {
    return sessionStorage.getItem(sessionKey ?? 'filtros');
  }

  removerFiltros(route: ActivatedRoute, sessionKey?: string) {
    if (this.routerNavigator.getLastRoute() !== route.snapshot?.parent?.url[0]?.path) {
      sessionStorage.removeItem(sessionKey ?? 'filtros');
    }
  }
}
