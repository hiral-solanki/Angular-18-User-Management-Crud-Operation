import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  title = '404 Page not Found';
  
}