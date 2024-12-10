import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    MatIcon,
    ButtonModule,
  ],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.scss',
  providers:[AsyncPipe]
})
export class CrudTableComponent {
@Input() items: any[] = [];
@Input() editMethod: any;
@Input() deleteMethod: any;

@Input() displayedColumns: string[] = [];
resultadoSelecionado!: any;

edit(paramString: string, id: number){
  this.editMethod(paramString, id);
}
delete(id: number){
  this.deleteMethod(id);
}

}
