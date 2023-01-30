<script>
  import Image from './image.svelte';
</script>

# ForgeRock Web Login Framework

## WARNING: ALPHA VERSION

**This is a early preview (alpha) of a development framework for generating a JavaScript Widget into an existing self-hosted SPA (React, Vue, Angular, etc.). Eventually, this same framework will also generate a ForgeRock Login App for self-hosting. This project is not yet officially supported and is not recommended for any project development. If you use this, you accept all the risks that come with completely unsupported software.**

<Image>

![Screenshot of modal Widget](/img/modal-widget-light.png)

</Image>

## Summary

The Login Widget produced by this framework is intended to be an all-inclusive, UI component that can be installed with any modern JavaScript app for handling the default login, registration and related user flows. It can be used within a React, Vue, Angular or any other modern JavaScript framework (does not currently support Node.js or server-rendering (SSR)).

## ForgeRock Login Widget

The Login Widget, currently in alpha, is an embeddable JavaScript component that requires no "runtime" UI libraries or frameworks, allowing it to be used within a React, Angular, Vue, etc. application without any additional dependencies.

This Widget helps you easily integrate your existing or new apps with the ForgeRock platform and its journeys. It supports the rendering of the built-in nodes and their corresponding callbacks within authentication and self-service journeys. [Please see our "Roadmap" section for current limitations and planned features](/docs/widget/roadmap).

[Please visit our "Widget Docs" for the quick-start and full API documentation](/docs/widget).

## ForgeRock Login App

This is a future proposal that would leverage this framework to produce an independent, customizable application for self-hosting, in addition to producing the Login Widget. This Login App would be recommended for use in building a custom, self-hosted, centralized login experience. Let us know if this is of interest to you.

## Contributing to the Framework

If you'd like to contribute to the development of this framework, [please visit our "Contributing" docs for guidelines.](/docs/contributing).

## Disclaimer

> **This code is provided by ForgeRock on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law. ForgeRock does not represent or warrant or make any guarantee regarding the use of this code or the accuracy, timeliness or completeness of any data or information relating to this code, and ForgeRock hereby disclaims all warranties whether express, or implied or statutory, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and any warranty of non-infringement. ForgeRock shall not have any liability arising out of or related to any use, implementation or configuration of this code, including but not limited to use for any commercial purpose. Any action or suit relating to the use of the code may be brought only in the courts of a jurisdiction wherein ForgeRock resides or in which ForgeRock conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
