import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../shared/service/loader.service';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly loaderService: LoaderService,
    private readonly dataService: DataService) { }

  ngOnInit() {
    this.loaderService.show();
    this.dataService.downloadAvatar().subscribe(
      data => {
        this.loaderService.hide();
        if (data!.data[0] && data!.data[0]!.avatar) {
          this.loaderService.setAvatar(data.data[0].avatar);
        }
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

}
