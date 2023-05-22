import { Component, ViewChild,Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { Service } from 'src/app/models/service';
import { ReservationsApiService } from 'src/app/services/api/reservations/reservation-api.service';
import { SearchTableComponent } from '../../search/search-table/search-table.component';
import { SearchResult } from 'src/app/services/api/apiTypes';
import { ApiWithSearch } from 'src/app/services/api/api.service';
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { ChartOptions,ChartDataset } from 'chart.js';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  @ViewChild(SearchTableComponent, { static: false }) searchTable!: SearchTableComponent<Reservation>;



  barColor = 'original';



  public services: Service[] = [];
  public servicesNames: string[] = [];
  public reservations: Reservation[] = [];
  constructor(
    public reservationsApiService: ReservationsApiService ,
    private route: ActivatedRoute,


  ){
    this.searchFunctionService = reservationsApiService;
    
    
  }

  public barChartOptionsOne = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Cantidad de Servicios'
        }
      }
    }
};


  public barChartOptionsTwo = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Ganancia (COP)'
        }
      }
    }
  };
  
  
  
  
 
  public servicesCount: Map<string, number> = new Map<string, number>();

  public resevationsEarningsCount: Map<string,number> = new Map<string,number>();

  ngOnInit() {
    this.search();
    this.changeChart();
  }

  public currentChart = 'config1';


  currentChartData: ChartDataset[] = [];
  currentChartLabels?: string[];
  currentChartOptions?: ChartOptions;
  currentChartLegend: boolean = false;

  public searchFunctionService!: ApiWithSearch<Reservation>;

  public loading = new BehaviorSubject<boolean>(true);

  public searchResult!: Observable<SearchResult<Reservation>>;

  public searchInput = "";

  public collectionSize = 0;

  public page = 1;

  public validator = true;
  public showreports = false;
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
        const date1 = this.reservations[i].horaInicio;
        const date2 = this.reservations[i].horaFin;
        const date1oBJ = new Date(date1);
        const date2oBJ = new Date(date2);
        const diffInMs =  Number(date2oBJ) - Number(date1oBJ);
        
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const rentRoom = diffInHours*this.reservations[i].priceRoomPerHour;
        const totalEarnings = this.reservations[i].inventario.servicios.reduce((total, service) => total +    rentRoom+ ((service.price ?? 0) * (service.earningsPer ?? 0) / 100), 0);
        this.resevationsEarningsCount.set((this.reservations[i].fecha +"-"+ this.reservations[i].nameClient), totalEarnings);
      }
      this.barChartLabelsOne = Array.from(this.servicesCount.keys());
      this.barChartDataOne = [
      {data: Array.from(this.servicesCount.values()), label: 'Servicio', backgroundColor: 'lightblue'}
      ];

        // SEGUNDO REPORTE
        this.barChartLabelsTwo = Array.from(this.resevationsEarningsCount.keys());
        this.barChartDataTwo = [
        {data: Array.from(this.resevationsEarningsCount.values()), label: 'Reservacion', backgroundColor: 'lightblue'}
        ];
      
    });
  }

  public barChartConfig2 = { 
    data: [ /* data for chart 1 */ ], 
    labels: [ /* labels for chart 1 */ ], 
    options: [ /* options for chart 1 */ ], 
    legend: true
  };
  

  public barChartLabelsOne: string[] | undefined ;
  public barChartTypeOne = 'bar';
  public barChartLegendOne = true;
  public barChartDataOne: ChartDataset<"bar">[] = [
    
  ];

  public barChartLabelsTwo: string[] | undefined ;
  public barChartTypeTwo = 'bar';
  public barChartLegendTwo = true;
  public barChartDataTwo: ChartDataset<"bar">[] = [
    
  ];




  changeChart() {
    this.showreports = this.currentChart === 'config2';
  }



  


}
