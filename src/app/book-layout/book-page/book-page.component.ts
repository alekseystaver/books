import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
  standalone: false
})
export class BookPageComponent implements OnInit, AfterViewInit {

  @ViewChild('pageCanvas') private readonly canvasRef!: ElementRef<HTMLCanvasElement>;
  
  protected bookId!: number;
  protected pageIndex: number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      this.pageIndex = Number(params.get('pageIndex'));
    })
  }

  public ngAfterViewInit(): void {
    this.drawPageLines();
  }

  private drawPageLines(): void {
    if (!this.canvasRef || !this.canvasRef.nativeElement) {
      console.error('Canvas element not found!');
      return;
    }

    const canvas = this.canvasRef.nativeElement;
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