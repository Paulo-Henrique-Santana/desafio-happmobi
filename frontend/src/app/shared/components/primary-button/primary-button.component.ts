import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  @Input() text: string = 'Confirmar';
  @Input() loadingText: string = 'Carregando...';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'submit' | 'button' = 'submit';
}
