import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrustIndicator {
  value: string;
  label: string;
}

@Component({
  selector: 'app-trust-indicators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-indicators.html',
  styleUrls: ['./trust-indicators.scss']
})
export class TrustIndicatorsComponent {
  indicators: TrustIndicator[] = [
    { value: '10,000+', label: 'Active Researchers' },
    { value: '50,000+', label: 'Research Projects' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '150+', label: 'Universities' }
  ];
}
