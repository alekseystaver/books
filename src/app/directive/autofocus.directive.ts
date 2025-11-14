import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[appAutoFocus]',
    standalone: false

})
export class AutofocusDirective implements AfterViewInit {
    constructor(private el: ElementRef){}

    ngAfterViewInit() {
        if (this.el.nativeElement) {
            this.el.nativeElement.focus();
        }
    }
}