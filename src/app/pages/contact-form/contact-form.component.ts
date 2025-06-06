import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ isEditMode ? 'Modifier le contact' : 'Ajouter un contact' }}</h1>
        <button (click)="goBack()" class="btn-outline">
          <span class="material-symbols-outlined">arrow_back</span>
          Retour
        </button>
      </div>
      
      @if (loading) {
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Chargement des informations du contact...</p>
        </div>
      } @else {
        <div class="form-container">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="name" class="form-label">Nom *</label>
                <input 
                  type="text" 
                  id="name" 
                  formControlName="name" 
                  class="form-control" 
                  [class.invalid]="submitted && f['name'].errors"
                  placeholder="Jean Dupont"
                >
                @if (submitted && f['name'].errors) {
                  <div class="error-message">Le nom est requis</div>
                }
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Numéro de téléphone *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  formControlName="phone" 
                  class="form-control"
                  [class.invalid]="submitted && f['phone'].errors"
                  placeholder="+33 6 12 34 56 78"
                >
                @if (submitted && f['phone'].errors) {
                  <div class="error-message">
                    @if (f['phone'].errors['required']) {
                      Le numéro de téléphone est requis
                    } @else if (f['phone'].errors['pattern']) {
                      Veuillez entrer un numéro de téléphone valide
                    }
                  </div>
                }
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email" 
                  class="form-control"
                  [class.invalid]="submitted && f['email'].errors"
                  placeholder="jean.dupont@example.com"
                >
                @if (submitted && f['email'].errors?.['email']) {
                  <div class="error-message">Veuillez entrer un email valide</div>
                }
              </div>
              
              <div class="form-group">
                <label for="category" class="form-label">Catégorie</label>
                <select id="category" formControlName="category" class="form-control">
                  <option value="">Sélectionner une catégorie</option>
                  <option value="personal">Personnel</option>
                  <option value="professional">Professionnel</option>
                  <option value="family">Famille</option>
                  <option value="friends">Amis</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="company" class="form-label">Entreprise</label>
                <input 
                  type="text" 
                  id="company" 
                  formControlName="company" 
                  class="form-control"
                  placeholder="Nom de l'entreprise"
                >
              </div>
              
              <div class="form-group full-width">
                <label for="address" class="form-label">Adresse</label>
                <input 
                  type="text" 
                  id="address" 
                  formControlName="address" 
                  class="form-control"
                  placeholder="123 rue Principale, Ville, Pays"
                >
              </div>
              
              <div class="form-group full-width">
                <label for="notes" class="form-label">Notes</label>
                <textarea 
                  id="notes" 
                  formControlName="notes" 
                  class="form-control textarea"
                  placeholder="Informations supplémentaires sur ce contact..."
                ></textarea>
              </div>
              
              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="favorite">
                  <span class="checkbox-text">Marquer comme favori</span>
                </label>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" (click)="resetForm()" class="btn-secondary">Réinitialiser</button>
              <button type="submit" class="btn-primary">
                {{ isEditMode ? 'Mettre à jour le contact' : 'Créer le contact' }}
              </button>
            </div>
          </form>
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
    
    .form-container {
      background-color: var(--card-color);
      border-radius: var(--border-radius);
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      animation: fadeIn 0.3s ease-out;
    }
    
    .contact-form {
      width: 100%;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    .form-group {
      margin-bottom: 0;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      font-size: 1rem;
      transition: 
        border-color var(--transition-speed),
        box-shadow var(--transition-speed);
      margin-bottom: 0;
    }
    
    .form-control:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      outline: none;
    }
    
    .form-control.invalid {
      border-color: var(--error-color);
    }
    
    .textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    .checkbox-group {
      display: flex;
      align-items: center;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .checkbox-text {
      margin-left: 8px;
    }
    
    .error-message {
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 4px;
      animation: fadeIn 0.3s ease-out;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
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
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .form-container {
        padding: 24px 16px;
      }
      
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isEditMode = false;
  contactId = '';
  loading = false;
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.contactId = id;
        this.loadContact(id);
      }
    });
  }
  
  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]],
      email: ['', [Validators.email]],
      address: [''],
      company: [''],
      category: [''],
      notes: [''],
      favorite: [false]
    });
  }
  
  loadContact(id: string): void {
    this.loading = true;
    this.contactService.getContact(id).subscribe(contact => {
      if (contact) {
        this.contactForm.patchValue(contact);
      } else {
        this.router.navigate(['/contacts']);
      }
      this.loading = false;
    });
  }
  
  get f() {
    return this.contactForm.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    const contact: Contact = this.contactForm.value;
    
    if (this.isEditMode) {
      this.contactService.updateContact(this.contactId, contact)
        .subscribe(updatedContact => {
          if (updatedContact) {
            this.router.navigate(['/contacts', this.contactId]);
          }
        });
    } else {
      this.contactService.createContact(contact)
        .subscribe(newContact => {
          if (newContact && newContact._id) {
            this.router.navigate(['/contacts', newContact._id]);
          }
        });
    }
  }
  
  resetForm(): void {
    this.submitted = false;
    if (this.isEditMode) {
      this.loadContact(this.contactId);
    } else {
      this.contactForm.reset({
        favorite: false
      });
    }
  }
  
  goBack(): void {
    if (this.isEditMode) {
      this.router.navigate(['/contacts', this.contactId]);
    } else {
      this.router.navigate(['/contacts']);
    }
  }
}