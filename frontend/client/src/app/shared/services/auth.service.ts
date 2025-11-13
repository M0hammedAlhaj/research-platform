import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse, 
  User,
  UserType 
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    // Check if user is logged in on service initialization
    this.checkAuthState();
  }

  /**
   * Register a new user
   * @param registerData - User registration data
   * @returns Observable<RegisterResponse>
   */
  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    const url = `${this.baseUrl}/v1/auth/register`;
    
    return this.http.post<RegisterResponse>(url, registerData, this.httpOptions)
      .pipe(
        tap(response => {
          // Backend returns UserRegisterResponse with id, email, type
          // For now, we'll handle the response but won't auto-login since no token is returned
          console.log('User registered successfully:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Login user
   * @param loginData - User login credentials
   * @returns Observable<LoginResponse>
   */
  login(loginData: LoginRequest): Observable<LoginResponse> {
    const url = `${this.baseUrl}/v1/auth/login`;
    
    // Use responseType: 'text' since backend returns string token
    return this.http.post(url, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }).pipe(
      tap(token => {
        // Backend returns JWT token as string
        if (token) {
          // Parse user info from JWT token
          const userFromToken = this.parseUserFromToken(token);
          if (userFromToken) {
            this.setAuthData(userFromToken, token);
          } else {
            // If we can't parse user from token, just store the token
            localStorage.setItem('authToken', token);
            this.currentUserSubject.next(null);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * Get current user
   * @returns User | null
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   * @returns boolean
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Get authentication token
   * @returns string | null
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Get authorization headers for API requests
   * @returns HttpHeaders
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  /**
   * Set authentication data in localStorage and update current user
   * @param user - User data
   * @param token - JWT token
   */
  private setAuthData(user: User, token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Check authentication state on service initialization
   */
  private checkAuthState(): void {
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('currentUser');
    
    if (token && userJson && !this.isTokenExpired(token)) {
      try {
        const parsedUser = JSON.parse(userJson);
        const user: User = {
          id: parsedUser.id,
          email: parsedUser.email,
          firstName: parsedUser.firstName,
          lastName: parsedUser.lastName,
          userType: parsedUser.userType as UserType
        };
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  /**
   * Check if JWT token is expired
   * @param token - JWT token
   * @returns boolean
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  }

  /**
   * Parse user information from JWT token
   * @param token - JWT token
   * @returns User | null
   */
  private parseUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Extract user information from JWT payload
      // Adjust these field names based on your JWT structure
      if (payload.sub && payload.email) {
        return {
          id: payload.sub || payload.userId || payload.id,
          email: payload.email,
          firstName: payload.firstName || payload.given_name || '',
          lastName: payload.lastName || payload.family_name || '',
          userType: payload.userType || payload.role || 'CONTRIBUTOR'
        };
      }
      return null;
    } catch (error) {
      console.error('Error parsing user from token:', error);
      return null;
    }
  }

  /**
   * Handle HTTP errors
   * @param error - HTTP error
   * @returns Observable<never>
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    console.error('Auth Service Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}