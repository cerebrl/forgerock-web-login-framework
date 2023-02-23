import { readable, writable, type Readable, type Writable } from 'svelte/store';
import { z } from 'zod';

// TODO: Reevaluate use of JS versus JSON without breaking type generation for lib
// eslint-disable-next-line
// @ts-ignore
import fallback from '$locales/us/en/index.json';

export const stringsSchema = z
  .object({
    alreadyHaveAnAccount: z.string(),
    backToDefault: z.string(),
    backToLogin: z.string(),
    dontHaveAnAccount: z.string(),
    closeModal: z.string(),
    chooseDifferentUsername: z.string(),
    confirmPassword: z.string(),
    constraintViolationForPassword: z.string(),
    constraintViolationForValue: z.string(),
    continueWith: z.string(),
    customSecurityQuestion: z.string(),
    doesNotMeetMinimumCharacterLength: z.string(),
    ensurePasswordIsMoreThan: z.string(),
    ensurePasswordHasOne: z.string(),
    enterVerificationCode: z.string(),
    exceedsMaximumCharacterLength: z.string(),
    fieldCanNotContainFollowingCharacters: z.string(),
    fieldCanNotContainFollowingValues: z.string(),
    forgotPassword: z.string(),
    forgotUsername: z.string(),
    givenName: z.string(),
    inputRequiredError: z.string(),
    loading: z.string(),
    loginButton: z.string(),
    loginFailure: z.string(),
    loginHeader: z.string(),
    loginSuccess: z.string(),
    mail: z.string(),
    minimumNumberOfNumbers: z.string(),
    minimumNumberOfLowercase: z.string(),
    minimumNumberOfUppercase: z.string(),
    minimumNumberOfSymbols: z.string(),
    nameCallback: z.string(),
    nextButton: z.string(),
    notToExceedMaximumCharacterLength: z.string(),
    noLessThanMinimumCharacterLength: z.string(),
    passwordCallback: z.string(),
    passwordRequirements: z.string(),
    pleaseCheckValue: z.string(),
    pleaseConfirm: z.string(),
    preferencesMarketing: z.string(),
    preferencesUpdates: z.string(),
    provideCustomQuestion: z.string(),
    redirectingTo: z.string(),
    registerButton: z.string(),
    registerHeader: z.string(),
    registerSuccess: z.string(),
    requiredField: z.string(),
    securityAnswer: z.string(),
    securityQuestions: z.string(),
    securityQuestionsPrompt: z.string(),
    showPassword: z.string(),
    sn: z.string(),
    submitButton: z.string(),
    successMessage: z.string(),
    termsAndConditions: z.string(),
    termsAndConditionsLinkText: z.string(),
    tryAgain: z.string(),
    twoFactorAuthentication: z.string(),
    useValidEmail: z.string(),
    unrecoverableError: z.string(),
    unknownNetworkError: z.string(),
    userName: z.string(),
    usernameRequirements: z.string(),
    useTheAuthenticatorAppOnYourPhone: z.string(),
    validatedCreatePasswordCallback: z.string(),
    validatedCreateUsernameCallback: z.string(),
    valueRequirements: z.string(),
  })
  .strict();

export const partialStringsSchema = stringsSchema.partial();

// Ensure fallback follows schema
stringsSchema.parse(fallback);

export const locale: Writable<string | null> = writable('en-US');
export let strings: Readable<Record<string, string> | null>;

export function initialize(userLocale?: z.infer<typeof partialStringsSchema>) {
  if (userLocale) {
    /**
     * Allow widgets to overwrite select portions of the content
     */
    strings = readable({ ...fallback, ...userLocale });
  } else {
    strings = readable(fallback);
  }
}
