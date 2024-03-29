import { UserManager, type ConfigOptions } from '@forgerock/javascript-sdk';
import { writable, type Writable } from 'svelte/store';

import type { Maybe } from '$lib/interfaces';

export interface UserStore extends Pick<Writable<UserStoreValue>, 'subscribe'> {
  get: (getOptions?: ConfigOptions) => void;
  reset: () => void;
}
export interface UserStoreValue {
  completed: boolean;
  error: Maybe<{
    code?: Maybe<number>;
    message: Maybe<string>;
    troubleshoot: Maybe<string>;
  }>;
  loading: boolean;
  successful: boolean;
  response: unknown;
}

export const userStore: Writable<UserStoreValue> = writable({
  completed: false,
  error: null,
  loading: false,
  successful: false,
  response: null,
});

/**
 * @function initialize - Initializes the user store with a get function and a reset function
 * @param {object} initOptions - The options to pass to the UserManager.getCurrentUser function
 * @returns {object} - The user store
 */
export function initialize(initOptions?: ConfigOptions) {
  /**
   * Get user info from the server
   * New state is returned in your `userEvents.subscribe` callback function
   * @params: getOptions?: ConfigOptions
   * @returns: Promise<void>
   */
  async function get(getOptions?: ConfigOptions) {
    /**
     * Create an options object with getOptions overriding anything from initOptions
     * TODO: Does this object merge need to be more granular?
     */
    const options = {
      ...initOptions,
      ...getOptions,
    };

    userStore.set({
      completed: false,
      error: null,
      loading: true,
      successful: false,
      response: null,
    });

    try {
      const user = await UserManager.getCurrentUser(options);

      userStore.set({
        completed: true,
        error: null,
        loading: false,
        successful: true,
        response: user,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        userStore.set({
          completed: true,
          error: {
            message: err.message,
            troubleshoot: null,
          },
          loading: false,
          successful: false,
          response: null,
        });
      }
    }
  }

  function reset() {
    userStore.set({
      completed: false,
      error: null,
      loading: false,
      successful: false,
      response: null,
    });
  }

  return {
    get,
    reset,
    subscribe: userStore.subscribe,
  };
}
