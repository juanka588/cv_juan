import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollRevealDirective, StaggerRevealDirective } from './scroll-reveal.directive';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: '<div appScrollReveal>Test</div>',
})
class TestScrollComponent {}

@Component({
  standalone: true,
  imports: [StaggerRevealDirective],
  template: '<div appStaggerReveal><div class="stagger-item">A</div><div class="stagger-item">B</div></div>',
})
class TestStaggerComponent {}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<TestScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestScrollComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestScrollComponent);
    fixture.detectChanges();
  });

  it('should add scroll-reveal class', () => {
    const el = fixture.nativeElement.querySelector('[appScrollReveal]');
    expect(el.classList.contains('scroll-reveal')).toBeTrue();
  });
});

describe('StaggerRevealDirective', () => {
  let fixture: ComponentFixture<TestStaggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStaggerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestStaggerComponent);
    fixture.detectChanges();
  });

  it('should find stagger items', () => {
    const items = fixture.nativeElement.querySelectorAll('.stagger-item');
    expect(items.length).toBe(2);
  });
});
