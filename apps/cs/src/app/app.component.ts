import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'cs-root',
  template: `
    <div>Hola, Amigo</div>
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent {}
