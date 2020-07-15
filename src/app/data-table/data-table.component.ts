import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

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
  @Input('filterFields') filterFields;
  @Input('actionName') actionName;
  @Input('actionLinkPrefix') actionLinkPrefix;
  @Input('showDropDownFilter') showDropDownFilter;
  @Input('dropdownOptions') dropdownOptions;
  @Input('ddFilterColumn') ddFilterColumn;

  objectKeys = Object.keys;
  objectAssign = Object.assign;

  dataSource;
  selectedColumn = '';
  filterValue = '';

  ddFilter;
  filterSelected;
  
  constructor() { 
    this.ddFilter = new FormControl();
  }

  ngOnInit(): void {
    if(this.filterFields === null || this.filterFields === undefined)
      this.filterFields = this.columnHeader;
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;    
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      // Case 1 : Column is selected
      if(this.selectedColumn !== '' && this.selectedColumn !== undefined) {
        // Case 1.1 : Selected column value is an object
        if(typeof data[this.selectedColumn] === 'object') {
          //Case 1.1.1 : Dropdown is selected
          if(this.ddFilter.value) {
            return JSON.stringify(data[this.selectedColumn]).toLowerCase().includes(filter) || data[this.ddFilterColumn].includes(this.ddFilter.value);
          }
          //Case 1.1.2 : Dropdown is null
          else {
            return JSON.stringify(data[this.selectedColumn]).toLowerCase().includes(filter);
          }
        }
        // Case 1.2 : Selected column value is primitive
        else {
          //Case 1.2.1 : Dropdown is selected
          if(this.ddFilter.value) {
            return data[this.selectedColumn].toString().toLowerCase().includes(filter) || data[this.ddFilterColumn].includes(this.ddFilter.value);
          }
          //Case 1.2.2 : Dropdown is null
          else {
            return data[this.selectedColumn].toString().toLowerCase().includes(filter);
          }
        }
      }
      // Case 2 : Column is not selected
      else {
        //Case 2.1 : Dropdown is selected
        if(this.ddFilter.value) {
          return JSON.stringify(data).toLowerCase().includes(filter) || data[this.ddFilterColumn].includes(this.ddFilter.value);
        }
        //Case 2.2 : Dropdown is null
        else {
          return JSON.stringify(data).toLowerCase().includes(filter);
        }
      }
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
    if(!this.filterValue && this.ddFilter.value)
      this.dataSource.filter = this.ddFilter.value;
  }
}
