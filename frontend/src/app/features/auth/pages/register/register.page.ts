import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from '../../../../core/services/user/user.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { LogoHeaderComponent } from '../../../../shared/components/logo-header/logo-header.component';
import { CreateUserRequest } from '../../../../shared/models/user.model';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LogoHeaderComponent,
    ButtonComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [passwordMatchValidator()] }
  );

  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  photoPreview: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { confirmPassword, ...userData } = this.registerForm.value;

    userData.photo = this.selectedFile;

    this.createUser(userData);
  }

  createUser(userData: CreateUserRequest) {
    this.userService
      .create(userData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
