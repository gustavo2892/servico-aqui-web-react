export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, whatsapp, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, whatsapp, password },
  };
}

export function signUpProviderRequest(
  name,
  email,
  whatsapp,
  password,
  category,
  price,
  description,
  cep,
  city,
  uf
) {
  return {
    type: '@auth/SIGN_UP_PROVIDER_REQUEST',
    payload: {
      name,
      email,
      whatsapp,
      password,
      category,
      price,
      description,
      cep,
      city,
      uf,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
