import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateClickCount = async (movie) => {

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", movie.id),
    ]);
    // if movie exists, update count
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      // if movie does not exist, create new document
    } else {
      const newDoc = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: movie.title,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating click count:", error); // This will show us the exact error
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(10), // Load 10 trending movies
      Query.orderDesc("count"),
    ]);

    return result.documents || [];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
