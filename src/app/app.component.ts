import { Component } from '@angular/core';
import {} from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { DashBoardComponent } from './shared/componentes/dashboard/dashboard.component';




@Component({
    selector: 'app-root',
    imports: [DashBoardComponent,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [provideNgxMask({})]
})
export class AppComponent {
  title = 'Piloto TopSys';
}
