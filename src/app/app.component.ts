import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { DashBoardComponent } from './shared/componentes/dashboard/dashboard.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashBoardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNgxMask({})]
})
export class AppComponent {
  title = 'Piloto TopSys';
}
