import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideRouter } from '@angular/router';
import { Database } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([]), { provide: Database, useValue: {} }, { provide: Auth, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should start expanded', () => expect(component.expanded).toBeTrue());
  it('should toggle expansion', () => {
    component.toggleExpand();
    expect(component.expanded).toBeFalse();
    component.toggleExpand();
    expect(component.expanded).toBeTrue();
  });
});
