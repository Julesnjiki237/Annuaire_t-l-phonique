import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, SearchComponent],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <span class="material-symbols-outlined">contact_phone</span>
              <span class="logo-text">Annuaire Téléphonique Groupe 2</span>
            </a>
          </div>
          
          <app-search class="search-container"></app-search>
          
          <nav class="navigation">
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Accueil</a>
              </li>
              <li class="nav-item">
                <a routerLink="/contacts" routerLinkActive="active" class="nav-link">Contacts</a>
              </li>
              <li class="nav-item">
                <a routerLink="/contacts/new" routerLinkActive="active" class="btn-create add-contact-btn">
                  <span class="material-symbols-outlined">person_add</span>
                  <span class="btn-text">Ajouter un contact</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--card-color);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo-link {
      display: flex;
      align-items: center;
      color: var(--primary-color);
      font-weight: 500;
      font-size: 1.5rem;
      transition: color var(--transition-speed);
    }
    
    .logo-link:hover {
      color: var(--primary-dark);
    }
    
    .logo-link .material-symbols-outlined {
      font-size: 2rem;
      margin-right: 8px;
    }
    
    .search-container {
      flex: 1;
      max-width: 400px;
      margin: 0 24px;
    }
    
    .navigation {
      margin-left: auto;
    }
    
    .nav-list {
      display: flex;
      align-items: center;
      list-style: none;
    }
    
    .nav-item {
      margin-left: 24px;
    }
    
    .nav-link {
      color: var(--text-primary);
      font-weight: 500;
      position: relative;
      padding-bottom: 4px;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary-color);
    }
    
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary-color);
    }
    
    .add-contact-btn {
      display: flex;
      align-items: center;
      padding: 8px 16px;
    }
    
    .add-contact-btn .material-symbols-outlined {
      margin-right: 8px;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .search-container {
        width: 100%;
        max-width: 100%;
        margin: 16px 0;
      }
      
      .nav-list {
        width: 100%;
        justify-content: space-between;
        padding: 8px 0;
      }
      
      .nav-item {
        margin-left: 0;
      }
      
      .btn-text {
        display: none;
      }
    }
  `]
})
export class HeaderComponent { }