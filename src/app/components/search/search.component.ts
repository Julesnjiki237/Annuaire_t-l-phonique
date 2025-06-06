import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-wrapper">
      <div class="search-input-container">
        <input 
          type="text" 
          [(ngModel)]="searchTerm"
          (ngModelChange)="search($event)"
          class="search-input" 
          placeholder="Rechercher des contacts..."
          autocomplete="off"
        >
        <span class="material-symbols-outlined search-icon">search</span>
      </div>
      
      @if (showResults && searchResults.length > 0) {
        <div class="search-results">
          <ul class="results-list">
            @for (contact of searchResults; track contact._id) {
              <li class="result-item">
                <a (click)="selectContact(contact)" class="result-link">
                  <div class="result-name">{{ contact.name }}</div>
                  <div class="result-phone">{{ contact.phone }}</div>
                </a>
              </li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styles: [`
    .search-wrapper {
      position: relative;
      width: 100%;
    }
    
    .search-input-container {
      position: relative;
    }
    
    .search-input {
      width: 100%;
      padding: 10px 16px 10px 40px;
      border-radius: 20px;
      border: 1px solid var(--border-color);
      background-color: var(--background-color);
      transition: all var(--transition-speed);
      margin-bottom: 0;
    }
    
    .search-input:focus {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      background-color: white;
    }
    
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
    }
    
    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 10;
      margin-top: 8px;
      max-height: 300px;
      overflow-y: auto;
      animation: fadeIn 0.2s ease-out;
    }
    
    .results-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .result-item {
      border-bottom: 1px solid var(--border-color);
    }
    
    .result-item:last-child {
      border-bottom: none;
    }
    
    .result-link {
      display: block;
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color var(--transition-speed);
    }
    
    .result-link:hover {
      background-color: var(--background-color);
    }
    
    .result-name {
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .result-phone {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SearchComponent {
  searchTerm = '';
  searchResults: Contact[] = [];
  showResults = false;
  private searchTerms = new Subject<string>();
  
  constructor(
    private contactService: ContactService,
    private router: Router
  ) {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.trim().length < 2) {
          this.showResults = false;
          return [];
        }
        return this.contactService.searchContacts(term);
      })
    ).subscribe(results => {
      this.searchResults = results;
      this.showResults = results.length > 0;
    });
  }
  
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  selectContact(contact: Contact): void {
    this.searchTerm = '';
    this.showResults = false;
    this.router.navigate(['/contacts', contact._id]);
  }
}