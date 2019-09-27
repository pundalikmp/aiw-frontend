import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "../shared/service/data.service";
import { ProfileAuth, Register } from "../shared/model/data.model";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RegisterDialogComponent } from "../shared/component/register-dialog/register-dialog.component";
import { LoaderService } from "../shared/service/loader.service";
import { LoaderComponent } from "../shared/component/loader/loader.component";
import { DialogComponent } from "../shared/component/dialog/dialog.component";
import {
  GoogleLoginProvider,
  AuthService,
  FacebookLoginProvider,
  SocialUser
} from "angularx-social-login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  vehicles: string[] = [
    "JCB",
    "Tractor",
    "Hitachi",
    "Water tanker",
    "Farm",
    "Dry farm"
  ];
  currentTheme: string = `url('../../assets/resources/JCB.jpg')`;
  loginForm: FormGroup = this.formBuilder.group({
    username: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
    ]
  });
  theme: string = "JCB";
  loginMessage: string;
  user: SocialUser;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dataservice: DataService,
    private readonly dialog: MatDialog,
    private readonly loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(auth => {
      if (auth) {
        sessionStorage.setItem("username", auth.name.replace(/\s/g, "").toLowerCase());
        this.router.navigate(["/dashboard"]);
        this.onSignUp(auth, false);
      }
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(auth => {
      if (auth) {
        sessionStorage.setItem("username", auth.name.replace(/\s/g, "").toLowerCase());
        this.router.navigate(["/dashboard"]);
        this.onSignUp(auth, false);
      }
    });
  }

  signIn(): void {
    const authInput: ProfileAuth = <ProfileAuth>{
      username: this.loginForm.controls["username"].value,
      pass: this.loginForm.controls["password"].value
    };
    this.loaderService.show();
    this.dataservice.checkAuth(authInput).subscribe(
      result => {
        this.loaderService.hide();
        if (result) {
          sessionStorage.setItem(
            "username",
            this.loginForm.controls["username"].value
          );
          this.router.navigate(["/dashboard"]);
        }
      },
      error => {
        this.loginMessage = error.error.message;
        this.loaderService.hide();
      }
    );
  }

  onSkip(): void {
    this.router.navigate(["/dashboard"]);
  }

  onThemeClick(theme: string): void {
    this.theme = theme;
    this.currentTheme = `url('../../assets/resources/${theme}.jpg')`;
  }

  getClass(): string {
    switch (this.theme) {
      case "JCB":
        return "";
        break;
      case "Tractor":
        return "tractor-theme";
        break;
      case "Hitachi":
        return "hitachi-theme";
        break;
      case "Water tanker":
        return "water-tanker-theme";
        break;
      case "Dry farm":
        return "dry-form-theme";
        break;
    }
  }

  getThemeClass(): string {
    if (this.theme === "Dry form") {
      return "dry-form-login-theme";
    } else if (this.theme === "Tractor") {
      return "tractor-login-theme";
    }
  }

  onSignUp(user?: SocialUser, isNew?: boolean): void {
    console.log(user);
    console.log(isNew);
    
    if (!isNew) {
      const userInput: Register = <Register> {
        username: user.name.replace(/\s/g, "").toLowerCase(),
        pass: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      this.loaderService.show();
      this.dataservice.registerUser(userInput).subscribe(
        result => {
          this.loaderService.hide();
        },
        () => {
          this.loaderService.hide();
        }
      );
    } else {
      this.loginForm.reset();
      this.loginMessage = undefined;
      const dialogRef: MatDialogRef<RegisterDialogComponent> = this.dialog.open(
        RegisterDialogComponent,
        {
          data: {},
          panelClass: "register-dialog",
          hasBackdrop: true
        }
      );
  
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.loaderService.show();
          const userInput: Register = <Register>{
            username: data.username,
            pass: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          };
          this.dataservice.registerUser(userInput).subscribe(
            result => {
              this.loaderService.hide();
              this.dialog.open(DialogComponent, {
                data: {
                  message:
                    "Registration successfull. Please login using registered credentials.",
                  status: true
                }
              });
            },
            error => {
              this.loaderService.hide();
              this.dialog.open(DialogComponent, {
                data: {
                  message:
                    "Something went wrong, username already exists, please try other",
                  status: false
                }
              });
            }
          );
        }
      });
    }
  }
}
