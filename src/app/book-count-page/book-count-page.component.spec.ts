import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCountPageComponent } from './book-count-page.component';

describe('BookCountPageComponent', () => {
  let component: BookCountPageComponent;
  let fixture: ComponentFixture<BookCountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCountPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
