import { inject, Injectable } from '@angular/core';
import { RouterNavigatorService } from './router-navigator.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  routerNavigator = inject(RouterNavigatorService);


  incluirFiltros(formGroup: FormGroup) {
    if (formGroup.value) {
      sessionStorage.setItem('filtros', JSON.stringify(formGroup.value))
    }
  }
  getFiltros() {
    return sessionStorage.getItem('filtros');
  }

  removerFiltros(route: ActivatedRoute) {

    if (this.routerNavigator.getLastRoute() !== route.snapshot?.parent?.url[0]?.path) {
      sessionStorage.removeItem('filtros');
    }
  }
}
