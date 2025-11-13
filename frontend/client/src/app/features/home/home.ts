import { Component } from '@angular/core';
import { NavbarComponent, NavLink, NavButton } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { HeroComponent } from './components/hero/hero';
import { FeaturesSectionComponent } from './components/features-section/features-section';
import { SocialProofSectionComponent } from './components/social-proof-section/social-proof-section';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, HeroComponent, FeaturesSectionComponent, SocialProofSectionComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  // Navbar Configuration
  navbarBrand = 'MyApp';

  navbarLinks: NavLink[] = [
    { label: 'Home', fragment: 'hero' },
    { label: 'Features', fragment: 'features' },
    { label: 'Testimonials', fragment: 'testimonials' },
    { label: 'Contact', fragment: 'contact' }
  ];

  navbarButtons: NavButton[] = [
    { text: 'Login', type: 'secondary', path: '/login' },
    { text: 'Sign Up', type: 'primary', path: '/register' }
  ];
}
