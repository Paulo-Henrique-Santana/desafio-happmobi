import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoHeaderComponent } from '../logo-header/logo-header.component';

interface NavItem {
  route: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, LogoHeaderComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);

  currentRoute = '/home';

  navItems: NavItem[] = [
    { route: '/home', icon: '/assets/images/nav-icons/home-icon.svg', label: 'INÍCIO' },
    { route: '/agendamentos', icon: '/assets/images/nav-icons/appointments-icon.svg', label: 'AGENDAMENTOS' },
    { route: '/central', icon: '/assets/images/nav-icons/central-icon.svg', label: 'CENTRAL' },
    { route: '/perfil', icon: '/assets/images/nav-icons/profile-icon.svg', label: 'PERFIL' },
  ];

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  navigate(route: string) {
    this.currentRoute = route;
    this.router.navigate([route]);
  }
}
