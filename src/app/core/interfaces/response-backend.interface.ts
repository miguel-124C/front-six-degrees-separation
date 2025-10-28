

export interface Actors {
  id: number,
  name: string,
  profile_path: string | null,
}

export interface BetterRouts {
  actual: Actors,
  destino: Actors,
  movie: {
    movie_id: number,
    movie_title: string,
    poster_path: string
  }
}