export interface Movie {
    movieID:     number;
    movieName:   string;
    movieDetail: string;
    moviePhoto:  string;
}
export interface Person {
    personID: number;
    movieID:  number;
    name:     string;
    photo:    string;
    detail:   string;
    typesID:  number;
}
export interface Creators {
    creatorID : number;
    personID: number;
    movieID:  number;
}
export interface Stars {
    starID : number;
    personID: number;
    movieID:  number;
}
