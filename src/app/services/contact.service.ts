import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Contact, ContactResponse } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contacts';
  
  constructor(private http: HttpClient) {}
  
  getContacts(): Observable<Contact[]> {
    return this.http.get<ContactResponse>(this.apiUrl).pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      }),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }
  
  getContact(id: string): Observable<Contact | null> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (response.success && !Array.isArray(response.data)) {
          return response.data;
        }
        return null;
      }),
      catchError(this.handleError<Contact | null>('getContact', null))
    );
  }
  
  createContact(contact: Contact): Observable<Contact | null> {
    return this.http.post<ContactResponse>(this.apiUrl, contact).pipe(
      map(response => {
        if (response.success && !Array.isArray(response.data)) {
          return response.data;
        }
        return null;
      }),
      catchError(this.handleError<Contact | null>('createContact', null))
    );
  }
  
  updateContact(id: string, contact: Contact): Observable<Contact | null> {
    return this.http.put<ContactResponse>(`${this.apiUrl}/${id}`, contact).pipe(
      map(response => {
        if (response.success && !Array.isArray(response.data)) {
          return response.data;
        }
        return null;
      }),
      catchError(this.handleError<Contact | null>('updateContact', null))
    );
  }
  
  deleteContact(id: string): Observable<boolean> {
    return this.http.delete<ContactResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.success),
      catchError(this.handleError<boolean>('deleteContact', false))
    );
  }
  
  searchContacts(term: string): Observable<Contact[]> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/search?q=${term}`).pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      }),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }
  
  getFavoriteContacts(): Observable<Contact[]> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/favorites`).pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      }),
      catchError(this.handleError<Contact[]>('getFavoriteContacts', []))
    );
  }
  
  toggleFavorite(id: string, favorite: boolean): Observable<Contact | null> {
    return this.http.patch<ContactResponse>(`${this.apiUrl}/${id}/favorite`, { favorite }).pipe(
      map(response => {
        if (response.success && !Array.isArray(response.data)) {
          return response.data;
        }
        return null;
      }),
      catchError(this.handleError<Contact | null>('toggleFavorite', null))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}