import {Component, OnInit, ViewChild} from '@angular/core';
import {User, UserService} from '../services/user.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  columnDefs = [
    {headerName: 'Login', field: 'login', width: 120, hide: false, checkboxSelection: true},
    {headerName: 'Imie', field: 'imie', width: 120, hide: false },
    {headerName: 'Nazwisko', field: 'nazwisko', width: 150, hide: false},
    {headerName: 'Email', field: 'email', width: 250, hide: false},
    {headerName: 'Data urodzenia', field: 'data_ur', width: 150, hide: false },
    {headerName: 'Płeć', field: 'plec', width: 50, hide: false},
    {headerName: 'Data rejestracji', field: 'data_rej', width: 150, hide: false },
    {headerName: 'Ostatnio zalogowany', field: 'data_ost', width: 200, hide: false },
    {headerName: 'Administrator', field: 'admin', width: 150, hide: false}
  ];
  rowData: any;
  private gridApi;
  selectedId = 0;

  rowSelection = 'single';

  ngOnInit() {
    this.getUsersInfo();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }


  getUsersInfo() {
    this.rowData = this.userService.getUsersInfo();
  }

  onSelectionChanged() {
    let id = 0;
    this.gridApi.getSelectedRows().forEach( function(selectedRow, index) {
      id = selectedRow.id_uzyt;
    });
    this.selectedId = id;
  }

  delete() {
    console.log(this.selectedId);
    this.userService.delete(this.selectedId);
  }

  makeAdmin() {
    this.userService.makeAdmin(this.selectedId);
  }
}
