import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/service/data.service";
import {
  Profile,
  DialogData,
  Register,
  RegisterPayload
} from "../shared/model/data.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DialogComponent } from "../shared/component/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { LoaderService } from "../shared/service/loader.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  profile: Register;
  profileForm: FormGroup = this.formBuilder.group({
    username: [{ value: "", disabled: true }],
    firstname: [{ value: "", disabled: true }],
    lastname: [{ value: "", disabled: true }],
    mobile: ["", Validators.required],
    email: [{ value: "", disabled: true }],
    address: ["", Validators.required]
  });
  isChange: boolean = false;
  file: File;
  imageSrc: any = "";
  base64data: any;
  b64: any;

  constructor(
    private readonly dataService: DataService,
    private formBuilder: FormBuilder,
    private readonly router: Router,
    public dialog: MatDialog,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
        const dialogData: DialogData = <DialogData>{
          message: "Something went wrong, please try to login again.",
          status: false
        };
        this.dialog.open(DialogComponent, {
          data: dialogData,
          panelClass: "book-vehicle-dialog"
        });
    } else {
      this.loaderService.show();
      this.dataService.fetchProfile().subscribe(
        (response: RegisterPayload) => {
          this.loaderService.hide();
          if (response) {
            this.profile = response.profile[0];
            this.download();
            this.mapProfile(this.profile);
          }
        },
        () => {
          this.loaderService.hide();
        }
      );
    }
  }

  mapProfile(profile: Register): void {
    this.profileForm.setValue({
      username: profile!.username,
      firstname: profile!.firstName,
      lastname: profile!.lastName,
      mobile: profile.mobile,
      email: profile!.email,
      address: profile.address
    });
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }

  onAvatarChange(): void {
    this.isChange = !this.isChange;
  }

  onUpload(): void {
    const uploadData = new FormData();
    uploadData.append("avatar", this.file, this.file.name);
    uploadData.append("username", sessionStorage.getItem("username"));
    this.loaderService.show();
    this.dataService.uploadAvatar(uploadData).subscribe(
      result => {
        this.loaderService.hide();
        this.isChange = !this.isChange;
        if (result.avatar) {
          this.imageSrc = result.avatar;
          this.loaderService.setAvatar(this.imageSrc);
      }
        if (result) {
          const dialogData: DialogData = <DialogData>{
            message: "Profile pic uploaded successfully.",
            status: true
          };
          this.dialog.open(DialogComponent, {
            data: dialogData,
            panelClass: "book-vehicle-dialog"
          });
        } else {
          const dialogData: DialogData = <DialogData>{
            message: "Something went wrong, please try after sometime.",
            status: false
          };
          this.dialog.open(DialogComponent, {
            data: dialogData,
            panelClass: "book-vehicle-dialog"
          });
        }
      },
      error => {
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

  download(): void {
    this.loaderService.show();
    this.loaderService.avatarState.subscribe(
      data => {
        this.loaderService.hide();
        if (data) {
          this.imageSrc = data;
        }
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  updateProfile(): void {
    const input: Register = <Register>{
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      username: this.profile.username,
      mobile: this.profileForm.controls["mobile"].value,
      email: this.profile.firstName,
      address: this.profileForm.controls["address"].value
    };

    this.loaderService.show();
    this.dataService.registerUser(input).subscribe(result => {
      this.loaderService.hide();
      this.profileForm.setValue({
        mobile: input.mobile,
        address: input.address
      });
    }, () => {
      this.loaderService.hide();
    });
  }
}
