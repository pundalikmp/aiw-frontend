import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { SharedModule } from '../shared/shared.module';
import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule
  ]
})
export class FeedbackModule { }
