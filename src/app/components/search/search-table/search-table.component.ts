import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiWithSearch } from "src/app/services/api/api.service";
import { SearchResult } from "src/app/services/api/apiTypes";

@Component({
    selector: "app-search-table",
    templateUrl: "./search-table.component.html",
    styleUrls: ["./search-table.component.sass"],
})
export class SearchTableComponent<T> implements OnInit {
    @Input() searchFunctionService!: ApiWithSearch<T>;
    @Input() shouldChangeValidator: boolean = false; // Nueva propiedad de entrada

    public loading = new BehaviorSubject<boolean>(true);

    public searchResult!: Observable<SearchResult<T>>;

    public searchInput = "";

    public collectionSize = 0;

    public page = 1;

    public validator = false;

    constructor() {}

    ngOnInit() {
        if (this.shouldChangeValidator) {
            this.changueValueValidator();
        }
        this.search();
    }
    public  changueValueValidator(){
        
        this.validator = true;
    }

    public search() {
        this.loading.next(true);

        this.searchResult = this.searchFunctionService.search(
            this.searchInput,
            // This has to be done so the pagination starts at 0.
            this.page - 1,
            10,
            this.validator
            
        );

        this.searchResult.subscribe((searchResult: SearchResult<T>) => {
            this.collectionSize = searchResult.searchCount;
            this.loading.next(false);
            this.validator = searchResult.validator;
        });
    }
}
