import { Component, ViewChild } from '@angular/core';
import { MatCardModule, } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BikeService } from '../services/bike.service';
import { HeaderComponent } from '../header/header.component';
import { FilterComponent } from '../filter/filter.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatPaginatorModule, HeaderComponent, FilterComponent, CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  obs: any;
  @ViewChild(MatPaginator, { static: false }) paginator: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public stolenCount?: number;
  public bikeList: any = [];
  tempList: any;

  constructor(private bikeService: BikeService, public loader: LoaderService) { }

  ngOnInit() {

  }

  getBikeList(formData: any) {
    this.loader.setLoading(true);
    this.getCount(formData);
    this.bikeService.getBikeList(formData?.location, formData?.distance)
      .subscribe({
        next: (res: any) => {
          console.log(res.bikes);
          this.bikeList = res.bikes;
          this.dataSource = new MatTableDataSource<any>(this.bikeList);
          this.obs = this.dataSource.connect();
          this.obs.subscribe((i: any) => {
            this.tempList = i;
          });
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          //todo
        },
        complete: ()=>{
          this.loader.setLoading(false);
        }
      });
  }

  getCount(formData: any) {
    this.bikeService.stolenCount(formData?.location, formData?.distance)
      .subscribe({
        next: (res: any) => {
          this.stolenCount = res.proximity;
        }
      })
  }

  getFilterList(formData: any) {
    if (formData.title && !formData.startDate) {
      this.dataSource = new MatTableDataSource<any>(
        this.bikeList.filter((item: any, index: number) =>
          item.title.toLowerCase().includes(formData.title.toLowerCase())));
    } else if (formData.title && formData.startDate) {
      const startDate = new Date(formData.startDate);
      const startTimestamp = startDate.getTime();
      const endDate = new Date(formData.endDate);
      const endTimestamp = endDate.getTime();
      this.dataSource = new MatTableDataSource<any>(
        this.bikeList.filter((item: any, index: number) => {
          return (startTimestamp <= (item.date_stolen * 1000) && endTimestamp >= (item.date_stolen * 1000) &&
            item.title.toLowerCase().includes(formData.title.toLowerCase()))
        }));
    } else {
      this.dataSource = new MatTableDataSource<any>(this.bikeList);
    }
    this.obs = this.dataSource.connect();
    this.obs.subscribe((i: any) => {
      this.tempList = i;
    });
    this.stolenCount = this.tempList?.length;
    this.dataSource.paginator = this.paginator;
  }

}
