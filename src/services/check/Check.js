/**
 * Check Service class
 * Common methods to verify variables
 */
export default class {
  /**
   * Check if email is valid
   * @param {string} email
   * @returns {boolean} true is email has correct format, otherwise returns false
   */
  static isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(String(email).toLowerCase());
  }

  /**
   * Check if string contains not only numbers
   * @param {string} string
   * @returns {boolean} true if string contains not only numbers, otherwise returns false
   */
  static containsNotOnlyNumbers(string) {
    const reNotOnlyNumbers = /(?!^\d+$)^.+$/;
    return reNotOnlyNumbers.test(string);
  }

  /**
   * Check if password isn't a common password
   * @param {string} password
   * @returns {boolean} true if string is uncommon, otherwise returns false
   */
  static uncommonPassword(password) {
    const commons = ['123456','password','12345678','qwerty','123456789','12345','1234','111111','1234567','dragon','123123','baseball','abc123','football','monkey','letmein','696969','shadow','master','666666','qwertyuiop','123321','mustang','1234567890','michael','654321','pussy','superman','1qaz2wsx','7777777','fuckyou','121212','000000','qazwsx','123qwe','killer','trustno1','jordan','jennifer','zxcvbnm','asdfgh','hunter','buster','soccer','harley','batman','andrew','tigger','sunshine','iloveyou','fuckme','2000','charlie','robert','thomas','hockey','ranger','daniel','starwars','klaster','112233','george','asshole','computer','michelle','jessica','pepper','1111','zxcvbn','555555','11111111','131313','freedom','777777','pass','fuck','maggie','159753','aaaaaa','ginger','princess','joshua','cheese','amanda','summer','love','ashley','6969','nicole','chelsea','biteme','matthew','access','yankees','987654321','dallas','austin','thunder','taylor','matrix'];  // eslint-disable-line
    return commons.indexOf(password) === -1;
  }

  /**
   * Check if url is valid
   *
   * www.linkedin.com/in/jimmy -> false
   * profile.linkedin.com.ar/in/jimmy -> false
   * https://www.linkedin.com/in/jimmy/#lorem?ipsum=12&dolor=.html -> true
   * http://linkedin.com/in/jimmy -> true
   * @param {string} url
   * @returns {boolean} true if url has a correct format, false otherwise
   */
  static isValidUrl(url) {
    const re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return re.test(String(url).toLowerCase());
  }
}
