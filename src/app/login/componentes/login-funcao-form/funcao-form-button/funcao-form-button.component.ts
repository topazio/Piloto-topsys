import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-funcao-form-button',
  standalone: true,
  imports: [
    CommonModule, ButtonModule
  ],
  templateUrl: './funcao-form-button.component.html',
  styleUrl: './funcao-form-button.component.scss'
})
export class FuncaoFormButtonComponent {

  @Input() id!: number;
  @Input() funcao: any;
  // @angular-eslint/no-output-on-prefix
  @Output() onClickSetter = new EventEmitter<{ id: number, funcao: any }>();
  constructor(private router: Router) { }
  handleClick(event: Event, funcao: any) {
    event.preventDefault();
    this.unselectButtons();
    setTimeout(() => {
      const thisBtn = document.getElementById(funcao.id);
      if (thisBtn?.classList.contains('p-button-primary')) {
        return;
      }
      thisBtn?.setAttribute('ng-reflect-severity', 'primary');
      thisBtn?.setAttribute('severity', 'primary');
      thisBtn?.classList.remove('p-button-secondary');
      thisBtn?.classList.add('p-button-primary');

    }, 50)

    this.onClickSetter.emit({ id: this.id, funcao: this.funcao });
  };
  iconClassFn(displayUserFuncao: any): string {
    switch (displayUserFuncao.id) {
      case 87:
        return 'fa-solid fa-user-lock';
      case 7:
        return 'fa-solid fa-user-doctor';
      case 313:
      case 369:
        return 'fa-solid fa-user-tie';
      default:
        return this.iconFuncaoCheker(displayUserFuncao);
    }
  }

  iconFuncaoCheker(funcao: any): string {
    const funcaoObj = funcao;
    const descricaoLower = funcaoObj.descricao.toLowerCase();
    if (descricaoLower.includes('coordenad')) {
      return 'fa-solid fa-user-tie';
    }
    else if (descricaoLower.includes('enferme')) {
      return 'fa-solid fa-user-nurse';
    } else if (funcaoObj.flagEspecialidade && funcaoObj.flagFuncaoMedica) {
      return 'fa-solid fa-user-doctor';
    } else if (funcaoObj.flagFuncaoMedica && !funcaoObj.flagEspecialidade) {
      return 'fa-solid fa-user-doctor';
    } else if (!funcaoObj.flagFuncaoMedica && funcaoObj.flagEspecialidade) {
      return 'fa-solid fa-user-nurse';
    } else {
      return 'fa-solid fa-user';
    }
  }
  private unselectButtons() {
    const buttonsSeleceteds = document.querySelectorAll('.p-button-primary');
    buttonsSeleceteds.forEach((btn) => {
      btn.setAttribute('ng-reflect-severity', 'secondary');
      btn.setAttribute('severity', 'secondary')
      btn.classList.remove('p-button-primary');
      btn.classList.add('p-button-secondary');
    });
  };

  get iconClass(): string {
    return this.iconClassFn(this.funcao);
  };
}
