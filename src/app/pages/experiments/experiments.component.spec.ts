import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperimentsComponent } from './experiments.component';
import { provideRouter } from '@angular/router';

describe('ExperimentsComponent', () => {
  let component: ExperimentsComponent;
  let fixture: ComponentFixture<ExperimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 experiments', () => {
    expect(component.experiments.length).toBe(2);
  });

  it('should have Primes as first experiment', () => {
    expect(component.experiments[0].name).toBe('Primes');
  });
});
