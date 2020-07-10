import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatSort, { static : false }) sort: MatSort;
  @ViewChild(MatPaginator, { static : false }) paginator: MatPaginator;
  @ViewChild(ElementRef) filterBox : HTMLInputElement;

  @Input('tableData') tableData;
  @Input('columnHeader') columnHeader;
  @Input('actionName') actionName;
  @Input('actionLinkPrefix') actionLinkPrefix;

  objectKeys = Object.keys;
  objectAssign = Object.assign;

  dataSource;
  selectedColumn = '';
  filterValue = '';
  
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      if(this.selectedColumn !== '' && this.selectedColumn !== undefined)
        return data[this.selectedColumn].toLowerCase().includes(filter);
      else
        return JSON.stringify(data).toLowerCase().includes(filter);
    };
  }

  get displayColumns() {
    if(!this.actionLinkPrefix) 
      return this.objectKeys(this.columnHeader);
    return this.objectKeys( {...this.columnHeader, 'actions' : ''} );
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target !== undefined) ? (event.target as HTMLInputElement).value : this.filterValue;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
