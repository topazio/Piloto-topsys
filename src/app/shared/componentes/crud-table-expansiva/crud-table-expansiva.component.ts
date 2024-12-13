import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CrudTableRowExpandidaComponent } from './crud-table-row-expandida/crud-table-row-expandida.component';
import { IContrato } from '../../../contratos/model/contrato';
import { Observable } from 'rxjs';

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
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Input() detailRequestMethod: Observable<IContrato[]> = new Observable<IContrato[]>();
  @Output() detailRequestEmitter: EventEmitter<any> = new EventEmitter();
  resultadoSelecionado!: any;
  selectedResultadosList: any[] = [];
  records: any[] = [];
  expandedRows: Record<string, boolean> = {};
  elementExpanded: any;

  ngOnInit(): void {


  }
  ngOnChanges(changes: SimpleChanges): void {
    this.lazyInitLoad(changes);
  }

  edit(id: number) {
    this.editClick.emit(id);
  }
  delete(id: number) {
    this.deleteClick.emit(id);
  }
  elementDetail(id: number) {
    console.log('Clickou interno');
   this.detailRequestMethod.subscribe((val) =>{
      console.log(val);
    this.elementExpanded = val;
    })
    }



  onRowExpand(event: any) {
    this.expandedRows[event.data.id] = true;
  }

  onRowCollapse(event: any) {
    delete this.expandedRows[event.data.id];
  }

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
