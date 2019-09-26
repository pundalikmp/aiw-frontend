import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Vehicle {
  name: string;
  price: number;
}

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  vehicles: Vehicle[] = [
    { name: "JCB", price: 750 },
    { name: "Hitachi", price: 1200 },
    { name: "Tractor", price: 450 },
    { name: "Water tanker", price: 1000 }
  ];

  paymentForm: FormGroup = this.fb.group({
    vehicle: ["", Validators.required],
    time: ["", Validators.required],
    totalAmount: [{ value: 0, disabled: true }]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  calAmount(): void {
    const form = this.paymentForm.value;
    switch (form.vehicle) {
      case this.vehicles[0].name:
        this.paymentForm.controls["totalAmount"].setValue(
          this.vehicles[0].price * form.time
        );
        break;
      case this.vehicles[1].name:
        this.paymentForm.controls["totalAmount"].setValue(
          this.vehicles[1].price * form.time
        );
        break;
      case this.vehicles[2].name:
        this.paymentForm.controls["totalAmount"].setValue(
          this.vehicles[2].price * form.time
        );
        break;
      case this.vehicles[3].name:
        this.paymentForm.controls["totalAmount"].setValue(
          this.vehicles[3].price * form.time
        );
        break;
    }
  }

  onPayment(): void {
    console.log("This feature will come soon");
  }

  onRefresh(): void {
    this.paymentForm.reset();
  }
}
