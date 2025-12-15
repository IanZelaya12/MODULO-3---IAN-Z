import * as ArticleActions from './articles.actions';

export interface State {
    favorites: number[]; // IDs de favoritos
    readLater: number[]; // IDs de "Leer ahora"
}

const initialState: State = {
    favorites: [],
    readLater: [],
};

export function articlesReducer(state = initialState, action: ArticleActions.ArticlesActions): State {
    switch (action.type) {
        case ArticleActions.ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case ArticleActions.REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(id => id !== action.payload)
            };

        // 10. Despacho de Action para Leer Ahora
        case ArticleActions.MARK_AS_READ:
            if (state.readLater.includes(action.payload)) {
                return state; // Ya marcado
            }
            return {
                ...state,
                readLater: [...state.readLater, action.payload]
            };

        default:
            return state;
    }
}
