import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/component/dialog/dialog.component";
import {
  DialogData,
  Order,
  User,
  Address
} from "src/app/shared/model/data.model";
import { DataService } from "src/app/shared/service/data.service";
import { LoaderService } from "src/app/shared/service/loader.service";

@Component({
  selector: "app-book-vehicle",
  templateUrl: "./book-vehicle.component.html",
  styleUrls: ["./book-vehicle.component.scss"]
})
export class BookVehicleComponent implements OnInit {
  vehicles: string[] = ["JCB", "Tractor", "Hitachi", "Water tanker"];
  vehicleForm: FormGroup = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    mobile: ["", Validators.required],
    email: [""],
    address: ["", Validators.required],
    vehicle: ["", Validators.required],
    price: [""],
    date: ["", Validators.required],
    description: [""],
    decl: ["", Validators.required],
    tankerType: ["1000"]
  });

  minDate: Date = new Date();

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.vehicleForm.controls["price"].disable();
  }

  onVehicleSelection(selection: MatSelectChange): void {
    switch (selection.value) {
      case "JCB":
        this.vehicleForm.controls["price"].setValue("750");
        break;
      case "Tractor":
        this.vehicleForm.controls["price"].setValue("450");
        break;
      case "Hitachi":
        this.vehicleForm.controls["price"].setValue("1200");
        break;
      case "Water tanker":
        this.vehicleForm.controls["price"].setValue(
          this.vehicleForm.controls["tankerType"].value
        );
    }
  }

  onTypeChange(): void {
    this.vehicleForm.controls["price"].setValue(
      this.vehicleForm.controls["tankerType"].value
    );
  }

  onBook(): void {
    const username = sessionStorage.getItem("username");
    const orderInput: Order = <Order>{
      username: username,
      user: <User>{
        firstName: this.vehicleForm.controls["firstName"].value,
        lastName: this.vehicleForm.controls["lastName"].value,
        mobile: this.vehicleForm.value.mobile,
        email: this.vehicleForm.value.email
      },
      address: this.vehicleForm.value.address,
      vehicle: this.vehicleForm.value.vehicle,
      price: this.vehicleForm.controls["price"].value,
      desc: this.vehicleForm.controls["description"].value,
      date: this.vehicleForm.value.date
    };
    this.loaderService.show();
    this.dataService.orderVehicle(orderInput).subscribe(
      result => {
        this.loaderService.hide();
        if (result) {
          const dialogData: DialogData = <DialogData>{
            message:
              "Thanks for choosing AIW. Your booking has confirmed, you will recieve an email shortly.",
            status: true
          };
          this.dialog.open(DialogComponent, {
            data: dialogData,
            panelClass: "book-vehicle-dialog"
          });
          this.vehicleForm.reset();
        }
      },
      () => {
        this.loaderService.hide();
        const dialogData: DialogData = <DialogData>{
          message: "Something went wrong, please try after sometime.",
          status: false
        };
        this.dialog.open(DialogComponent, {
          data: dialogData,
          panelClass: "book-vehicle-dialog"
        });
      }
    );
  }
}
