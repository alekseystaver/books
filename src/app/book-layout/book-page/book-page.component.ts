import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, AfterViewInit, inject, computed, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadBooks } from '../../store/book.actions';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class BookPageComponent implements AfterViewInit {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('pageCanvas');

  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  
  private readonly params = toSignal(this.route.paramMap);
  
  protected bookId = computed(() => Number(this.params()?.get('id') ?? 0));
  protected pageIndex = computed(() => Number(this.params()?.get('pageIndex') ?? 0));

  public ngAfterViewInit(): void {
    this.drawPageLines();
  }

  private drawPageLines(): void {
    if (!this.canvasRef()|| !this.canvasRef().nativeElement) {
      console.error('Canvas element not found!');
      return;
    }

    const canvas = this.canvasRef().nativeElement;
    const context = canvas.getContext('2d'); 

    if (context) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const width = canvas.width;
      const height = canvas.height;
      const cellSize = 20;

      context.clearRect(0, 0, width, height);
      context.beginPath();

      context.strokeStyle = '#cccccc';
      context.lineWidth = 1;

      for (let y = 0; y <= height; y += cellSize) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }

      for (let x = 0; x <= width; x += cellSize) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }

      context.stroke();
    }
  }
}