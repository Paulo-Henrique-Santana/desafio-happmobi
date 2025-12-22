import { Component, input, output } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-form-card-layout',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './form-card-layout.component.html',
  styleUrl: './form-card-layout.component.scss',
})
export class FormCardLayoutComponent {
  pageTitle = input.required<string>();
  onBack = output<void>();

  handleBack() {
    this.onBack.emit();
  }
}
