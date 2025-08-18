// src/lib/strapi.ts

// const STRAPI_BASE_URL = "http://localhost:1337";
const STRAPI_BASE_URL = "https://diligent-birds-eb00defbed.strapiapp.com";

/**
 * Fetches data from Strapi API.
 * @param path The API endpoint path (e.g., '/home-page', '/team-members').
 * @param locale The locale to fetch (e.g., 'en', 'ar').
 * @param populate An array of relations to populate
 * @returns Parsed JSON data from Strapi.
 */

export async function fetchStrapiData<T>(
  path: string,
  locale: "en" | "ar" = "en",
  populate: string[] = []
): Promise<T | null> {
  let queryString = `locale=${locale}`;

  if (populate.length > 0) {
    queryString += `&${populate
      .map((p, index) => `populate[${index}]=${p}`)
      .join("&")}`;
  }

  const url = `${STRAPI_BASE_URL}/api${path}?${queryString}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_API_TOKEN}`, // Use environment variable for security
      },
    });

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
    // console.log(`Fetched data from ${url}:`, data);
    return data as T;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

interface IPopulatedMedia {
  url: string;
}

export const getStrapiMediaUrl = (
  populatedMedia: IPopulatedMedia | null | undefined,
  width: number = 800,
  height: number = 600,
  altText: string = "Placeholder"
): string => {
  if (populatedMedia?.url) {
    const url = populatedMedia.url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `${STRAPI_BASE_URL}${url}`;
  }
  return `https://placehold.co/${width}x${height}/4A2A1A/ffffff?text=${encodeURIComponent(
    altText
  )}`;
};
