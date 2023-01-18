<script lang="ts">
  import type { SuspendedTextOutputCallback, TextOutputCallback } from '@forgerock/javascript-sdk';
  import sanitize from 'xss';

  import Text from '$components/primitives/text/text.svelte';
  import Button  from '$components/primitives/button/button.svelte';
  import T from '$components/_utilities/locale-strings.svelte';

  import type {
    CallbackMetadata,
    SelfSubmitFunction,
    StepMetadata,
  } from '$journey/journey.interfaces';
  import type { Style } from '$lib/style.store';
  import type { Maybe } from '$lib/interfaces';

  // Unused props. Setting to const prevents errors in console
  export const callbackMetadata: Maybe<CallbackMetadata> = null;
  export const selfSubmitFunction: Maybe<SelfSubmitFunction> = null;
  export let stepMetadata: Maybe<StepMetadata> = null;
  export const style: Style = {};

  export let callback: never;
  
  let typedCallback = callback as SuspendedTextOutputCallback | TextOutputCallback;
  let dirtyMessage = typedCallback.getMessage();
  let cleanMessage = sanitize(dirtyMessage);
  let shouldRenderTextOutputNext = false; 

  $: {
    typedCallback = callback as SuspendedTextOutputCallback | TextOutputCallback;
    dirtyMessage = typedCallback.getMessage();
    cleanMessage = sanitize(dirtyMessage);
    shouldRenderTextOutputNext = stepMetadata !== null && (stepMetadata as StepMetadata).isStepSelfSubmittable && !(stepMetadata as StepMetadata).isUserInputOptional
  }
</script>

<Text classes="tw_font-bold tw_mt-6">
  {@html cleanMessage}
</Text>

{#if shouldRenderTextOutputNext}
    <Button busy={false} style="primary" type="submit" width="full">
      <T key="nextButton" />
    </Button>
{/if}

