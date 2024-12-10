import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-prime-footer',
  standalone: true,
  imports: [
    CommonModule,DividerModule
  ],
  templateUrl: './prime-footer.component.html',
  styleUrl: './prime-footer.component.scss'
})
export class PrimeFooterComponent {
  @Input() public version = '';
  @Input() public title = '';
  @Input() public userNome = '';
}
