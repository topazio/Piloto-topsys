import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { validationError } from '../../util/validationErrorFn';
import { InputErrorMsgComponent } from './input-error-msg/input-error-msg.component';

@Component({
  selector: 'app-input-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorMsgComponent,
  ],
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss'
})
export class InputWrapperComponent {
  @Input() label!: string;
  @Input() formControle: FormControl | null = null;
  @Input() formControlAbstrato: AbstractControl | null = null;
  @Input() required: boolean = false;
  @Input() placeholder: string = 'Digite';
  @Input() inputNome!: string;
  @Input() size: string = 'lg:col-1 md:col-1 sm:col-1';


  hasError: Function = validationError
}
