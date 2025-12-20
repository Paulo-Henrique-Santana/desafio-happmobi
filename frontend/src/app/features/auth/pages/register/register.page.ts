import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from '../../../../core/services/user/user.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { LogoHeaderComponent } from '../../../../shared/components/logo-header/logo-header.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { CreateUserRequest } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LogoHeaderComponent,
    PrimaryButtonComponent,
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
    { validators: [this.passwordMatchValidator] }
  );

  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  photoPreview: string | null = null;

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

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
