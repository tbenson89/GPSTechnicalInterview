import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../shared/material.module';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateApplicationComponent } from './create-application.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateApplicationComponent', () => {
  let component: CreateApplicationComponent;
  let fixture: ComponentFixture<CreateApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateApplicationComponent ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApplicationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from subscriptions on component destroy', () => {
    // Initialize the component
    fixture.detectChanges();

    // Trigger actions that result in subscriptions
    component.submitApplication();
    component.submitApplication(); // Simulate multiple subscriptions

    // Invoke the ngOnDestroy method
    component.ngOnDestroy();

    // Assertions
    expect(component.currentApplication).toBeUndefined(); // Assuming 'currentApplication' is set to null after unsubscribing
  });
});
