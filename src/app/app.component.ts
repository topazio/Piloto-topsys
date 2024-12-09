import { Component, importProvidersFrom } from '@angular/core';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { CrudBotoesCadastroComponent } from './shared/crud-botoes-cadastro/crud-botoes-cadastro.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashBoardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNgxMask({})]
})
export class AppComponent {
  title = 'Contratos';
}
