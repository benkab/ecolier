import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls : ['search.component.css']
})
export class SearchComponent implements OnInit{

    private class : String;

    ngOnInit(){
        this.class = "";
    }

    onSearch(search){
        this.class = "seach-keyup";
    }

}