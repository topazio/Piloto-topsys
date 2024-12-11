import { AbstractControl } from "@angular/forms";

export function validationError(control: AbstractControl): string {
  if (control?.errors && control?.touched) {
    return 'ng-invalid ng-dirty';
  }
  return "";
}
