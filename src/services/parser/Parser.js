/**
 * Parser Service class
 * Common methods to transform variables
 */
export default class Parser {
  /**
   * Transform date to DD format
   * @param {date} date
   * @returns {string} 0-padded day
   */
  static dd(date = new Date()) {
    const day = `${date.getUTCDate()}`;
    return day.length < 2 ? `0${day}` : `${day}`;
  }

  /**
   * Transform date to MM format
   * @param {date} date
   * @returns {string} 0-padded month
   */
  static mm(date = new Date()) {
    const month = `${date.getUTCMonth() + 1}`;
    return month.length < 2 ? `0${month}` : `${month}`;
  }

  /**
   * Transform date to YYYY-MM-DD format
   * @param {date} date
   * @returns {string} date
   */
  static yyyymmdd(date = new Date()) {
    return [date.getFullYear(), this.mm(date), this.dd(date)].join('-');
  }

  /**
   * Transform date to YYYY-MM-DD HH-MM-SS format
   * @param {date} date
   * @returns {string} date
   */
  static yyyymmddhhmmss(date = new Date(), dateTimeSep = ' ', timeSep = '-') {
    const time = date.toTimeString().split(' ')[0].replaceAll(':', timeSep);
    const datestr = [date.getFullYear(), this.mm(date), this.dd(date)].join('-');
    return `${datestr}${dateTimeSep}${time}`;
  }

  /**
   * Calc total years from a number of seconds
   * @param {number} seconds number of seconds
   * @param {integer} decimals decimal places
   * @returns {number} years
   */
  static yearsFromSeconds(seconds, decimals = 0) {
    return this.round(seconds / (60 * 60 * 24 * 365.25), decimals);
  }

  /**
   * Calc total years from a number of days
   * @param {number} days number of days
   * @param {integer} decimals decimal places
   * @returns {number} years
   */
  static yearsFromDays(days, decimals = 0) {
    return this.round(days / 365.25, decimals);
  }

  /**
   * Calc days between two dates
   * @param {date} start lower date
   * @param {date} end greater date
   * @param {integer} decimals decimal places
   * @returns {integer} days between dates
   */
  static daysBetweenDates(start, end = new Date(), decimals = 0) {
    return this.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24), decimals);
  }

  /**
   * Calc years between two dates
   * @param {date} start lower date
   * @param {date} end greater date
   * @param {integer} decimals decimal places
   * @returns {number} years between dates
   */
  static yearsBetweenDates(start, end = new Date(), decimals = 0) {
    return this.yearsFromDays(this.daysBetweenDates(start, end), decimals);
  }

  /**
   * Get first day on month from provided date
   * @param {date} date
   * @param {integer} elapsed: months to add to date
   * @returns {string} YYYY-MM-DD date
   */
  static firstOfMonth(date = new Date(), elapsed = 0) {
    date.setUTCMonth(date.getUTCMonth() + elapsed);
    return `${date.getFullYear()}-${Parser.mm(date)}-01`;
  }

  /**
   * Convert camelCase to Title Case
   * @param {string} str
   * @returns {string}
   */
  static camelToTitleCase(str) {
    return str
      .replace(/[0-9]{2,}/g, (match) => ` ${match} `)
      .replace(/[^A-Z0-9][A-Z]/g, (match) => `${match[0]} ${match[1]}`)
      .replace(
        /[A-Z][A-Z][^A-Z0-9]/g,
        (match) => `${match[0]} ${match[1]}${match[2]}`,
      )
      .replace(/[ ]{2,}/g, ' ')
      .replace(/\s./g, (match) => match.toUpperCase())
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  }

  /**
   * Convert string to Title Case
   * @param {string} str
   * @returns {string}
   */
  static strToTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  }

  /**
   * Round number
   * @param {number} num: number to round
   * @returns {number} number rounded
   */
  static round(num, decimalPlaces = 0) {
    const exponent = 10 ** decimalPlaces;
    return +(Math.round(+num * exponent) / exponent).toFixed(decimalPlaces);
  }

  /**
   * Round and format numbers with prefix and suffix
   * @param {number} number: number to format
   * @param {string} prefix
   * @param {string} suffix
   * @param {integer} decimalPlaces
   * @param {string} thousandsSeparator
   * @param {string} decimalSeparator
   * @returns {string} formatted number
   */
  static numFormatter(number, prefix = '', suffix = '', decimalPlaces = 0, thousandsSeparator = '', decimalSeparator = '') {
    if (Number.isNaN(Number(number))) return '0';
    const num = number || 0;
    const pre = prefix || '';
    const suf = suffix || '';
    const decimals = decimalPlaces || 0;
    const thousands = thousandsSeparator || '';
    const decimalsSep = decimalSeparator || '';
    const parts = (+num).toFixed(decimals).split('.');
    const realPart = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
    const decimalPart = parts[1] || '';
    return `${pre}${realPart}${decimalPart.length ? decimalsSep : ''}${decimalPart}${suf}`;
  }

  /**
   * Clear HTML tags from string
   * @param {string} str
   * @returns cleared string
   */
  static clearHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
