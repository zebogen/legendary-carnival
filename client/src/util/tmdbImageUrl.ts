export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export default function tmdbImageUrl(path: string, width: number = 400) {
  return path
    ? `${TMDB_IMAGE_BASE_URL}/w${width}${path}`
    : 'https://via.placeholder.com/400x600';
}