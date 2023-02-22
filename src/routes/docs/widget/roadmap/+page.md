# Future Support (not yet implemented)

## Planned for version 1.1

1. WebAuthn
2. Device Profile

## Planned for version 1.2+

1. Push Authentication
2. ReCAPTCHA
3. QR Code display
4. TextOutputCallback with scripts
5. Central Login
6. SAML

## Proposed future Widget APIs

### Modal customization

```js
new Widget({
  // ... previous config properties ...

  // All optional; default value is assigned below
  style: {
    modal: {
      backdrop: true, // boolean; display modal backdrop
    },
  },
});
```

### Multiple widget instances

Currently, the Login Widget supports only a single instance. There is a proposal to support multiple instances in the future. Let us know if this interests you.

## CSS Custom Property (aka CSS Variable) support

The Login Widget is currently customizable via the Tailwind config file. This limits the customization to build-time only. There's a proposal to have CSS Custom Property support, which will allow customization at the runtime. You can read more about [CSS Custom Properties on the MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
