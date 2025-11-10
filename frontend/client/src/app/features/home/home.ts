import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar';
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
export class HomeComponent {}
