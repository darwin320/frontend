import { Component, ViewChild,Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { Service } from 'src/app/models/service';
import { ReservationsApiService } from 'src/app/services/api/reservations/reservation-api.service';
import { SearchTableComponent } from '../../search/search-table/search-table.component';
import { SearchResult } from 'src/app/services/api/apiTypes';
import { ApiWithSearch } from 'src/app/services/api/api.service';
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  @ViewChild(SearchTableComponent, { static: false }) searchTable!: SearchTableComponent<Reservation>;

  public services: Service[] = [];
  public servicesNames: string[] = [];
  public reservations: Reservation[] = [];
  constructor(
    public reservationsApiService: ReservationsApiService ,
    private route: ActivatedRoute,


  ){
    this.searchFunctionService = reservationsApiService;
    
    
  }

  public barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };
  
  
  
  public barChartLabels: string[] | undefined ;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81], label: 'Servicio'},
  ];

  public servicesCount: Map<string, number> = new Map<string, number>();


  ngOnInit() {
    this.search();
  }

  public searchFunctionService!: ApiWithSearch<Reservation>;

  public loading = new BehaviorSubject<boolean>(true);

  public searchResult!: Observable<SearchResult<Reservation>>;

  public searchInput = "";

  public collectionSize = 0;

  public page = 1;

  public validator = true;

  public  search() {
    this.searchResult = this.searchFunctionService.search(
        this.searchInput,
        // This has to be done so the pagination starts at 0.
        this.page - 1,
        10,
        this.validator
        
    );

    
    this.searchResult.subscribe(async (searchResult: SearchResult<Reservation>) => {
        this.collectionSize = searchResult.searchCount;
        this.validator = searchResult.validator;
        this.reservations = searchResult.search;   
        for (let i = 0; i < this.reservations.length; i++) {   
          const result =  await this.reservationsApiService.getReservation(this.reservations[i].id);
          if (result.ok) {
            this.reservations[i] = result.val;
            for (let j = 0; j < this.reservations[i].inventario.servicios?.length; j++) {
              this.services.push(this.reservations[i].inventario.servicios[j]);
              this.servicesNames.push(this.reservations[i].inventario.servicios[j].nameService);
              const serviceName = this.reservations[i].inventario.servicios[j].nameService;
              this.servicesCount.set(serviceName, (this.servicesCount.get(serviceName) || 0) + 1);
            }
          }
        
      }
      this.barChartLabels = Array.from(this.servicesCount.keys());
      this.barChartData = [
      {data: Array.from(this.servicesCount.values()), label: 'Servicio'}
      ];

      
    });
  }




}
