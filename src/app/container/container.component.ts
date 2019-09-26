import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
    this.router.navigate(['/dashboard']);
  }

  onLogout(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  onDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  onProfile(): void {
    this.router.navigate(['about']);
  }

  onPayment(): void {
    this.router.navigate(['payment']);
  }

}
