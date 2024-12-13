import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule, Table, TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-crud-table-row-expandida',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  templateUrl: './crud-table-row-expandida.component.html',
  styleUrl: './crud-table-row-expandida.component.scss',
  providers: [AsyncPipe]
})
export class CrudTableRowExpandidaComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() displayedColumnsExpandidas: any[] = [];
  @Input() elementExpanded!: any;
  @Input() captionHeader: string = 'Resultados';
  @Input() mensagemDeEmpty: string = 'Não há registros encontrados';
  @Input() rowsQtd: number = 4;
  @Input() dataKeyTableExpandida: string = 'id';
  @Input() paginatorSempreFlag: boolean = false;
  @Input() scrollavelFlag: boolean = true;
  @Input() posicaoPaginator: 'bottom' | 'top' | 'both' = 'bottom';
  @Input() scrollHeightString: string = 'auto';
  @Input() showResultSummary: boolean = false;
  @Input() lazyFlag: boolean = true;
  @Input() keyElementExpanded!: string;

  resultadoSelecionado!: any;
  selectedResultadosList: any[] = [];
  records: any[] = [];
  expandedRows: Record<string, boolean> = {};

  ngOnInit(): void {
    this.elementExpanded = this.items;
  }
}
