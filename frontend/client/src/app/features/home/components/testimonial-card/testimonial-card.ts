import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  templateUrl: './testimonial-card.html',
  styleUrls: ['./testimonial-card.scss']
})
export class TestimonialCardComponent {
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() quote: string = '';
  @Input() avatar: string = '';

  getInitials(): string {
    return this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
