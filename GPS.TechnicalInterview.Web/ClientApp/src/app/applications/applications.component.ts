import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {

  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status']; 

  constructor() { }
}
