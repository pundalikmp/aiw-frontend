import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Profile } from "../../model/data.model";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-register-dialog",
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["./register-dialog.component.scss"]
})
export class RegisterDialogComponent implements OnInit {
  registerForm: FormGroup = this.fb.group(
    {
      username: ["", Validators.required],
      firstName: [""],
      lastName: [""],
      password: [
        "",
        [Validators.required, Validators.min(8)]
      ],
      confirmPassword: [
        "",
        [Validators.required, Validators.min(8)]
      ],
      email: [""]
    },
    {
      validator: this.isPasswordMatch
    }
  );

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {}

  register(): void {
    this.dialogRef.close(this.registerForm.value);
  }

  isPasswordMatch(ac: AbstractControl): void {
    const password: string = ac.get("password").value;
    const confirmPassword: string = ac.get("confirmPassword").value;
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        return null;
      } else {
        ac.get("confirmPassword").setErrors({ isPasswordMatch: true });

      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
