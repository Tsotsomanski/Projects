export interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    genres?: any;
    homepage?: string;

    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget?: number;
    imdb_id?: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity?: number;
    production_companies?: any;
    production_countries?: any;
    revenue: number;
    runtim?: number;
    spoken_languages?: any;
    status?: string;
    tagline?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
}