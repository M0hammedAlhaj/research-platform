import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsSectionComponent } from '../testimonials-section/testimonials-section';
import { TrustIndicatorsComponent } from '../trust-indicators/trust-indicators';

@Component({
  selector: 'app-social-proof-section',
  standalone: true,
  imports: [CommonModule, TestimonialsSectionComponent, TrustIndicatorsComponent],
  templateUrl: './social-proof-section.html',
  styleUrls: ['./social-proof-section.scss']
})
export class SocialProofSectionComponent {
  sectionTitle = 'Trusted by Researchers Worldwide';
  sectionSubtitle = 'See how research teams are accelerating their work and achieving better results';
}
