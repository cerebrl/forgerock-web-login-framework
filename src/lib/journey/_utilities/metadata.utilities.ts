import {
  CallbackType,
  ConfirmationCallback,
  SelectIdPCallback,
  type FRCallback,
} from '@forgerock/javascript-sdk';

import type { CallbackMetadata, WidgetStep } from '$journey/journey.interfaces';

const selfSubmittingCallbacks = [
  CallbackType.ConfirmationCallback,
  CallbackType.DeviceProfileCallback,
  CallbackType.PollingWaitCallback,
  CallbackType.SelectIdPCallback,
] as const;

export type SelfSubmittingCallbacks = typeof selfSubmittingCallbacks[number];

const userInputCallbacks = [
  CallbackType.BooleanAttributeInputCallback,
  CallbackType.ChoiceCallback,
  CallbackType.ConfirmationCallback,
  CallbackType.KbaCreateCallback,
  CallbackType.NameCallback,
  CallbackType.NumberAttributeInputCallback,
  CallbackType.PasswordCallback,
  CallbackType.ReCaptchaCallback,
  CallbackType.SelectIdPCallback,
  CallbackType.StringAttributeInputCallback,
  CallbackType.TermsAndConditionsCallback,
  CallbackType.ValidatedCreatePasswordCallback,
  CallbackType.ValidatedCreateUsernameCallback,
] as const;

export type UserInputCallbacks = typeof userInputCallbacks[number];

// This eventually will be overridable by user of framework
const forceUserInputOptionalityCallbacks = {
  SelectIdPCallback: (callback: FRCallback) => {
    const selectIdpCb = callback as SelectIdPCallback;
    return !!selectIdpCb
      .getProviders()
      .find((provider) => provider.provider === 'localAuthentication');
  },
};

/**
 * @function buildCallbackMetadata - Constructs an array of callback metadata that matches to original callback array
 * @param {object} step - The modified Widget step object
 * @param checkValidation
 * @returns {array}
 */
export function buildCallbackMetadata(
  step: WidgetStep,
  checkValidation: (callback: FRCallback) => boolean,
) {
  return step?.callbacks.map((callback, idx) => {
    return {
      canForceUserInputOptionality: canForceUserInputOptionality(callback),
      isFirstInvalidInput: checkValidation(callback),
      isReadyForSubmission: isCbReadyByDefault(callback),
      isSelfSubmitting: isSelfSubmitting(callback),
      isUserInputRequired: requiresUserInput(callback),
      idx,
    };
  });
}

/**
 * @function buildStepMetadata - Constructs a metadata object that summarizes the step from AM
 * @param {array} callbackMetadataArray - The array returned from buildCallbackMetadata
 * @returns {object}
 */
export function buildStepMetadata(callbackMetadataArray: CallbackMetadata[]) {
  const numOfUserInputCbs = callbackMetadataArray.filter((cb) => !!cb.isUserInputRequired).length;
  const userInputOptional = isUserInputOptional(callbackMetadataArray, numOfUserInputCbs);
  const shouldRenderNextButton = callbackMetadataArray.every(
    (cb) => !cb.isUserInputRequired && !cb.isSelfSubmitting,
  );

  return {
    isStepSelfSubmittable: isStepSelfSubmittable(callbackMetadataArray, userInputOptional),
    isUserInputOptional: userInputOptional,
    numOfCallbacks: callbackMetadataArray.length,
    numOfSelfSubmittableCbs: callbackMetadataArray.filter((cb) => !!cb.isSelfSubmitting).length,
    numOfUserInputCbs: numOfUserInputCbs,
    shouldRenderNextButton,
  };
}

export function isCbReadyByDefault(callback: FRCallback) {
  if (callback.getType() === CallbackType.ConfirmationCallback) {
    const cb = callback as ConfirmationCallback;
    if (cb.getOptions().length === 1) {
      return true;
    }
  }
  return false;
}

export function canForceUserInputOptionality(callback: FRCallback) {
  // See if a callback function exists within this collection
  const fn =
    forceUserInputOptionalityCallbacks[
    callback.getType() as keyof typeof forceUserInputOptionalityCallbacks
    ];

  // If there is a function, run it and it will return a boolean
  return fn && fn(callback);
}

/**
 * @function isSelfSubmitting -
 * @param {object} callback - generic FRCallback from JavaScript SDK
 * @returns
 */
export function isSelfSubmitting(callback: FRCallback) {
  return selfSubmittingCallbacks.includes(callback.getType() as SelfSubmittingCallbacks);
}

/**
 * @function isStepSelfSubmittable -
 * @param {array} callbacks - CallbackMetadata
 * @returns
 */
export function isStepSelfSubmittable(callbacks: CallbackMetadata[], userInputOptional: boolean) {
  if (userInputOptional) {
    return true;
  }

  const unsubmittableCallbacks = callbacks.filter(
    (callback) => callback.isUserInputRequired && !callback.isSelfSubmitting,
  );
  return !unsubmittableCallbacks.length;
}

/**
 * @function isStepReadyToSubmit -
 * @param  {array} callbacks - CallbackMetadata
 * @returns
 */
export function isStepReadyToSubmit(callbacks: CallbackMetadata[]) {
  const selfSubmittableCbs = callbacks.filter((callback) => callback.isSelfSubmitting);
  const selfSubmittableCbsReadyForSubmission = callbacks.filter(
    (callback) => callback.isSelfSubmitting && callback.isReadyForSubmission,
  );
  // Are all self-submittable callbacks ready to be submitted
  return selfSubmittableCbsReadyForSubmission.length === selfSubmittableCbs.length;
}

/**
 *
 * @param  {object} callback - Generic callback provided by JavaScript SDK
 * @returns
 */
export function requiresUserInput(callback: FRCallback) {
  if (callback.getType() === CallbackType.SelectIdPCallback) {
    return false;
  }

  if (callback.getType() === CallbackType.ConfirmationCallback) {
    const cb = callback as ConfirmationCallback;
    if (cb.getOptions().length === 1) {
      return false;
    }
  }
  return userInputCallbacks.includes(callback.getType() as UserInputCallbacks);
}

// Notice this function can take a user provided argument function to
// override behavior (this doesn't have to be well defined)
export function isUserInputOptional(
  callbackMetadataArray: CallbackMetadata[],
  numOfUserInputCbs: number,
  fn?: any,
) {
  // default reducer function to check if both overriding callback exists
  // along with user input required callbacks
  const fallbackFn = (prev: boolean, curr: CallbackMetadata) => {
    if (curr.canForceUserInputOptionality && numOfUserInputCbs > 0) {
      prev = true;
    }
    return prev;
  };
  // Call reduce function with either fallback or user provided function
  return callbackMetadataArray.reduce(fn || fallbackFn, false);
}
