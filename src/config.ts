
export const API_URL_OK = (currentPage: number) => `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&page=${currentPage}&limit=10`
export const API_URL_NOT_FOUND = `https://api.thecatsdfapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&`
export const API_URL_NOT_ACCESS = `https://api.pexels.com/v1/search?query=nature`

export const PHOTO_WIDTH_WITH_MARGIN = 160;
export const PHOTO_HEIGHT_WITH_MARGIN = 160;