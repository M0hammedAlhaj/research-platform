import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface UserType {
  type: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-user-type-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-type-card.html',
  styleUrls: ['./user-type-card.scss']
})
export class UserTypeCardComponent {
  @Input() userType!: UserType;
  @Input() selected: boolean = false;
  @Output() cardClick = new EventEmitter<string>();

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.userType.icon);
  }

  onCardClick(): void {
    this.cardClick.emit(this.userType.type);
  }
}
