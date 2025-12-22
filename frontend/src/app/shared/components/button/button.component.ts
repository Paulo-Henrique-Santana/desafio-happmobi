import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  text = input<string>('Confirmar');
  loadingText = input<string>('Carregando...');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  type = input<'submit' | 'button'>('submit');
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  clicked = output<void>();
}
