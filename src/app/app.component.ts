import { Component, OnInit } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { DashBoardComponent } from './shared/componentes/dashboard/dashboard.component';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DashBoardComponent,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNgxMask({})]
})
export class AppComponent implements OnInit {
  title = 'Piloto TopSys';

  constructor(public primengConfig: PrimeNGConfig) { };

  ngOnInit() {
    //configuracao do ripple effect do primeNg;
    this.primengConfig.ripple = true;
  }
}
