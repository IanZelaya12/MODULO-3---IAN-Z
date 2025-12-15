// Actions para Favoritos y Leer Ahora
export const ADD_FAVORITE = '[Articles] Add Favorite';
export const REMOVE_FAVORITE = '[Articles] Remove Favorite';
export const MARK_AS_READ = '[Articles] Mark As Read';

export class AddFavorite {
    readonly type = ADD_FAVORITE;
    constructor(public payload: number) {} // payload es el ID del artículo
}

export class RemoveFavorite {
    readonly type = REMOVE_FAVORITE;
    constructor(public payload: number) {}
}

export class MarkAsRead {
    readonly type = MARK_AS_READ;
    constructor(public payload: number) {}
}

export type ArticlesActions = AddFavorite | RemoveFavorite | MarkAsRead;
