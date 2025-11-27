import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, search: string, color: string = 'orange'): SafeHtml {
    if (!value || !search) {
      return value;
    }
    const highlightedText = value.replace(new RegExp(search, 'gi'), `<mark style="background-color: ${color};">$&</mark>`);

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}