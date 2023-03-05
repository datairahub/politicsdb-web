/**
 * API Service class
 * Handles communication between app and API
 */
class ApiService {
  /**
   * Get endpoint URL
   * @param {string} endpoint endpoint name
   * @param {string|number} instanceId Instance's ID
   * @returns Endpoint url
   */
  url(endpoint, instanceId = undefined) { // eslint-disable-line
    const base = import.meta.env.VITE_API_URL;
    const api = '/api/v1/';
    const id = instanceId ? `${instanceId}/` : '';

    switch (endpoint) {
      /* eslint-disable no-multi-spaces */

      // Positions
      case 'institution':           return `${base}${api}position/institution/${id}`;
      case 'period':                return `${base}${api}position/period/${id}`;
      case 'position':              return `${base}${api}position/position/${id}`;

      // Persons
      case 'person':                return `${base}${api}people/person/${id}`;
      case 'birthdatesource':       return `${base}${api}people/birthdatesource/${id}`;
      case 'biographysource':       return `${base}${api}people/biographysource/${id}`;

      // Stats
      case 'institution-age':       return `${base}${api}position/institution/${id}stats_age/`;

      default: break;
      /* eslint-enable no-multi-spaces */
    }
    console.error(`URL not defined: ${endpoint}`); // eslint-disable-line
    return '/';
  }

  getHeaders() { // eslint-disable-line
    return {};
  }
}

const API = new ApiService();

export default API;
