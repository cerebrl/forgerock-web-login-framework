const colorLib = require('color');

module.exports = function (theme) {
  return {
    '.button-apple': {
      borderColor: theme('colors.secondary.light'),
      backgroundColor: theme('colors.black'),
      color: theme('colors.white'),
      '&:hover::before, &:focus::before': {
        opacity: `0.1`,
      },
    },
    '.button-apple_dark': {
      borderColor: theme('colors.secondary.light'),
      backgroundColor: theme('colors.white'),
      color: theme('colors.black'),
      '&:hover::before, &:focus::before': {
        opacity: `0.1`,
      },
    },
    '.button-facebook': {
      borderColor: theme('colors.secondary.light'),
      backgroundColor: '#1877F2',
      color: theme('colors.white'),
      '&:hover::before, &:focus::before': {
        opacity: `0.1`,
      },
    },
    '.button-facebook_dark': {
      borderColor: theme('colors.secondary.light'),
      backgroundColor: theme('colors.white'),
      color: '#1877F2',
      '&:hover::before, &:focus::before': {
        opacity: `0.1`,
      },
    },
    '.button-google': {
      borderColor: theme('colors.secondary.light'),
      backgroundColor: theme('colors.white'),
      color: theme('colors.black'),
      '&:hover::before, &:focus::before': {
        opacity: `0.1`,
      },
    },
    '.button-google_dark': {
      borderColor: theme('colors.secondary.light'),
      backgroundColor: theme('colors.white'),
      color: theme('colors.black'),
      '&:hover::before, &:focus::before': {
        opacity: `0.1`,
      },
    },
    '.input-policies': {
      fontSize: theme('fontSize.sm'),

      p: {
        fontWeight: theme('fontWeight.bold'),
        margin: theme('spacing.1'),
      },
      ul: {
        margin: theme('spacing.1'),
      },
    },
    '.kba-fieldset': {
      position: 'relative',
      borderColor: theme('colors.secondary.DEFAULT'),
      borderBottomWidth: '0',
      borderTopWidth: '1px',
      borderTopStyle: 'dashed',
      paddingTop: theme('spacing.6'),

      '& > h2': {
        display: 'none',
      },
      '&:first-of-type': {
        borderTopWidth: '0',
        marginTop: theme('spacing.10'),
      },
      '&:first-of-type > h2': {
        display: 'block',
      },
      '&:first-of-type:after': {
        borderColor: theme('colors.secondary.DEFAULT'),
        borderTopWidth: '1px',
        content: '""',
        display: 'block',
        position: 'absolute',
        right: '0',
        top: '-0.1em',
        width: '45%',
      },
      '&:first-of-type:before': {
        borderColor: theme('colors.secondary.DEFAULT'),
        borderTopWidth: '1px',
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '-0.1em',
        width: '45%',
      },
      '&:first-of-type .kba-lock-icon': {
        display: 'flex',
      },
      '&:last-of-type': {
        borderBottomWidth: '1px',
        marginBottom: theme('spacing.8'),
        paddingBottom: theme('spacing.4'),
      },
    },
    '.kba-fieldset_dark': {
      borderColor: colorLib(theme('colors.secondary.DEFAULT')).darken(0.25).toString(),

      '&:after': {
        borderColor: colorLib(theme('colors.secondary.DEFAULT')).darken(0.25).toString(),
      },
      '&:before': {
        borderColor: colorLib(theme('colors.secondary.DEFAULT')).darken(0.25).toString(),
      },
    },
    '.kba-lock-icon': {
      display: 'none',
      justifyContent: 'center',
      position: 'absolute',
      top: `-${theme('spacing.3')}`,
      width: '100%',

      '& > svg': {
        color: theme('colors.secondary.DEFAULT'),
        fill: 'currentcolor',
        top: `-${theme('spacing.3')}`,
        width: '3em',
      },
    },
    '.kba-lock-icon_dark': {
      '& > svg': {
        color: theme('colors.secondary.light'),
        fill: 'currentcolor',
      },
    },
    '.password-button': {
      alignItems: 'center',
      backgroundColor: colorLib(theme('colors.background.light')).darken(0.02).toString(),
      borderLeft: '0 !important',
      borderTopLeftRadius: '0px !important',
      borderBottomLeftRadius: '0px !important',
      display: 'flex',
      lineHeight: theme('spacing.6'),
      padding: `${theme('spacing.1')} ${theme('spacing.3')}`,
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    '.password-button_dark': {
      backgroundColor: colorLib(theme('colors.body.dark')).fade(0.5).toString(),
    },
    '.password-icon': {
      color: theme('colors.secondary.dark'),
      fill: 'currentcolor',
    },
    '.password-icon_dark': {
      color: theme('colors.secondary.light'),
    },
  };
};
