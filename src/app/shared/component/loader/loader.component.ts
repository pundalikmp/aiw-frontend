import { Component, OnInit } from '@angular/core';
import { LoaderService, LoaderState } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show: Boolean = false;

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit(): void {
    console.log('show', this.show);
    
    this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }

}