// src/lib/strapi.ts

// No IPopulatedMedia import needed as images are hardcoded for now
// No getStrapiMediaUrl export needed as it's not used by components directly now

const STRAPI_BASE_URL = "http://localhost:1337";

/**
 * Fetches data from Strapi API.
 * @param path The API endpoint path (e.g., '/home-page', '/team-members').
 * @param locale The locale to fetch (e.g., 'en', 'ar').
 * @param populate An array of relations to populate (e.g., ['HeroBackgroundImage', 'HeroPersonImage']).
 * @returns Parsed JSON data from Strapi.
 */
export async function fetchStrapiData<T>(
  path: string,
  locale: "en" | "ar" = "en",
  populate: string[] = [] // Populate array is ignored for now as images are hardcoded
): Promise<T | null> {
  let queryString = `locale=${locale}`;
  // Removed populate logic as images are hardcoded.
  // If you re-enable dynamic images, remember to add:
  // if (populate.length > 0) { queryString += `&${populate.map(p => `populate[${p}]=*`).join('&')}`; }

  const url = `${STRAPI_BASE_URL}/api${path}?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Strapi API Error: ${response.status} ${response.statusText} - ${url} - Response: ${errorText}`
      );
      throw new Error(
        `Failed to fetch data from Strapi: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

// getStrapiMediaUrl is no longer exported or used in components,
// but you can keep it here for future re-integration if needed.
/*
export const getStrapiMediaUrl = (
  populatedMedia: IPopulatedMedia | null | undefined,
  width: number = 800,
  height: number = 600,
  altText: string = 'Placeholder'
): string => {
  if (populatedMedia?.url) {
    const url = populatedMedia.url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${STRAPI_BASE_URL}${url}`;
  }
  return `https://placehold.co/${width}x${height}/4A2A1A/ffffff?text=${encodeURIComponent(altText)}`;
};
*/
