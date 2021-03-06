import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/service/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isOpen: boolean = true;
  avatarUrl: string;

  constructor(private readonly router: Router,
    private readonly loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.show();
    this.loaderService.avatarState.subscribe(avatar => {
      this.loaderService.hide();
      if (avatar) {
        this.avatarUrl = avatar;
      }
    }, () => {
      this.loaderService.hide();
    })
  }

  toggleSidenav(): void {
    this.isOpen = !this.isOpen;
  }

  onProfile(): void {
    this.router.navigate(['/profile']);
  }

}
