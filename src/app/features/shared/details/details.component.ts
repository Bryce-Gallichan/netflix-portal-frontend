import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Show } from 'src/app/core/models/show.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() showData!: Show;
  @Input() allowDelete: boolean = false;
  @Output() deleteEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
}
