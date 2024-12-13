import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CrudTableRowExpandidaComponent } from './crud-table-row-expandida/crud-table-row-expandida.component';

@Component({
  selector: 'app-crud-table-expansiva',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    CrudTableRowExpandidaComponent
  ],
  templateUrl: './crud-table-expansiva.component.html',
  styleUrl: './crud-table-expansiva.component.scss',
  providers: [AsyncPipe]
})
export class CrudTableExpansivaComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() displayedColumns: any[] = [];
  @Input() displayedColumnsExpandidas: any[] = [];
  @Input() elementExpandedKey: any;
  @ViewChild('tableExpansiva') table: Table | undefined;
  @Input() captionHeader: string = 'Resultados';
  @Input() mensagemDeEmpty: string = 'Não há registros encontrados';
  @Input() rowsQtd: number = 15;
  @Input() dataKeyTable: string = 'id';
  @Input() paginatorSempreFlag: boolean = false;
  @Input() scrollavelFlag: boolean = true;
  @Input() posicaoPaginator: 'bottom' | 'top' | 'both' = 'bottom';
  @Input() scrollHeightString: string = 'calc(100vh - 35rem)';
  @Input() totalRecords: number = 0;
  @Input() first: number = 0;
  @Input() showResultSummary: boolean = false;
  @Input() resultSummaryMsg: string = 'Exibindo de {first} à {last}, de {totalRecords} resultados';
  @Input() lazyFlag: boolean = true;
  @Input() elementRowKeyExpand: string = '';
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();

  resultadoSelecionado!: any;
  selectedResultadosList: any[] = [];
  records: any[] = [];
  expandedRows: Record<string, boolean> = {};
  elementExpanded: any;

  ngOnInit(): void {
    /* console.log(this.displayedColumns);
    console.log('Expancivas:', this.displayedColumnsExpandidas); */

  }
  setElementExpand(element: any) {
    console.log('Settou', element);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkTableItems(changes);
   /*  console.log('valorTalbe:', this.items);
    console.log('RowExpand', this.expandedRows);
    console.log('SelectedRwos', this.selectedResultadosList); */
  }

  edit(id: number) {
    this.editClick.emit(id);
  }

  delete(id: number) {
    this.deleteClick.emit(id);
  }

  onRowExpand(event: any) {
    this.expandedRows[event.data.id] = true;
  }

  onRowCollapse(event: any) {
    delete this.expandedRows[event.data.id];
  }

  protected async loadLazy(event: TableLazyLoadEvent) {
/*     console.log("event: ", event); */

    const parameters = {
      page: event.first! / event.rows!,
      size: this.totalRecords,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
      filters: event.filters
    };

 /*    console.log("parameters: ", parameters); */
    await this.simulacaoSlice(event);
  }

  private async lazyInitLoad() {
    setTimeout(() => {
      this.records = this.items.slice(0, this.rowsQtd);
      this.totalRecords = this.items.length;
    }, 600);
  }

  private async checkTableItems(changes: SimpleChanges) {
    if (changes['items']) {
      await this.lazyInitLoad();
    }
  }

  private async simulacaoSlice(event: TableLazyLoadEvent) {
    if (this.items.length > 0) {
      setTimeout(() => {
        const dataFromBackend = this.items.slice(
          event.first,
          event.first! + event.rows!
        );

        this.records = dataFromBackend;
    /*     console.log("records: ", this.records); */
      }, 600);
    }
  }
}
