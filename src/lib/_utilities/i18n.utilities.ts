import sanitize from 'xss';
import { get } from 'svelte/store';
import { z } from 'zod';

import { stringsStore } from '$lib/locale.store';

/**
 * Do not allow strings with angle brackets, just to be extra safe
 *
 * Demo: https://regex101.com/r/Mw9vTB/1
 */
const valueSchema = z.record(z.string().regex(/^[^<>]*$/)).optional();

/**
 * @function getLocale - Takes Accept-Language string,
 *
 * if `en-US,en;q=0.9`, it returns:
 * en-US
 *
 * if `en;q=0.8`, it returns:
 * en
 *
 * @param {string} acceptLanguageHeader - the header containing the language
 * @param {string} delimiter - the delimiter used to separate the country code from the language code
 * @returns {string} - the locale
 */
export function getLocale(acceptLanguageHeader: string, delimiter: '/' | '_'): string {
  if (typeof acceptLanguageHeader !== 'string') {
    console.warn('Accept Language Header is not a string');
    console.warn('Falling back to "en-US"');
    acceptLanguageHeader = 'en-US';
  }

  /**
   * Takes Accept-Language string,
   * if `en-US,en;q=0.9`, it returns:
   * en-US
   *
   * if `en;q=0.8`, it returns:
   * en
   *
   * Demo: https://regex101.com/r/kvOo8q/1
   */
  const matchResult = acceptLanguageHeader.match(/^(\w{1,4}-{0,1}\w{0,4})/);
  if ((!Array.isArray(matchResult) && !matchResult) || !matchResult[0]) {
    console.warn('No Accept-Language header was found');
    return `us${delimiter}en`;
  }

  const splitResult = matchResult[1].split('-');
  if (
    (!Array.isArray(splitResult) && !splitResult) ||
    !splitResult[0] ||
    splitResult[0].length > 4
  ) {
    console.warn('Locale from Accept-Language header not recognized');
    return `us${delimiter}en`;
  }

  return `${splitResult[1] || 'us'}${delimiter}${splitResult[0]}`.toLowerCase();
}

/**
 * @function interpolate - Get a translation string
 * Interpolate a string that contains variables
 *
 * @param {string} key - The key to lookup in the translation strings
 * @param {object} values - An object of values to interpolate into the string
 * @param {string} externalText - A string to use if no translation is found
 */
export function interpolate(
  key: string,
  values?: z.infer<typeof valueSchema> | null,
  externalText?: string,
): string {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error('No key provided to t()');

  // Grab the text from the translations store.
  const contentObj = get<Record<string, string> | null>(stringsStore);
  const string = (contentObj && contentObj[key]) || '';

  let messageDirty = '';

  if (values) {
    // Validate value before interpolation, if any value looks questionable throw error
    valueSchema.parse(values);

    /**
     * Replace any passed in variables in the translation string.
     *
     * Example:
     *
     * string = "{greeting}, World!"
     * values = {
     *    greeting: "Hello"
     * }
     */
    Object.keys(values).map((k) => {
      /**
       * k = greeting
       * regex = /{greeting}/g
       */
      const regex = new RegExp(`{${k}}`, 'g');
      /**
       * values[k] = "Hello"
       * messageDirty = "Hello, World!"
       */
      messageDirty = string.replace(regex, values[k]);
    });
  } else {
    messageDirty = string;
  }

  /**
   * If there's no message, then convert the key itself into the message
   */
  if (!messageDirty && !externalText) {
    /**
     * If the key is NOT external, then split at the capital letter
     */
    const textFromKey = key.replace(/([A-Z])/g, ' $1');
    messageDirty = textFromKey.charAt(0).toUpperCase() + textFromKey.slice(1);
  } else if (!messageDirty && externalText) {
    /**
     * If no internal message is found, but external content is provided,
     * just return the external text
     */
    messageDirty = externalText;
  }
  const messageClean = sanitize(messageDirty, {
    /**
     * Allow `?` as first char in `href` value for anchor tags.
     * To preserve original behavior in addition to this one exception,
     * return `undefined` for all other cases.
     */
    onTagAttr: function (tag, name, value) {
      if (tag == 'a' && name == 'href') {
        if (value.substr(0, 1) === '?') {
          return `${name}="${value}"`;
        }
      }
    },
  });

  return messageClean;
}

/**
 * @function textToKey - Takes a human readable string and returns a key from it.
 * This key is used to look up the string in the translation files.
 *
 * If the item is a number, it will be converted to a string and then
 * processed as if it were a string.
 *
 * If the item is a string that contains word characters (`\w`) mixed with
 * non-word characters (`\W`), the non-word characters will be removed and
 * the resulting string will be converted to camelCase.
 *
 * @param {string} text - The text that will be converted to a key.
 * @returns {string} A key that is unique to the given text.
 *
 * Examples:
 * textToKey('hello world') => 'helloWorld'
 * textToKey('HELLO WORLD') => 'helloWorld'
 * textToKey('HELLO WORLD!!!') => 'helloWorld'
 * textToKey('HELLO WORLD!!!') => 'helloWorld'
 * textToKey('helloWorld') => 'helloWorld'
 * textToKey('helloWorld123') => 'helloWorld123'
 * textToKey('hello_world') => 'helloWorld'
 * textToKey('hello-world') => 'helloWorld'
 * textToKey('hello.world') => 'helloWorld'
 */

export function textToKey(text: string | number) {
  if (typeof text !== 'string' && typeof text !== 'number') {
    throw new Error('Parameter for textToKey function needs to be of type string or number');
  }
  if (typeof text === 'number') {
    text = String(text);
  }
  // If text is entirely uppercase, just lowercase it all
  if (text.match(/^([A-Z]+)$/)) {
    return text.toLowerCase();
  }
  /**
   * If text is entirely uppercase with trailing non-word chars,
   * strip the non-word chars and lowercase the rest
   */
  if (text.match(/^([A-Z]+[\W]*)$/)) {
    return text.replace(/\W/g, '').toLowerCase();
  }
  /**
   * If we have reached here, the text has word chars (`\w`) mixed with
   * non-word chars (`\W`), so we have to do more for proper transform
   */
  const transformedString = text
    // Matches any non-word character followed up by a word or number character
    .replace(/(\W)([\w\d])/g, (_, p1, p2) => {
      if (p1.match(/['’"”]/) && p2.match(/[a-z]/)) {
        return p2;
      }
      if (p1.match(/\W/) && p2.match(/[a-z]/)) {
        return p2.toUpperCase();
      }
      if (p1.match(/\W/) && p2.match(/\d/)) {
        return p2;
      }
      return p2;
    })
    .replace(/(\W)/g, '');

  return transformedString.charAt(0).toLowerCase() + transformedString.slice(1);
}
