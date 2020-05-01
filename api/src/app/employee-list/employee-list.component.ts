import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  template: `
    <div class="empList" >
      <h1>Employee List Component</h1>
      <ul *ngFor="let employee of employees">
        <li>Name: {{employee.name}}</li>
      </ul>
    </div>
  `,
  styles:['.empList{background: green; padding: 40px;}']
})
export class EmployeeListComponent implements OnInit {

  public employees = [];
  //instance hozzaadasa
  // tslint:disable-next-line:variable-name
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._employeeService.getEmployees()
      .subscribe(data => this.employees = data);
  }

}
