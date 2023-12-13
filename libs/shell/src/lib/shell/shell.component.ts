import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'cs-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  template: `
    <cs-layout>
      <router-outlet></router-outlet>
    </cs-layout>
  `,
  styles: [``],
})
export class ShellComponent {}
