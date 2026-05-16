import * as Keychain from 'react-native-keychain';

const SERVICE = 'app.athris.wallet';

const KEYS = {
  PIN_HASH: 'athris_pin_hash',
  BIOMETRIC_ENABLED: 'athris_biometric_enabled',
  SESSION_TOKEN: 'athris_session_token',
  ONBOARDING_COMPLETE: 'athris_onboarding_complete',
} as const;

export async function setSecureItem(key: string, value: string): Promise<void> {
  await Keychain.setGenericPassword(key, value, {
    service: `${SERVICE}.${key}`,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function getSecureItem(key: string): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    service: `${SERVICE}.${key}`,
  });
  if (credentials && typeof credentials !== 'boolean') {
    return credentials.password;
  }
  return null;
}

export async function deleteSecureItem(key: string): Promise<void> {
  await Keychain.resetGenericPassword({ service: `${SERVICE}.${key}` });
}

export const secureKeys = KEYS;
