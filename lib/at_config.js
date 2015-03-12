AccountsTemplates.configureRoute('signIn')
AccountsTemplates.configureRoute('forgotPwd')
AccountsTemplates.configureRoute('resetPwd')

// Not sure if necessary, just in case.
AccountsTemplates.configure({
  forbidClientAccountCreation: true
})

AccountsTemplates.configure({
  // Behaviour
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: true,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,

  // Client-side Validation
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/',

  // Texts
  texts: {
    pwdLink_link: 'Olvidaste tu contraseña?',
    signInLink_pre: 'Si ya tenes una cuenta, ',
    signInLink_link: 'entra.',
    info: {
      emailSent: "Recibiras un email con instrucciones para recuperar tu contraseña"
    },
    button: {
      changePwd: "Password Text",
      enrollAccount: "Enroll Text",
      forgotPwd: "ENVIAR EMAIL DE RESET",
      resetPwd: "Renovar",
      signIn: "Entrar",
    },
    title: {
      changePwd: "Cambia tu contraseña",
      forgotPwd: "Recupera tu contraseña",
      resetPwd: "Renova tu contraseña",
      signIn: "Login"
    },
    errors: {
      mustBeLoggedIn: "Debes estar logueado para ingresar",
      pwdMismatch: "Las contraseñas no coinciden",
    }
  }
});
