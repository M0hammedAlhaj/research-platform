import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, TestimonialCardComponent],
  templateUrl: './testimonials-section.html',
  styleUrls: ['./testimonials-section.scss']
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Research Director, BioTech Institute',
      quote: 'This platform cut our research coordination time by 60%. The real-time collaboration features have transformed how our distributed team works together on complex projects.'
    },
    {
      name: 'James Chen',
      role: 'PhD Candidate, Computer Science',
      quote: 'Version control for research papers is a game-changer. I can finally track all changes, collaborate with my advisors seamlessly, and never worry about losing important work.'
    },
    {
      name: 'Prof. Emily Rodriguez',
      role: 'Project Lead, Environmental Studies',
      quote: 'The analytics dashboard gives me unprecedented visibility into our research progress. We\'ve improved team productivity by 40% and hit more milestones on time.'
    },
    {
      name: 'Michael Thompson',
      role: 'Graduate Student, Medical Research',
      quote: 'Smart knowledge organization is incredible. Finding relevant research materials that used to take hours now takes minutes. The AI-powered tagging is remarkably accurate.'
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Lab Administrator, Physics Department',
      quote: 'Managing peer reviews across multiple projects was chaos before. Now our entire review workflow is streamlined, and quality standards are consistently maintained across all teams.'
    }
  ];
}
