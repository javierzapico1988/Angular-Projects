import {
    Component, Output, OnInit, EventEmitter
}
from '@angular/core';

@Component({ selector:'app-header', templateUrl:'header.component.html', styles:['header.component.css'] } ) export class HeaderComponent implements OnInit {
    ngOnInit(): void {
        this.pageChanged.emit('Recipes')
    }
    @Output() pageChanged: EventEmitter<string> = new EventEmitter();
    public collapszed=true;


    public setCurrentPage(selectedPage:string) {
        this.pageChanged.emit(selectedPage)
    }
}
