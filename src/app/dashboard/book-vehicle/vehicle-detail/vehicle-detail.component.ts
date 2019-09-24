import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Address } from "../../../shared/model/data.model";
import { DataService } from "../../../shared/service/data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { LoaderService } from "src/app/shared/service/loader.service";

export interface OrderTable {
  name: string;
  mobile: number;
  address: Address;
  vehicle: string;
  date: Date;
  description: string;
}

@Component({
  selector: "app-vehicle-detail",
  templateUrl: "./vehicle-detail.component.html",
  styleUrls: ["./vehicle-detail.component.scss"]
})
export class VehicleDetailComponent implements OnInit {
  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild("sort") sort: MatSort;
  displayedColumns: string[] = [
    "name",
    "mobile",
    "address",
    "vehicle",
    "date",
    "description"
  ];
  dataSource: MatTableDataSource<OrderTable>;
  isDataAvailable: boolean = false;
  orderData: OrderTable[] = [];

  constructor(
    private readonly dataService: DataService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.paginator.pageSizeOptions = [5, 10, 20, 100];
    this.paginator.pageSize = 5;
    this.fetchOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchOrders(): void {
    this.loaderService.show();
    this.dataService.fetchOrder().subscribe(
      result => {
        this.loaderService.hide();
        if (result) {
          this.isDataAvailable = true;
          result.forEach(v => {
            const data: OrderTable = <OrderTable>{
              name: v!.user!.firstName + " " + v!.user!.lastName,
              mobile: v!.user!.mobile,
              address: v!.address,
              vehicle: v!.vehicle + "-" + v!.price,
              date: v!.date,
              description: v!.desc
            };
            this.orderData.push(data);
          });

          this.dataSource.data = this.orderData;
        } else {
          this.isDataAvailable = false;
        }
      },
      error => {
        this.loaderService.hide();
        this.isDataAvailable = false;
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
