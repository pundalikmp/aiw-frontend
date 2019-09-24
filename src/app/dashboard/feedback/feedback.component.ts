import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackInput, DialogData } from 'src/app/shared/model/data.model';
import { DataService } from 'src/app/shared/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  vehicles: string[] = ['JCB', 'Tractor', 'Hitachi', 'Water tanker'];
  feedback: string[] = ['Best', 'Good', 'Ok', 'Bad'];
  feedbackForm: FormGroup = this.fb.group({
    vehicle: ['', Validators.required],
    vehicleFeedback: ['', Validators.required],
    driverFeedback: [''],
    appFeedback: ['', Validators.required],
    description: [''],
  });

  constructor(public fb: FormBuilder,
    private readonly dataService: DataService,
    public dialog: MatDialog,
    private readonly loaderService: LoaderService
    ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const form = this.feedbackForm.value;
    const feedbackInput: FeedbackInput = <FeedbackInput> {
      username: sessionStorage.getItem('username'),
      vehicle: form.vehicle,
      vehicleFeedback: form.vehicleFeedback,
      driverFeedback: form.driverFeedback,
      appFeedback: form.appFeedback,
      desc: form.description,
    }
    this.loaderService.show();
    this.dataService.postFeedback(feedbackInput).subscribe(response => {
    this.loaderService.hide();
    if (response) {
        const dialogData: DialogData = <DialogData>{
          message: 'Thanks for your valuable feedback',
          status: true
        }
        this.getDialog(dialogData);
        this.feedbackForm.reset();
      } else {
        this.getDialog();
      }
    }, () => {
    this.loaderService.hide();
    this.getDialog();
    });
  }

  getDialog(data?: DialogData): void {
    const dialogData: DialogData = <DialogData>{
      message: 'Something went wrong, please try after sometime.',
      status: false
    }
    this.dialog.open(DialogComponent, {
      data: data || dialogData,
      panelClass: 'book-vehicle-dialog'
    });
  }
}
