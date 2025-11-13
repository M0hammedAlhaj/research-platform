import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button';
import { ViewportScroller } from '@angular/common';

export interface NavLink {
  label: string;
  path?: string;
  fragment?: string;
}

export interface NavButton {
  text: string;
  type: 'primary' | 'secondary';
  path?: string;
  onClick?: () => void;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  @Input() brand: string = 'MyApp';
  @Input() brandPath: string = '/';
  @Input() links: NavLink[] = [];
  @Input() buttons: NavButton[] = [];

  constructor(private viewportScroller: ViewportScroller) {}

  onLinkClick(link: NavLink, event: Event): void {
    if (link.fragment) {
      event.preventDefault();
      this.viewportScroller.scrollToAnchor(link.fragment);
    }
  }
}
