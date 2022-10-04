<script lang="ts">
  import type { ChoiceCallback } from '@forgerock/javascript-sdk';

  import Centered from '$components/primitives/box/centered.svelte';
  import HiddenValue from './hidden-value.svelte';

  export let callback: ChoiceCallback;
</script>

<Centered>
  <HiddenValue {callback} idx={0} />
</Centered>
