<script lang="ts">
  import type { FRStep } from '@forgerock/javascript-sdk';
  import type { z } from 'zod';

  import Centered from '$components/primitives/box/centered.svelte';
  import Generic from './generic.svelte';
  import { initialize as initializeLinks } from '$lib/links.store';
  import OneTimePassword from './one-time-password.svelte';
  import Registration from './registration.svelte';
  import { buildCallbackMetadata, buildStepMetadata } from '$journey/_utilities/metadata.utilities';
  import { initCheckValidation } from './_utilities/step.utilities';
  import { initialize as initializeStyles, partialStyleSchema } from '$lib/style.store';
  import Login from './login.svelte';

  import type { StageFormObject, StageJourneyObject } from '$journey/journey.interfaces';

  export let form: StageFormObject;
  export let journey: StageJourneyObject;
  export let stage: string;
  export let step: FRStep;
  export let style: z.infer<typeof partialStyleSchema>;

  let stageName;
  let stageJson;

  // Mimic what happens in the `journey.store` module
  // Check if stage attribute is serialized JSON
  if (stage && stage.includes('{')) {
    try {
      stageJson = JSON.parse(stage);
    } catch (err) {
      console.warn('Stage attribute value was not parsable');
    }
  } else if (stage) {
    stageName = stage;
  }

  // Create metadata
  const callbackMetadata = buildCallbackMetadata(step, initCheckValidation(), stageJson);
  const stepMetadata = buildStepMetadata(callbackMetadata, stageJson, stageName);
  const metadata = {
    callbacks: callbackMetadata,
    step: stepMetadata,
  };

  // Initialize stores
  initializeLinks({ termsAndConditions: '/' });
  initializeStyles(style);
</script>

<Centered>
  {#if stage === 'OneTimePassword'}
    <OneTimePassword componentStyle="modal" {form} {journey} {metadata} {step} />
  {:else if stage === 'DefaultLogin'}
    <Login componentStyle="modal" {form} {journey} {metadata} {step} />
  {:else if stage === 'DefaultRegistration'}
    <Registration componentStyle="modal" {form} {journey} {metadata} {step} />
  {:else}
    <Generic componentStyle="modal" {form} {journey} {metadata} {step} />
  {/if}
</Centered>
