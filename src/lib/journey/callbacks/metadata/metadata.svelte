<script lang="ts">
  import type { z } from 'zod';

  import type {
    CallbackMetadata,
    SelfSubmitFunction,
    StepMetadata,
  } from '$journey/journey.interfaces';
  import type { styleSchema } from '$lib/style.store';
  import type { Maybe } from '$lib/interfaces';
  import type { MetadataCallback } from '@forgerock/javascript-sdk';

  export let callback: Maybe<MetadataCallback> = null;
  export let callbackMetadata: Maybe<CallbackMetadata> = null;
  export const selfSubmitFunction: Maybe<SelfSubmitFunction> = null;
  export let stepMetadata: Maybe<StepMetadata> = null;
  export const style: z.infer<typeof styleSchema> = {};

  $: {
    const data = callback && callback.getData();
    const payload = callback && callback.payload;
  }
</script>
