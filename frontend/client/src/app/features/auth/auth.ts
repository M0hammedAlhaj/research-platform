import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { UserTypeCardComponent, UserType } from '../../shared/user-type-card/user-type-card';
import { AuthFormComponent, FormConfig } from '../../shared/auth-form/auth-form';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest, RegisterRequest, UserType as BackendUserType } from '../../shared/models/auth.models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, UserTypeCardComponent, AuthFormComponent],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent {
  step: 'select-type' | 'form' = 'select-type';
  authMode: 'login' | 'register' = 'login';
  selectedUserType: string | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showSuccessNotification = false;

  userTypes: UserType[] = [
    {
      type: 'contributor',
      title: 'Contributor',
      description: 'Submit and share research content with the community',
      icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    },
    {
      type: 'researcher',
      title: 'Researcher',
      description: 'Track, analyze and explore research data and insights',
      icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 16L12 12L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    }
  ];

  loginFormConfig: FormConfig = {
    title: 'Welcome Back',
    submitButtonText: 'Sign In',
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
        validators: [Validators.minLength(6)]
      }
    ]
  };

  registerFormConfig: FormConfig = {
    title: 'Create Account',
    submitButtonText: 'Sign Up',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter your first name',
        required: true
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter your last name',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        required: true,
        validators: [Validators.minLength(6)]
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true,
        validators: [Validators.minLength(6)]
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if we're on login or register route and save the state
    const url = this.router.url;
    this.authMode = url.includes('register') ? 'register' : 'login';
  }

  onUserTypeSelected(userType: string): void {
    this.selectedUserType = userType;
    this.step = 'form';
  }

  onFormSubmit(formData: any): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showSuccessNotification = false;

    if (this.authMode === 'login') {
      this.handleLogin(formData);
    } else {
      this.handleRegister(formData);
    }
  }

  private handleLogin(formData: any): void {
    const loginRequest: LoginRequest = {
      email: formData.email,
      password: formData.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (token) => {
        this.isLoading = false;
        if (token) {
          // Login successful - token received
          console.log('Login successful, token received');
          // Redirect to dashboard or home page
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Login failed - no token received';
        }
      },
      error: (error) => {
        this.isLoading = false;
        // Handle different HTTP error statuses
        if (error.status === 400) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 401) {
          this.errorMessage = 'Unauthorized - please check your credentials';
        } else {
          this.errorMessage = error.message || 'An error occurred during login';
        }
      }
    });
  }

  private handleRegister(formData: any): void {
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      this.isLoading = false;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Map UI user type to backend UserType
    const backendUserType = this.mapToBackendUserType(this.selectedUserType);
    if (!backendUserType) {
      this.isLoading = false;
      this.errorMessage = 'Please select a valid user type';
      return;
    }

    const registerRequest: RegisterRequest = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      userType: backendUserType
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Registration successful - show enhanced success notification
        console.log('Registration successful:', response);
        this.showRegistrationSuccess(response.email);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'An error occurred during registration';
      }
    });
  }

  private mapToBackendUserType(uiUserType: string | null): BackendUserType | null {
    switch (uiUserType) {
      case 'contributor':
        return 'CONTRIBUTOR';
      case 'researcher':
        return 'RESEARCHER';
      default:
        return null;
    }
  }

  private showRegistrationSuccess(email: string): void {
    this.errorMessage = '';
    this.successMessage = `Welcome aboard! Your account has been created successfully for ${email}`;
    this.showSuccessNotification = true;
    
    // Auto-hide notification and switch to login after 4 seconds
    setTimeout(() => {
      this.showSuccessNotification = false;
      this.successMessage = '';
      this.authMode = 'login';
      this.step = 'form';
    }, 4000);
  }

  closeSuccessNotification(): void {
    this.showSuccessNotification = false;
    this.successMessage = '';
    this.authMode = 'login';
    this.step = 'form';
  }

  goBack(): void {
    if (this.step === 'form') {
      this.step = 'select-type';
      this.selectedUserType = null;
    } else {
      this.router.navigate(['/']);
    }
  }

  switchAuthMode(newMode: 'login' | 'register'): void {
    // Clear any messages when switching modes
    this.errorMessage = '';
    this.showSuccessNotification = false;
    this.successMessage = '';
    
    // Just update the mode without navigating - this prevents component reset
    this.authMode = newMode;
    // Update the browser URL for proper routing
    window.history.replaceState({}, '', `/${newMode}`);
  }

  get currentFormConfig(): FormConfig {
    return this.authMode === 'login' ? this.loginFormConfig : this.registerFormConfig;
  }

  get pageTitle(): string {
    if (this.step === 'select-type') {
      return this.authMode === 'login' ? 'Sign In' : 'Create Account';
    }
    return `${this.authMode === 'login' ? 'Sign In' : 'Sign Up'} as ${this.selectedUserType}`;
  }

  get pageSubtitle(): string {
    if (this.step === 'select-type') {
      return 'Choose your account type to continue';
    }
    return '';
  }
}
