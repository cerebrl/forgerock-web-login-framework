<script lang="ts">
  import type { HiddenValueCallback } from '@forgerock/javascript-sdk';

  export let callback: HiddenValueCallback;
  export let idx: number;

  const inputName = callback?.payload?.input?.[0].name || `hidden-value-${idx}`;
  const inputValue = callback?.getInputValue();
</script>

<input type="hidden" name={inputName} id={inputName} value={inputValue} />
