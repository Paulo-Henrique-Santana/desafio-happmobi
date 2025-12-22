import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.scss',
})
export class PhotoUploadComponent {
  photoPreview = input<string | null>(null);
  rounded = input<boolean>(false);
  readonly = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium');
  fileSelected = output<Event>();

  onFileSelected(event: Event) {
    this.fileSelected.emit(event);
  }
}
