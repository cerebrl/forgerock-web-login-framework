import xss from 'xss';
import { get } from 'svelte/store';
import { z } from 'zod';

import { locale, strings } from '$lib/locale.store';

/**
 * Do not allow strings with angle brackets, just to be extra safe
 *
 * Demo: https://regex101.com/r/Mw9vTB/1
 */
const valueSchema = z.record(z.string().regex(/^[^<>]*$/)).optional();

export function getLocaleDir(acceptLanguageHeader: string): string {
  if (typeof acceptLanguageHeader !== 'string') {
    throw new Error('AM_DOMAIN_PATH is not a string');
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
    return 'us/en';
  }

  const splitResult = matchResult[1].split('-');
  if ((!Array.isArray(splitResult) && !splitResult) || !splitResult[0]) {
    console.warn('Locale from Accept-Language header not recognized');
    return 'us/en';
  }

  return `${splitResult[1] || 'us'}/${splitResult[0]}`.toLowerCase();
}

export function interpolate(
  key: string,
  values?: z.infer<typeof valueSchema> | null,
  externalText?: string,
): string {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error('No key provided to t()');

  // Grab the text from the translations store.
  const contentObj = get(strings);
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

  const messageClean = xss(messageDirty);

  return messageClean;
}
