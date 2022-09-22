<script lang="ts">
  import type { ConfirmationCallback, TextOutputCallback } from '@forgerock/javascript-sdk';

  import Button from '$components/primitives/button/button.svelte';

  import xss from 'xss';
  export let callback: TextOutputCallback;
  export let choice: ConfirmationCallback;

  const options = choice.getOptions();

  $: message = callback.getMessage();

  const ignoreBody = ['script'];
  const sanitized = xss(message, {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ignoreBody,
    onTag: function onTag(tag, _html, options) {
      // callback which will filter out all script tags and replace it with an empty string
      // Do not process the contents of stripIgnoreTagBody and do nothing
      // got this from https://github.com/leizongmin/js-xss/issues/242
      if (!options.isWhite && options.isClosing && ignoreBody.indexOf(tag) === -1) {
        return '';
      }
    },
  });

  $: selected = choice.getDefaultOption(); // gets the index position

  function setValue(index: number) {
    selected = index;
  }
</script>

<p class="tw_text-base tw_text-center tw_py-4 tw_text-secondary-dark dark:tw_text-secondary-light">
  {sanitized}
</p>
{#each options as opt, index}
  <Button
    style={selected === index ? 'primary' : 'secondary'}
    type="button"
    width="auto"
    onClick={() => setValue(index)}
  >
    {opt}
  </Button>
{/each}
