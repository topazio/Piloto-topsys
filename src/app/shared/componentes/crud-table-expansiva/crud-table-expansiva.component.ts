import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CrudTableRowExpandidaComponent } from './crud-table-row-expandida/crud-table-row-expandida.component';
import { IContrato } from '../../../_dash-home/contratos/model/contrato';
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
export class CrudTableExpansivaComponent implements OnChanges {
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
  @Input() scrollHeightString: string = 'calc(100vh - 30rem)';
  @Input() totalRecords: number = 0;
  @Input() first: number = 0;
  @Input() showResultSummary: boolean = false;
  @Input() resultSummaryMsg: string = 'Exibindo de {first} à {last}, de {totalRecords} resultados';
  @Input() lazyFlag: boolean = true;
  @Input() elementRowKeyExpand: string = '';
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Input() detailRequestMethod: (id: number | string) => Observable<IContrato[]> = () => new Observable<IContrato[]>();
  @Output() detailRequestEmitter: EventEmitter<any> = new EventEmitter();
  resultadoSelecionado!: any;
  selectedResultadosList: any[] = [];
  records: any[] = [];
  expandedRows: Record<number, boolean> = {};
  elementExpanded: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.lazyInitLoad(changes);
  };

  edit(id: number) {
    this.editClick.emit(id);
  };

  delete(id: number) {
    this.deleteClick.emit(id);
  };

  onRowExpand(event: any) {
    if (event) {
      this.expandedRows[event.data.id] = true;
      this.elementDetail(event.data.id);
    }
  };

  onRowCollapse(event: any) {
    delete this.expandedRows[event.data.id];
  };

  protected loadLazy(event: TableLazyLoadEvent) {
    let parameters = {};
    if (event.first !== 0) {
      parameters = {
        page: event.first! / event.rows!,
        size: this.totalRecords
      };
    } else {
      parameters = {
        page: 0,
        size: this.totalRecords
      };
    }
    this.pageChange.emit(parameters);
  };

  private lazyInitLoad(changes: SimpleChanges) {
    if (changes['items'] && this.items.length > 0) {
      this.records = this.items;
    }
  };
  private elementDetail(id: number) {
    if (id) {
      this.detailRequestMethod(id).subscribe((val) => {
        this.elementExpanded = val;
        this.detailRequestEmitter.emit(val);
      });
    }
  };
}
