import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

// Interfaz para los artículos (opcional, pero buena práctica)
export interface Article {
    id: number;
    title: string;
    author: string;
    content: string;
    isFavorite: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private apiUrl = `${AppConfig.NGROK_URL}/api/articles`;

    constructor(private http: HttpClient) { }

    // 4. Service de Angular que realiza la solicitud HTTP con filtrado
    searchArticles(query: string = ''): Observable<Article[]> {
        let url = this.apiUrl;
        if (query) {
            url += `?q=${encodeURIComponent(query)}`;
        }
        return this.http.get<Article[]>(url);
    }
}
