/**
 * Person Service class
 */
export default class {
  static translateGenre(genre) {
    if (genre === 'O') return 'Otro';
    return genre === 'M'
      ? 'Hombre'
      : 'Mujer';
  }
}
