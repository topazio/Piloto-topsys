import { Component, OnInit } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { DashBoardComponent } from './shared/componentes/dashboard/dashboard.component';
import {  PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashBoardComponent, 
    ToastModule,
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNgxMask({})]
})
export class AppComponent implements OnInit {
  title = 'Piloto TopSys';

  constructor(    public primengConfig: PrimeNGConfig) { };

  ngOnInit() {
    //configuracao do ripple effect do primeNg;
    this.primengConfig.ripple = true;
  }
}
