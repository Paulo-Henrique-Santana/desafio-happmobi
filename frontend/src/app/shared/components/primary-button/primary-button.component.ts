import { Component, input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  text = input<string>('Confirmar');
  loadingText = input<string>('Carregando...');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  type = input<'submit' | 'button'>('submit');
}
