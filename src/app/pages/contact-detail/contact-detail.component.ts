import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="page-header">
        <button (click)="goBack()" class="btn-outline back-btn">
          <span class="material-symbols-outlined">arrow_back</span>
          Retour aux contacts
        </button>
      </div>
      
      @if (loading) {
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Chargement des informations du contact...</p>
        </div>
      } @else if (!contact) {
        <div class="error-container">
          <span class="material-symbols-outlined error-icon">error</span>
          <h2>Contact introuvable</h2>
          <p>Le contact que vous recherchez n'existe pas ou a été supprimé.</p>
          <a routerLink="/contacts" class="btn-primary">Voir tous les contacts</a>
        </div>
      } @else {
        <div class="contact-detail-container">
          <div class="contact-header">
            <div class="contact-title">
              <h1 class="contact-name">{{ contact.name }}</h1>
              @if (contact.category) {
                <span class="category-badge">{{ contact.category }}</span>
              }
            </div>
            
            <div class="contact-actions">
              <button 
                class="btn-outline favorite-btn" 
                [class.active]="contact.favorite"
                (click)="toggleFavorite()"
              >
                <span class="material-symbols-outlined">
                  {{ contact.favorite ? 'star' : 'star_outline' }}
                </span>
                <span>{{ contact.favorite ? 'Favori' : 'Ajouter aux favoris' }}</span>
              </button>
              
              <a [routerLink]="['/contacts', contact._id, 'edit']" class="btn-edit">
                <span class="material-symbols-outlined">edit</span>
                Modifier
              </a>
              
              <button (click)="deleteContact()" class="btn-delete">
                <span class="material-symbols-outlined">delete</span>
                Supprimer
              </button>
            </div>
          </div>
          
          <div class="contact-card">
            <div class="contact-info-grid">
              <div class="contact-info-item">
                <div class="info-label">
                  <span class="material-symbols-outlined">phone</span>
                  Téléphone
                </div>
                <div class="info-value">{{ contact.phone }}</div>
              </div>
              
              @if (contact.email) {
                <div class="contact-info-item">
                  <div class="info-label">
                    <span class="material-symbols-outlined">email</span>
                    Email
                  </div>
                  <div class="info-value">
                    <a href="mailto:{{ contact.email }}" class="email-link">{{ contact.email }}</a>
                  </div>
                </div>
              }
              
              @if (contact.company) {
                <div class="contact-info-item">
                  <div class="info-label">
                    <span class="material-symbols-outlined">business</span>
                    Entreprise
                  </div>
                  <div class="info-value">{{ contact.company }}</div>
                </div>
              }
              
              @if (contact.address) {
                <div class="contact-info-item full-width">
                  <div class="info-label">
                    <span class="material-symbols-outlined">location_on</span>
                    Adresse
                  </div>
                  <div class="info-value">{{ contact.address }}</div>
                </div>
              }
              
              @if (contact.notes) {
                <div class="contact-info-item full-width">
                  <div class="info-label">
                    <span class="material-symbols-outlined">notes</span>
                    Notes
                  </div>
                  <div class="info-value notes">{{ contact.notes }}</div>
                </div>
              }
              
              <div class="contact-info-item">
                <div class="info-label">
                  <span class="material-symbols-outlined">calendar_today</span>
                  Ajouté le
                </div>
                <div class="info-value">
                  {{ contact.createdAt | date:'mediumDate' }}
                </div>
              </div>
              
              @if (contact.updatedAt && contact.updatedAt !== contact.createdAt) {
                <div class="contact-info-item">
                  <div class="info-label">
                    <span class="material-symbols-outlined">update</span>
                    Dernière mise à jour
                  </div>
                  <div class="info-value">
                    {{ contact.updatedAt | date:'medium' }}
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div class="quick-actions">
            <a href="tel:{{ contact.phone }}" class="quick-action-btn">
              <span class="material-symbols-outlined">call</span>
              Appeler
            </a>
            
            @if (contact.email) {
              <a href="mailto:{{ contact.email }}" class="quick-action-btn">
                <span class="material-symbols-outlined">mail</span>
                Email
              </a>
            }
            
            <a href="sms:{{ contact.phone }}" class="quick-action-btn">
              <span class="material-symbols-outlined">chat</span>
              Message
            </a>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 32px;
    }
    
    .back-btn {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .contact-detail-container {
      animation: fadeIn 0.3s ease-out;
    }
    
    .contact-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
    }
    
    .contact-name {
      margin-bottom: 8px;
    }
    
    .category-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      background-color: var(--primary-light);
      color: var(--primary-dark);
    }
    
    .contact-actions {
      display: flex;
      gap: 16px;
    }
    
    .favorite-btn {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .favorite-btn.active {
      background-color: var(--warning-color);
      border-color: var(--warning-color);
      color: white;
    }
    
    .contact-card {
      background-color: var(--card-color);
      border-radius: var(--border-radius);
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      margin-bottom: 32px;
    }
    
    .contact-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    
    .contact-info-item {
      display: flex;
      flex-direction: column;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    .info-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .info-value {
      font-size: 1.125rem;
    }
    
    .email-link {
      color: var(--primary-color);
    }
    
    .notes {
      white-space: pre-line;
      line-height: 1.6;
    }
    
    .quick-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .quick-action-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-color);
      color: white;
      padding: 16px;
      border-radius: var(--border-radius);
      transition: 
        background-color var(--transition-speed),
        transform var(--transition-speed);
    }
    
    .quick-action-btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-4px);
      color: white;
    }
    
    .quick-action-btn .material-symbols-outlined {
      font-size: 32px;
      margin-bottom: 8px;
    }
    
    .loading-container,
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 0;
      text-align: center;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--background-color);
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    .error-icon {
      font-size: 48px;
      color: var(--error-color);
      margin-bottom: 16px;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .contact-header {
        flex-direction: column;
        gap: 16px;
      }
      
      .contact-actions {
        width: 100%;
        justify-content: space-between;
      }
      
      .contact-info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  loading = true;
  
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadContact(id);
      } else {
        this.router.navigate(['/contacts']);
      }
    });
  }
  
  loadContact(id: string): void {
    this.loading = true;
    this.contactService.getContact(id).subscribe(contact => {
      this.contact = contact;
      this.loading = false;
    });
  }
  
  toggleFavorite(): void {
    if (!this.contact || !this.contact._id) return;
    
    const newFavoriteStatus = !this.contact.favorite;
    this.contactService.toggleFavorite(this.contact._id, newFavoriteStatus)
      .subscribe(updatedContact => {
        if (updatedContact) {
          this.contact = updatedContact;
        }
      });
  }
  
  deleteContact(): void {
    if (!this.contact || !this.contact._id) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${this.contact.name} ?`)) {
      this.contactService.deleteContact(this.contact._id)
        .subscribe(success => {
          if (success) {
            this.router.navigate(['/contacts']);
          }
        });
    }
  }
  
  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}