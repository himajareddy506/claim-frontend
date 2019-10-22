import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
/**
 * Table Reusable Component
 */
export class TableComponent {
  /**
   * settings 
   *  
   */
  @Input('settings')
  settings: Array<Object> = [];
  @Input() data: Array<Object> = [];
  @Output() rowData = new EventEmitter();
  @Input() claimId: number;

  /**
   * Row Click function to emit an event
   * @param {Event} event - Event to emit rowData
   */
  rowClicked = (event: Event) => {
    this.rowData.emit(event);

  }

}
