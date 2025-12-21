import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { UpdateUserRequest, User } from '../../../../shared/models/user.model';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimaryButtonComponent,
    ErrorMessageComponent,
    NavigationComponent,
  ],
  templateUrl: './edit-profile.page.html',
  styleUrl: './edit-profile.page.scss',
})
export class EditProfilePage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  user: User | null = null;

  editForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
    },
    { validators: [passwordMatchValidator()] }
  );

  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  photoPreview: string | null = null;

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) {
      this.editForm.patchValue({
        name: this.user.name,
        email: this.user.email,
      });
      this.photoPreview = this.user.photo;
    }
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
    if (this.editForm.invalid || !this.user) return;

    this.isLoading = true;
    this.errorMessage = '';

    const updateData: UpdateUserRequest = {
      name: this.editForm.value.name,
      email: this.editForm.value.email,
    };

    if (this.editForm.value.password) {
      updateData.password = this.editForm.value.password;
    }

    if (this.selectedFile) {
      updateData.photo = this.selectedFile;
    }

    this.updateUser(this.user.id, updateData);
  }

  updateUser(id: string, updateData: UpdateUserRequest) {
    this.userService
      .update(id, updateData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (updatedUser) => {
          this.authService.updateUser(updatedUser);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message;
        },
      });
  }
}
