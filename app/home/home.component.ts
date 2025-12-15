import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleService, Article } from '../services/article.service';
import * as ArticleActions from '../store/articles.actions';
import { AppSettings } from '@nativescript/core'; // Para AppSettings

interface AppState {
    articles: { favorites: number[], readLater: number[] };
}

@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    // 1. Formulario de búsquedas
    searchQuery: string = '';
    articles: Article[] = [];
    
    // 11. Listado que se actualiza reactivamente con Redux
    readLaterIds$: Observable<number[]>;
    readLaterArticles$: Observable<Article[]>;
    
    // 5. Lectura del nombre de usuario persistente
    userName: string = AppSettings.getString('userName', 'Invitado'); 

    constructor(
        private articleService: ArticleService,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.search();
        
        // Conexión reactiva al store de Redux
        this.readLaterIds$ = this.store.pipe(select(state => state.articles.readLater));
        
        // NOTA: Para obtener los objetos Article (no solo IDs), 
        // se usa un selector avanzado (no incluido por simplicidad de copiar/pegar).
        // Aquí se simula simplemente observando los IDs.
    }

    // 2. Filtrado de resultados
    search() {
        this.articleService.searchArticles(this.searchQuery).subscribe(
            data => this.articles = data,
            error => console.error('Error al buscar artículos:', error)
        );
    }
    
    // 9. Botón "Leer Ahora" que despacha un action
    markAsRead(articleId: number) {
        this.store.dispatch(new ArticleActions.MarkAsRead(articleId));
        alert(`Artículo ${articleId} marcado para leer.`);
    }

    // 7. Icono de favorito
    toggleFavorite(articleId: number) {
        const isFav = this.isFavorite(articleId);
        if (isFav) {
            this.store.dispatch(new ArticleActions.RemoveFavorite(articleId));
        } else {
            this.store.dispatch(new ArticleActions.AddFavorite(articleId));
        }
    }
    
    isFavorite(articleId: number): boolean {
        let isFav = false;
        this.store.pipe(select(state => state.articles.favorites))
          .subscribe(favs => isFav = favs.includes(articleId))
          .unsubscribe();
        return isFav;
    }
}
