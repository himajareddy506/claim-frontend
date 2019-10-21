import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{

  @Input('settings')
	settings : Array<Object> = [];
  @Input('data')
  data:  Array<Object> = [];
  @Output() rowData = new EventEmitter();
  @Input() stockId: number;

  rowClicked=(event)=> {
    console.log(event)
    this.rowData.emit(event);
  }

}
