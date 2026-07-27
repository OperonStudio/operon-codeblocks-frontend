export const CommonEndpoints = {
  HEALTH: "health",
} as const;

export const AuthEndpoints = {
  LOGIN: "login",
  LOGOUT: "logout",
  SIGNUP: "sign-up",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "reset-password",
} as const;

export const DashboardEndpoints = {
  PROJECTS: "projects",
  API_KEYS: "api-keys",
} as const;

const endpointGroups = {
  CommonEndpoints,
  AuthEndpoints,
  DashboardEndpoints,
} as const;

type Endpoint = {
  [
    K in keyof typeof endpointGroups
  ]: (typeof endpointGroups)[K][keyof (typeof endpointGroups)[K]];
}[keyof typeof endpointGroups];

export const getEndpoint = (endpoint: Endpoint): string => {
  return `/api/${endpoint}`;
};
