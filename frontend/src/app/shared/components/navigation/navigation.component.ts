import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LogoHeaderComponent } from '../logo-header/logo-header.component';

interface NavItem {
  route: string;
  icon: string;
  label: string;
  adminOnly?: boolean;
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
  private authService = inject(AuthService);

  currentRoute = '/home';
  navItems: NavItem[] = [];

  allNavItems: NavItem[] = [
    { route: '/home', icon: '/assets/images/nav-icons/home-icon.svg', label: 'INÍCIO' },
    { route: '/agendamentos', icon: '/assets/images/nav-icons/appointments-icon.svg', label: 'AGENDAMENTOS' },
    { route: '/veiculos', icon: '/assets/images/nav-icons/vehicle-icon.svg', label: 'VEÍCULOS', adminOnly: true },
    { route: '/perfil', icon: '/assets/images/nav-icons/profile-icon.svg', label: 'PERFIL' },
  ];

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.filterNavItems();
  }

  filterNavItems() {
    const user = this.authService.getUser();
    this.navItems = this.allNavItems.filter(item => {
      if (item.adminOnly) {
        return user?.isAdmin === true;
      }
      return true;
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  navigate(route: string) {
    this.currentRoute = route;
    this.router.navigate([route]);
  }
}
