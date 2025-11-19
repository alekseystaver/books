import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss'],
  standalone: false
})
export class BookReaderComponent implements OnInit, AfterViewInit {

  @ViewChild('pageCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  protected bookId!: number;
  protected pageIndex: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = Number(params.get('id'));
      this.pageIndex = Number(params.get('pageIndex'));
    });
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

  protected goBack(): void {
    this.router.navigate(['/books', this.bookId]);
  }
}