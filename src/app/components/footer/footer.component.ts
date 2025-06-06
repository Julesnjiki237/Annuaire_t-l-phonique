import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p class="copyright">© {{currentYear}} Annuaire Téléphonique. Tous droits réservés Groupe 2 Crypto(Angular).</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Politique de confidentialité</a>
            <a href="#" class="footer-link">Conditions d'utilisation</a>
            <a href="#" class="footer-link">Nous contacter</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--secondary-dark);
      color: white;
      padding: 24px 0;
      margin-top: auto;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .copyright {
      margin: 0;
    }
    
    .footer-links {
      display: flex;
    }
    
    .footer-link {
      color: white;
      margin-left: 24px;
      opacity: 0.8;
      transition: opacity var(--transition-speed);
    }
    
    .footer-link:hover {
      opacity: 1;
      color: white;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
      }
      
      .copyright {
        margin-bottom: 16px;
      }
      
      .footer-links {
        justify-content: center;
      }
      
      .footer-link {
        margin: 0 12px;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}