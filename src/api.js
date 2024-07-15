export const fetchFilms = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Failed to fetch films');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching films:', error);
      throw error;
    }
  };
  