import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Liste des Contacts</h1>
        <a routerLink="/contacts/new" class="btn-create">
          <span class="material-symbols-outlined">add_circle</span>
          Ajouter un contact
        </a>
      </div>
      
      <div class="filter-sort-section">
        <div class="filter-section">
          <label for="categoryFilter" class="filter-label">Filtrer par catégorie :</label>
          <select id="categoryFilter" [(ngModel)]="categoryFilter" (change)="applyFilters()" class="filter-select">
            <option value="">Toutes les catégories</option>
            <option value="personal">Personnel</option>
            <option value="professional">Professionnel</option>
            <option value="family">Famille</option>
            <option value="friends">Amis</option>
            <option value="other">Autre</option>
          </select>
        </div>
        
        <div class="sort-section">
          <label for="sortBy" class="filter-label">Trier par :</label>
          <select id="sortBy" [(ngModel)]="sortBy" (change)="applyFilters()" class="filter-select">
            <option value="name">Nom</option>
            <option value="createdAt">Date d'ajout</option>
            <option value="updatedAt">Dernière mise à jour</option>
          </select>
          
          <button (click)="toggleSortOrder()" class="sort-direction-btn">
            <span class="material-symbols-outlined">
              {{ sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
            </span>
          </button>
        </div>
      </div>
      
      <div class="filter-toggle">
        <button class="filter-btn" [class.active]="showFavoritesOnly" (click)="toggleFavorites()">
          <span class="material-symbols-outlined">star</span>
          Favoris
        </button>
      </div>
      
      @if (loading) {
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Chargement des contacts...</p>
        </div>
      } @else if (filteredContacts.length === 0) {
        <div class="empty-state">
          <span class="material-symbols-outlined empty-icon">person_off</span>
          <h2>Aucun contact trouvé</h2>
          <p>
            @if (categoryFilter || showFavoritesOnly) {
              Essayez de modifier vos filtres ou 
            }
            <a routerLink="/contacts/new" class="btn-create">ajoutez un nouveau contact</a>
          </p>
        </div>
      } @else {
        <div class="contacts-grid">
          @for (contact of filteredContacts; track contact._id) {
            <div class="contact-card slide-in">
              <div class="contact-header">
                <h3 class="contact-name">{{ contact.name }}</h3>
                <button 
                  class="favorite-btn" 
                  [class.active]="contact.favorite"
                  (click)="toggleFavorite(contact)"
                >
                  <span class="material-symbols-outlined">
                    {{ contact.favorite ? 'star' : 'star_outline' }}
                  </span>
                </button>
              </div>
              
              @if (contact.category) {
                <div class="contact-category">
                  <span class="category-badge">{{ contact.category }}</span>
                </div>
              }
              
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
                <a [routerLink]="['/contacts', contact._id]" class="btn-outline btn-sm">Voir</a>
                <a [routerLink]="['/contacts', contact._id, 'edit']" class="btn-edit btn-sm">
                  <span class="material-symbols-outlined">edit</span>
                  Modifier
                </a>
                <button (click)="deleteContact(contact)" class="btn-delete btn-sm">
                  <span class="material-symbols-outlined">delete</span>
                  Supprimer
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    
    .page-title {
      margin-bottom: 0;
    }
    
    .filter-sort-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .filter-section, .sort-section {
      display: flex;
      align-items: center;
    }
    
    .filter-label {
      margin-right: 8px;
      margin-bottom: 0;
      font-weight: 500;
    }
    
    .filter-select {
      padding: 8px 12px;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      margin-bottom: 0;
      width: auto;
    }
    
    .sort-direction-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      margin-left: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color var(--transition-speed);
    }
    
    .sort-direction-btn:hover {
      background-color: var(--background-color);
    }
    
    .filter-toggle {
      display: flex;
      margin-bottom: 24px;
    }
    
    .filter-btn {
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: 
        background-color var(--transition-speed),
        border-color var(--transition-speed);
    }
    
    .filter-btn.active {
      background-color: var(--primary-light);
      border-color: var(--primary-color);
      color: var(--primary-dark);
    }
    
    .contacts-grid {
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
    
    .favorite-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-tertiary);
      transition: color var(--transition-speed);
    }
    
    .favorite-btn:hover, .favorite-btn.active {
      color: var(--warning-color);
    }
    
    .favorite-btn.active .material-symbols-outlined {
      animation: pop 0.3s ease-in-out;
    }
    
    .contact-category {
      margin-bottom: 16px;
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
      gap: 8px;
    }
    
    .btn-sm {
      padding: 6px 12px;
      font-size: 0.875rem;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 0;
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
    
    .empty-state {
      text-align: center;
      padding: 64px 0;
    }
    
    .empty-icon {
      font-size: 64px;
      color: var(--text-tertiary);
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @media (max-width: 768px) {
      .filter-sort-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .contacts-grid {
        grid-template-columns: 1fr;
      }
      
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  loading = true;
  
  // Filtres et tri
  categoryFilter = '';
  sortBy = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  showFavoritesOnly = false;
  
  constructor(private contactService: ContactService) {}
  
  ngOnInit(): void {
    this.loadContacts();
  }
  
  loadContacts(): void {
    this.loading = true;
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.applyFilters();
      this.loading = false;
    });
  }
  
  applyFilters(): void {
    let filtered = [...this.contacts];
    
    // Applique le filtre de catégorie
    if (this.categoryFilter) {
      filtered = filtered.filter(contact => 
        contact.category?.toLowerCase() === this.categoryFilter.toLowerCase()
      );
    }
    
    // Applique le filtre des favoris
    if (this.showFavoritesOnly) {
      filtered = filtered.filter(contact => contact.favorite);
    }
    
    // Applique le tri
    filtered.sort((a, b) => {
      let valueA: any;
      let valueB: any;
      
      switch(this.sortBy) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'createdAt':
          valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          break;
        case 'updatedAt':
          valueA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          valueB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          break;
        default:
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
      }
      
      const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    this.filteredContacts = filtered;
  }
  
  toggleSortOrder(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }
  
  toggleFavorites(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.applyFilters();
  }
  
  toggleFavorite(contact: Contact): void {
    if (!contact._id) return;
    
    const newFavoriteStatus = !contact.favorite;
    this.contactService.toggleFavorite(contact._id, newFavoriteStatus)
      .subscribe(updatedContact => {
        if (updatedContact) {
          contact.favorite = newFavoriteStatus;
          // Si on affiche uniquement les favoris et qu'on retire un favori, il doit disparaître
          if (this.showFavoritesOnly && !newFavoriteStatus) {
            this.applyFilters();
          }
        }
      });
  }
  
  deleteContact(contact: Contact): void {
    if (!contact._id || !confirm(`Êtes-vous sûr de vouloir supprimer ${contact.name} ?`)) return;
    
    this.contactService.deleteContact(contact._id)
      .subscribe(success => {
        if (success) {
          this.contacts = this.contacts.filter(c => c._id !== contact._id);
          this.applyFilters();
        }
      });
  }
}