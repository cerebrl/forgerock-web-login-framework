<script lang="ts">
  import type { PollingWaitCallback } from '@forgerock/javascript-sdk';
  import type { z } from 'zod';

  import Spinner from '$components/primitives/spinner/spinner.svelte';
  import Text from '$components/primitives/text/text.svelte';

  import type {
    CallbackMetadata,
    SelfSubmitFunction,
    StepMetadata,
  } from '$journey/journey.interfaces';
  import type { styleSchema } from '$lib/style.store';
  import type { Maybe } from '$lib/interfaces';

  // Unused props. Setting to const prevents errors in console
  export const stepMetadata: Maybe<StepMetadata> = null;
  export const style: z.infer<typeof styleSchema> = {};

  export let callback: PollingWaitCallback;
  export let callbackMetadata: Maybe<CallbackMetadata>;
  export let selfSubmitFunction: Maybe<SelfSubmitFunction> = null;

  let message: string;

  // Ensure this is written outside of the Reactive blog, or it get's called multiple times
  setTimeout(() => {
    if (callbackMetadata) { callbackMetadata.derived.isReadyForSubmission = true; }
    selfSubmitFunction && selfSubmitFunction();
  }, callback.getWaitTime());

  $: {
    callback = callback as PollingWaitCallback;
    message = callback.getMessage();
  }
</script>

<div class="tw_text-center">
  <Spinner colorClass="tw_text-primary-light" layoutClasses="tw_h-24 tw_mb-6 tw_w-24" />
  <Text>{message}</Text>
</div>
