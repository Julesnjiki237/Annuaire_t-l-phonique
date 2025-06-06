import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Gérez vos Contacts</h1>
          <p class="hero-subtitle">
            Organisez, stockez et accédez facilement à vos contacts avec notre application d'annuaire téléphonique.
          </p>
          <div class="hero-actions">
            <a routerLink="/contacts" class="btn-primary">Voir tous les contacts</a>
            <a routerLink="/contacts/new" class="btn-create">Ajouter un contact</a>
          </div>
        </div>
      </section>
      
      <section class="features">
        <h2 class="section-title">Fonctionnalités</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <span class="material-symbols-outlined feature-icon">person_add</span>
            <h3 class="feature-title">Créer des Contacts</h3>
            <p class="feature-description">
              Ajoutez de nouveaux contacts avec nom, téléphone, email et informations supplémentaires.
            </p>
          </div>
          
          <div class="feature-card">
            <span class="material-symbols-outlined feature-icon">search</span>
            <h3 class="feature-title">Rechercher des Contacts</h3>
            <p class="feature-description">
              Trouvez rapidement des contacts par nom, numéro de téléphone ou adresse email.
            </p>
          </div>
          
          <div class="feature-card">
            <span class="material-symbols-outlined feature-icon">edit_note</span>
            <h3 class="feature-title">Mettre à jour les Contacts</h3>
            <p class="feature-description">
              Gardez vos informations de contact à jour avec des options de modification simples.
            </p>
          </div>
          
          <div class="feature-card">
            <span class="material-symbols-outlined feature-icon">category</span>
            <h3 class="feature-title">Catégoriser les Contacts</h3>
            <p class="feature-description">
              Organisez vos contacts en catégories pour une meilleure gestion.
            </p>
          </div>
        </div>
      </section>
      
      @if (favorites.length > 0) {
        <section class="favorite-contacts">
          <h2 class="section-title">Contacts Favoris</h2>
          <div class="contact-grid">
            @for (contact of favorites; track contact._id) {
              <div class="contact-card fade-in">
                <div class="contact-header">
                  <h3 class="contact-name">{{ contact.name }}</h3>
                  <span class="material-symbols-outlined favorite-icon">star</span>
                </div>
                <div class="contact-info">
                  <p class="contact-phone">
                    <span class="material-symbols-outlined">phone</span>
                    {{ contact.phone }}
                  </p>
                  @if (contact.email) {
                    <p class="contact-email">
                      <span class="material-symbols-outlined">email</span>
                      {{ contact.email }}
                    </p>
                  }
                </div>
                <div class="contact-actions">
                  <a [routerLink]="['/contacts', contact._id]" class="contact-link">Voir les détails</a>
                </div>
              </div>
            }
          </div>
        </section>
      }
      
      @if (recentContacts.length > 0) {
        <section class="recent-contacts">
          <h2 class="section-title">Contacts Récents</h2>
          <div class="contact-grid">
            @for (contact of recentContacts; track contact._id) {
              <div class="contact-card fade-in">
                <div class="contact-header">
                  <h3 class="contact-name">{{ contact.name }}</h3>
                  <span 
                    class="material-symbols-outlined favorite-icon" 
                    [class.active]="contact.favorite"
                  >
                    {{ contact.favorite ? 'star' : 'star_outline' }}
                  </span>
                </div>
                <div class="contact-info">
                  <p class="contact-phone">
                    <span class="material-symbols-outlined">phone</span>
                    {{ contact.phone }}
                  </p>
                  @if (contact.email) {
                    <p class="contact-email">
                      <span class="material-symbols-outlined">email</span>
                      {{ contact.email }}
                    </p>
                  }
                </div>
                <div class="contact-actions">
                  <a [routerLink]="['/contacts', contact._id]" class="contact-link">Voir les détails</a>
                </div>
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(to right, var(--primary-dark), var(--primary-color));
      border-radius: var(--border-radius);
      padding: 64px 32px;
      margin-bottom: 48px;
      color: white;
      text-align: center;
    }
    
    .hero-title {
      font-size: 2.5rem;
      margin-bottom: 16px;
      color: white;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 32px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      opacity: 0.9;
    }
    
    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    
    .hero-actions .btn-primary,
    .hero-actions .btn-create {
      padding: 12px 24px;
    }
    
    .hero-actions .btn-outline {
      background-color: transparent;
      border: 2px solid white;
      color: white;
    }
    
    .hero-actions .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .section-title {
      text-align: center;
      margin-bottom: 32px;
      position: relative;
      padding-bottom: 16px;
    }
    
    .section-title:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: var(--primary-color);
      border-radius: 3px;
    }
    
    .features {
      margin-bottom: 64px;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }
    
    .feature-card {
      background-color: var(--card-color);
      border-radius: var(--border-radius);
      padding: 32px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    }
    
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .feature-icon {
      font-size: 48px;
      color: var(--primary-color);
      margin-bottom: 16px;
    }
    
    .feature-title {
      margin-bottom: 16px;
    }
    
    .feature-description {
      color: var(--text-secondary);
    }
    
    .favorite-contacts,
    .recent-contacts {
      margin-bottom: 64px;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    
    .contact-card {
      background-color: var(--card-color);
      border-radius: var(--border-radius);
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    }
    
    .contact-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .contact-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .contact-name {
      margin-bottom: 0;
    }
    
    .favorite-icon {
      color: var(--warning-color);
    }
    
    .favorite-icon.active {
      animation: pop 0.3s ease-in-out;
    }
    
    .contact-info {
      margin-bottom: 16px;
    }
    
    .contact-phone,
    .contact-email {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }
    
    .contact-phone .material-symbols-outlined,
    .contact-email .material-symbols-outlined {
      margin-right: 8px;
      font-size: 18px;
    }
    
    .contact-actions {
      display: flex;
      justify-content: flex-end;
    }
    
    .contact-link {
      font-weight: 500;
      color: var(--primary-color);
    }
    
    @keyframes pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: 40px 20px;
      }
      
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      
      .hero-actions .btn-primary,
      .hero-actions .btn-create {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  favorites: Contact[] = [];
  recentContacts: Contact[] = [];
  
  constructor(private contactService: ContactService) {}
  
  ngOnInit(): void {
    this.loadFavorites();
    this.loadRecentContacts();
  }
  
  loadFavorites(): void {
    this.contactService.getFavoriteContacts()
      .subscribe(contacts => {
        this.favorites = contacts.slice(0, 4); // Limite à 4 favoris
      });
  }
  
  loadRecentContacts(): void {
    this.contactService.getContacts()
      .subscribe(contacts => {
        // Trie par date de création et prend les 4 plus récents
        this.recentContacts = contacts
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 4);
      });
  }
}