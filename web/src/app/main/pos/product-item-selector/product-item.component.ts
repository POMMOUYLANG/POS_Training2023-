/* eslint-disable new-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// ==========================================================>> Core Library
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() data: any = null; //Get Data from Parent
  @Output() result = new EventEmitter;  //Send data to Parent
  public FILE_PUBLIC_BASE_URL: string = env.FILE_PUBLIC_BASE_URL;
  constructor() { }

  ngOnInit(): void {
  }

  onOutput() {
    console.log(this.data);
    this.result.emit(this.data);
  }

}
