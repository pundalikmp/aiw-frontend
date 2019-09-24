import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
  declarations: [ProfileComponent],
  providers: []
})
export class ProfileModule {}
