/* eslint-disable class-methods-use-this */

/**
 * Url service class
 */
export default class {
  constructor(arraySeparator = '~') {
    // Unreserved characters: ALPHA / DIGIT / "-" / "." / "_" / "~"
    // RFC 3986 https://www.ietf.org/rfc/rfc3986.txt
    this.arraySeparator = arraySeparator;
  }

  /**
   * Return base url (domain url)
   */
  static get baseUrl() {
    return [
      window.location.protocol,
      '//',
      window.location.host,
      window.location.pathname,
    ].join('');
  }

  /**
   * Push state dynamically
   */
  static pushState(url) {
    window.history.pushState({}, '', url);
  }

  /**
   * Convert object to query string parameters
   */
  objectToQuerystring(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] === '' || obj[key] === undefined || obj[key] === null) return acc;
      if (Array.isArray(obj[key]) && obj[key].length === 0) return acc;
      const delimiter = acc === '' ? '?' : '&';
      const encodedKey = encodeURIComponent(key);
      const value = Array.isArray(obj[key])
        ? obj[key].join(this.arraySeparator)
        : obj[key];
      const val = encodeURIComponent(value);
      return obj[key] === '' ? acc : [acc, delimiter, encodedKey, '=', val].join('');
    }, '');
  }

  /**
   * Convert query string parameters to object
   */
  querystringToObject(url) {
    const queryString = this.getQueryString(url);
    if (!queryString) return {};
    return queryString.split('&').reduce((acc, curr) => {
      const keyval = curr.split('=');
      if (keyval.length === 2 && keyval[1] !== '') {
        acc[keyval[0]] = keyval[1]; // eslint-disable-line
      }
      return acc;
    }, {});
  }

  /**
   * Get URL query string
   */
  getQueryString(url) {
    return url.split('?').length > 1
      ? url.split('?')[1]
      : null;
  }

  /**
   * Get URL query parameters (simple and arrays)
   */
  getQueryStringParam(url, key = null) {
    const currentUrl = url || window.location.href;
    const paranName = key.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${paranName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(currentUrl);

    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    if (results[2].split(this.arraySeparator).length > 1) {
      return results[2]
        .split(this.arraySeparator)
        .map((result) => decodeURIComponent(result.replace(/\+/g, ' ')));
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  /**
   * Update URL with parameter
   */
  updateUrlQueryParam(url, key, value) {
    const queryString = url.split('?').length > 1
      ? `?${url.split('?')[1]}`
      : null;
    const newParam = `${key}=${value}`;
    const updateRegex = new RegExp(`([?&])${key}[^&]*`);
    let params = `?${newParam}`;

    if (queryString) {
      // If the "search" string exists, then build params from it
      if (!value) {
        // Remove param if value is empty
        const removeRegex = new RegExp(`([?&])${key}=[^&;]+[&;]?`);
        params = queryString.replace(removeRegex, '$1');
        params = params.replace(/[&;]$/, '');
      } else if (queryString.match(updateRegex) !== null) {
        // If param exists already, update it
        params = queryString.replace(updateRegex, `$1${newParam}`);
      } else {
        // Otherwise, add it to end of query string
        params = `${queryString}&${newParam}`;
      }
    }
    // If no parameter was set, we don't need the question mark
    params = params === '?' ? '' : params;

    return `${url.split('?')[0]}${params}`;
  }

  /**
   * Update URL with array parameter
   */
  updateArrayQueryParam(url, key, value = null) {
    const paramValues = Array.isArray(value)
      ? value.join(this.arraySeparator)
      : value;

    return this.updateUrlQueryParam(url, key, paramValues);
  }

  /**
   * Update URL adding array parameter value
   */
  addArrayValueQueryParam(url, key, value) {
    const currentParamQuery = this.getQueryStringParam(url, key);
    let paramValues = !Array.isArray(value) ? [value] : value;

    if (currentParamQuery) {
      // Param is currently in query
      const currentQueryValues = Array.isArray(currentParamQuery)
        ? currentParamQuery
        : currentParamQuery.split(this.arraySeparator);

      paramValues = currentQueryValues
        .concat(paramValues.filter((val) => currentQueryValues.indexOf(val) === -1));
    }
    // Param isn't in the query
    return this.updateUrlQueryParam(url, key, paramValues.join(this.arraySeparator));
  }

  /**
   * Update URL removing array parameter value
   */
  removeArrayValueQueryParam(url, key, value) {
    const currentParamQuery = this.getQueryStringParam(url, key);
    const paramValues = !Array.isArray(value) ? [value] : value;

    if (currentParamQuery) {
      // Param is currently in query
      const currentQueryValues = Array.isArray(currentParamQuery)
        ? currentParamQuery
        : currentParamQuery.split(this.arraySeparator);

      const finalValues = currentQueryValues
        .filter((val) => paramValues.indexOf(val) === -1)
        .join(this.arraySeparator);

      return this.updateUrlQueryParam(url, key, finalValues);
    }
    // Param isn't in the query
    return url;
  }

  /**
   * Open url in new tab
   */
  static openUrlInNewTab(url) {
    const newWindow = window.open(url, '_blank');
    newWindow.focus();
  }

  /**
   * Convert http to https
   */
  static urlToHttps(url) {
    return url.replace(/^http:\/\//, 'https://');
  }

  /**
   * Convert boolean querystring parameter
   * @param {string|integer} param
   * @param {string|integer} nodefined default value
   * @returns converted value
   */
  static parseBoolParam(param, nodefined = '') {
    if ([1, '1', 'true', 'True', 'TRUE'].includes(param)) return true;
    if ([0, '0', 'false', 'False', 'FALSE'].includes(param)) return false;
    return nodefined;
  }

  /**
   * Convert numeric querystring parameter
   * @param {string|integer|float} param
   * @param {string|integer|float} nodefined default value
   * @returns converted value
   */
  static parseNumberParam(param, nodefined = '') {
    const reg = /^-?\d+\.?\d*$/;
    if (reg.test(param)) return +param;
    return nodefined;
  }

  /**
   * Convert numeric querystring parameter (to Array)
   * @param {string|integer|float} param
   * @param {string|integer|float} nodefined default value
   * @returns converted value
   */
  static parseNumberArrayParam(param, nodefined = '') {
    if (!param) return nodefined; // param = ''
    if (!Array.isArray(param)) {
      const reg = /^-?\d+\.?\d*$/;
      if (reg.test(param)) return [+param]; // param = 10
      return nodefined;
    }
    if (param.length === 0) return nodefined; // param = []
    return param.map((d) => +d);
  }

  /**
   * Convert querystring parameter to Array
   * @param {string} param
   * @param {string} nodefined default value
   * @returns converted value
   */
  static parseStringArrayParam(param, nodefined = '') {
    if (!param) return nodefined; // param = ''
    if (!Array.isArray(param)) {
      return [param]; // param = 'lorem'
    }
    if (param.length === 0) return nodefined; // param = []
    return param;
  }
}
