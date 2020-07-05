import { Directive, Input, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({selector:'[appDropdown]'})

export class DropdownDirective 
{
    @HostBinding('class.open') isOpen=false;

    @HostListener('click') toggleDropdown()
    {
        this.isOpen=!this.isOpen;
    }


}