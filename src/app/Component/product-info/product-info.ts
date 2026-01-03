import { Component, inject } from '@angular/core';
import { Footer } from "../footer/footer";
import { Location } from "@angular/common";

@Component({
  selector: 'app-product-info',
  imports: [Footer],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  private location = inject(Location);
  mode: any;

  constructor() {
    this.mode = this.location.getState();
  }

}
