import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "../layout/layout.component";
import { DrawerComponent } from '../drawer/drawer.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DataService } from './service/data.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DialogComponent } from './component/dialog/dialog.component';
import {MatTableModule} from '@angular/material/table';
import { RegisterDialogComponent } from './component/register-dialog/register-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { LoaderComponent } from './component/loader/loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const MATERIAL_MODULES: any = [
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatTabsModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressBarModule
];

const LAYOUT_MODULES: any = [FlexLayoutModule];

const FORMS_MODULES: any = [FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [CommonModule, MATERIAL_MODULES, LAYOUT_MODULES, FORMS_MODULES],
  declarations: [LayoutComponent, DrawerComponent, DialogComponent, RegisterDialogComponent, LoaderComponent],
  providers: [DataService, MatDatepickerModule],
  entryComponents: [DialogComponent, RegisterDialogComponent],
  exports: [MATERIAL_MODULES, LAYOUT_MODULES, FORMS_MODULES, LayoutComponent, DrawerComponent]
})
export class SharedModule {}
