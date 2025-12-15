import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from '../services/article.service';
import * as ArticleActions from '../store/articles.actions';

interface AppState {
    articles: { favorites: number[], readLater: number[] };
}

@Component({
    selector: 'Favorites',
    template: `
        <StackLayout class="p-20">
            <Label text="Mis Artículos Favoritos" class="h1"></Label>
            <Label [text]="'IDs favoritos: ' + (favoriteIds$ | async)" class="h2"></Label>
            
            <Label text="--- Simulación de Listado Real ---" class="hr"></Label>

            <StackLayout *ngFor="let id of (favoriteIds$ | async)">
                <Label [text]="'ID: ' + id + ' '"></Label>
                <Button text="Leer ahora" (tap)="markAsRead(id)"></Button>
            </StackLayout>

        </StackLayout>
    `,
})
export class FavoritesComponent implements OnInit {
    favoriteIds$: Observable<number[]>;
    
    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        // Conexión reactiva para obtener la lista de IDs favoritos
        this.favoriteIds$ = this.store.pipe(select(state => state.articles.favorites));
    }

    // 9. Despachar acción MARK_AS_READ desde la sección favoritos
    markAsRead(articleId: number) {
        this.store.dispatch(new ArticleActions.MarkAsRead(articleId));
        alert(`Artículo ${articleId} marcado para Leer Ahora.`);
    }
}
