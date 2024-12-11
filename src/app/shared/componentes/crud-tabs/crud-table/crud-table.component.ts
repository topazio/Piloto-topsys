import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.scss',
  providers: [AsyncPipe]
})
export class CrudTableComponent {
  // Valores da tablea inputados;
  @Input() items: any = [];
  @Input() displayedColumns: any[] = [];

  //Controles nativos da Table:
  @Input() captionHeader: string = 'Resultados';
  @Input() mensagemDeEmpty: string = 'Não há registros encontrados';
  @Input() rowsQtd: number = 20;
  @Input() dataKeyTable: string = 'id';
  @Input() paginatorSempreFlag: boolean = false;
  @Input() scrollavelFlag: boolean = true;
  @Input() posicaoPaginator: 'bottom' | 'top' | 'both' = 'bottom';
  @Input() scrollHeightString: string = 'calc(100vh - 285px)';

  // Eventos de clicks, editClick para ir para edições e deleteClick no button de delete da table;
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();

  resultadoSelecionado!: any;

  edit(id: number) {
    this.editClick.emit(id);
  };
  delete(id: number) {
    this.deleteClick.emit(id);
  };

}
