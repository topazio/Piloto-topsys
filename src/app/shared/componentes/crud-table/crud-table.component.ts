import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.scss',
  providers: [AsyncPipe]
})
export class CrudTableComponent implements OnChanges {

  @Input() items: any[] = [];
  @Input() displayedColumns: any[] = [];
  @Input() captionHeader: string = 'Resultados';
  @Input() mensagemDeEmpty: string = 'Não há registros encontrados';
  @Input() rowsQtd: number = 15;
  @Input() dataKeyTable: string = 'id';
  @Input() paginatorSempreFlag: boolean = false;
  @Input() scrollavelFlag: boolean = true;
  @Input() posicaoPaginator: 'bottom' | 'top' | 'both' = 'bottom';
  @Input() scrollHeightString: string = 'calc(100vh - 285px)';
  @Input() totalRecords: number = 22;
  @Input() showResultSummary: boolean = false;
  @Input() resultSummaryMsg: string = 'Exibindo de {first} à {last}, de {totalRecords} resultados';
  @Input() lazyFlag: boolean = true;

  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  resultadoSelecionado!: any;
  records: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.lazyInitLoad(changes);
  };

  edit(id: number) {
    this.editClick.emit(id);
  };
  delete(id: number) {
    this.deleteClick.emit(id);
  };
  protected loadLazy(event: TableLazyLoadEvent) {
    const parameters = {
      page: event.first! / event.rows!,
      size: this.totalRecords
    };
    this.pageChange.emit(parameters);

  };
  private lazyInitLoad(changes: SimpleChanges) {
    if (changes['items'] && this.items.length > 0) {
      this.records = this.items;
    }
  };

}
