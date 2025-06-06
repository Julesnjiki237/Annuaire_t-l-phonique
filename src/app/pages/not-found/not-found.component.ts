import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="not-found-container">
        <div class="not-found-code">404</div>
        <h1 class="not-found-title">Page introuvable</h1>
        <p class="not-found-message">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div class="not-found-actions">
          <a routerLink="/" class="btn-primary">Retour à l'accueil</a>
          <a routerLink="/contacts" class="btn-outline">Voir les contacts</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 64px 0;
      animation: fadeIn 0.5s ease-out;
    }
    
    .not-found-code {
      font-size: 6rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 16px;
      line-height: 1;
    }
    
    .not-found-title {
      font-size: 2rem;
      margin-bottom: 16px;
    }
    
    .not-found-message {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
      max-width: 600px;
    }
    
    .not-found-actions {
      display: flex;
      gap: 16px;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .not-found-code {
        font-size: 4rem;
      }
      
      .not-found-title {
        font-size: 1.5rem;
      }
      
      .not-found-message {
        font-size: 1rem;
      }
      
      .not-found-actions {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class NotFoundComponent {}