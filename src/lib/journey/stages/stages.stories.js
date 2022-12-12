import { CallbackType, FRStep } from '@forgerock/javascript-sdk';
import { expect, jest } from '@storybook/jest';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { writable } from 'svelte/store';

import { initialize } from '../config.store';
import Step from './stages.story.svelte';
import { loginStep, registrationStep, usernamePasswordStep } from './step.mock';
import {
  multipleProvidersLocalAuthFormStep,
  multipleProvidersLocalAuthNoFormStep,
  multipleProvidersNoLocalAuthStep,
  singleProviderLocalAuthFormStep,
  singleProviderLocalAuthNoFormStep,
} from '../callbacks/select-idp/select-idp.mock';

const frRegistrationStep = new FRStep(registrationStep);
const frLoginStep = new FRStep(loginStep);
const frUsernamePasswordStep = new FRStep(usernamePasswordStep);

const frSocialMultipleProvidersLocalAuthFormStep = new FRStep(multipleProvidersLocalAuthFormStep);
const frSocialMultipleProvidersLocalAuthNoFormStep = new FRStep(
  multipleProvidersLocalAuthNoFormStep,
);
const frSocialMultipleProvidersNoLocalAuthStep = new FRStep(multipleProvidersNoLocalAuthStep);
const frSocialSingleProviderLocalAuthFormStep = new FRStep(singleProviderLocalAuthFormStep);
const frSocialSingleProviderLocalAuthNoFormStep = new FRStep(singleProviderLocalAuthNoFormStep);

initialize();

export default {
  argTypes: {
    step: { control: false },
    submitForm: { control: false },
  },
  component: Step,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Journey/Step',
};

export const Generic = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frLoginStep.getStage(),
    step: frLoginStep,
  },
};
export const Registration = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frRegistrationStep.getStage(),
    step: frRegistrationStep,
  },
};

export const UsernamePassword = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([{ tree: 'Login' }]),
    },
    labelType: 'stacked',
    stage: frUsernamePasswordStep.getStage(),
    step: frUsernamePasswordStep,
  },
};

export const SocialMultipleProvidersLocalAuthForm = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frSocialMultipleProvidersLocalAuthFormStep.getStage(),
    step: frSocialMultipleProvidersLocalAuthFormStep,
  },
};

export const SocialMultipleProvidersLocalAuthNoForm = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frSocialMultipleProvidersLocalAuthNoFormStep.getStage(),
    step: frSocialMultipleProvidersLocalAuthNoFormStep,
  },
};

export const SocialMultipleProvidersNoLocalAuth = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frSocialMultipleProvidersNoLocalAuthStep.getStage(),
    step: frSocialMultipleProvidersNoLocalAuthStep,
  },
};

export const SocialSingleProviderLocalAuthForm = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frSocialSingleProviderLocalAuthFormStep.getStage(),
    step: frSocialSingleProviderLocalAuthFormStep,
  },
};

export const SocialSingleProviderLocalAuthNoForm = {
  args: {
    form: {
      icon: true,
      message: '',
      status: '',
      submit: jest.fn(),
    },
    journey: {
      loading: false,
      pop: jest.fn(),
      push: jest.fn(),
      stack: writable([]),
    },
    stage: frSocialSingleProviderLocalAuthNoFormStep.getStage(),
    step: frSocialSingleProviderLocalAuthNoFormStep,
  },
};

const Template = (args) => ({
  Component: Step,
  props: args,
});
export const LoginInteraction = Template.bind({});
export const RegistrationInteraction = Template.bind({});

RegistrationInteraction.args = {
  ...Registration.argTypes,
  ...Registration.args,
};

RegistrationInteraction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.tab();
  await userEvent.tab();

  const username = canvas.getByLabelText('Username');
  const password = canvas.getByLabelText('Password');
  const firstName = canvas.getByLabelText('First name');
  const lastName = canvas.getByLabelText('Last name');
  const email = canvas.getByLabelText('Email address');
  const specialOffers = canvas.getByRole('checkbox', { name: /special/ });
  const news = canvas.getByRole('checkbox', { name: /news/ });
  const securityQuestion = canvas.getByLabelText('Select a security question');
  const securityAnswer = canvas.getByLabelText('Security answer');
  const tocLink = canvas.getByRole('link', { name: 'View full Terms & Conditions' });
  const toc = canvas.getByRole('checkbox', { name: 'Please accept our Terms & Conditions' });

  const usernameCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.ValidatedCreateUsernameCallback,
  )[0];
  const passwordCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.ValidatedCreatePasswordCallback,
  )[0];
  const firstNameCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.StringAttributeInputCallback,
  )[0];
  const lastNameCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.StringAttributeInputCallback,
  )[1];
  const emailCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.StringAttributeInputCallback,
  )[2];
  const specialOffersCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.BooleanAttributeInputCallback,
  )[0];
  const newsOffersCb = frRegistrationStep.getCallbacksOfType(
    CallbackType.BooleanAttributeInputCallback,
  )[1];
  const securityQuestions = frRegistrationStep.getCallbacksOfType(
    CallbackType.KbaCreateCallback,
  )[0];
  const tocCb = frRegistrationStep.getCallbacksOfType(CallbackType.TermsAndConditionsCallback)[0];

  await expect(username).toHaveFocus();
  await userEvent.type(username, 'user');

  await userEvent.tab();
  await expect(firstName).toHaveFocus();
  await userEvent.type(firstName, 'my-name');

  await userEvent.tab();
  await expect(lastName).toHaveFocus();
  await userEvent.type(lastName, 'last-name');

  await userEvent.tab();
  await expect(email).toHaveFocus();
  await userEvent.type(email, 'myemail@email.com');

  await userEvent.tab();

  await expect(specialOffers).toHaveFocus();
  await userEvent.click(specialOffers);
  await userEvent.tab();

  await expect(news).toHaveFocus();
  await userEvent.click(news);
  await userEvent.tab();

  await userEvent.type(password, 'password');
  await expect(password).toHaveFocus();
  await userEvent.tab();
  await userEvent.tab();

  await expect(securityQuestion).toHaveFocus();
  await userEvent.selectOptions(securityQuestion, '0');
  await userEvent.tab();

  await expect(securityAnswer).toHaveFocus();
  await userEvent.type(securityAnswer, 'blue');
  await userEvent.tab();

  await expect(tocLink).toHaveFocus();
  await userEvent.tab();

  await expect(toc).toHaveFocus();
  await userEvent.click(toc);
  await userEvent.tab();

  const submit = canvas.getByRole('button', { name: 'Register' });
  await userEvent.click(submit);
  await expect(Registration.args.form.submit).toHaveBeenCalled();

  console.log(usernameCb);
  await expect(usernameCb.getInputValue()).toBe('user');
  await expect(passwordCb.getInputValue()).toBe('password');
  await expect(firstNameCb.getInputValue()).toBe('my-name');
  await expect(lastNameCb.getInputValue()).toBe('last-name');
  await expect(emailCb.getInputValue()).toBe('myemail@email.com');
  await expect(newsOffersCb.getInputValue()).toBe(true);
  await expect(specialOffersCb.getInputValue()).toBe(true);
  await expect(securityQuestions.payload.input[0].value).toBe('0');
  await expect(securityQuestions.payload.input[1].value).toBe('blue');
  await expect(tocCb.getInputValue()).toBe(true);
  console.log(securityQuestions);
};

LoginInteraction.args = {
  ...UsernamePassword.argTypes,
  ...UsernamePassword.args,
};

LoginInteraction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.tab();

  const nameCb = frUsernamePasswordStep.getCallbacksOfType(CallbackType.NameCallback)[0];
  const passwordCb = frUsernamePasswordStep.getCallbacksOfType(CallbackType.PasswordCallback)[0];

  const username = canvas.getByLabelText('Username');
  const password = canvas.getByLabelText('Password');
  await expect(username).toHaveFocus();
  await userEvent.type(username, 'username01');
  await expect(canvas.getByLabelText('Username').value).toEqual('username01');

  await userEvent.tab();

  await expect(password).toHaveFocus();
  await userEvent.type(password, 'Password123');

  await expect(canvas.getByLabelText('Password').value).toEqual('Password123');

  await userEvent.tab();
  await userEvent.tab();
  const signin = canvas.getByRole('button', { name: 'Sign in' });
  await expect(signin).toHaveFocus();
  await fireEvent.click(signin);

  await expect(UsernamePassword.args.form.submit).toHaveBeenCalled();

  await expect(nameCb.getInputValue()).toBe('username01');
  await expect(passwordCb.getInputValue()).toBe('Password123');
};
