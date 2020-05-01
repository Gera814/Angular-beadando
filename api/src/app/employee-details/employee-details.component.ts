import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-details',
  template: `
    <div class="empDetail" >
      <h1 (click)="write()">Employee Details Component</h1>
      <ul *ngFor="let employee of employees">
        <li>Status: {{employee.status}} - Nickname: {{employee.nickname}}</li>
      </ul>
    </div>
  `,
  styles:['.empDetail{background: grey; padding: 40px;}']
})
export class EmployeeDetailsComponent implements OnInit {
  public employees = [];
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._employeeService.getEmployees()
      .subscribe(data => this.employees = data);
  }
  write(): void {
    console.log(this.employees);
  }

}
