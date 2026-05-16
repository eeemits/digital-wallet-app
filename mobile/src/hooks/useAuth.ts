import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { signIn, signOut, getSession } from '@/services/auth.service';
import { getSecureItem, secureKeys } from '@/lib/secure-storage';
import { config } from '@/lib/config';
import { DEMO_USER } from '@/constants/mock-data';
import { navigate, resetToLogin, resetToMainTabs } from '@/navigation/navigationRef';

export function useAuthInit() {
  const { setSession, setLoading, setHasPin } = useAuthStore();

  useEffect(() => {
    async function init() {
      try {
        const pin = await getSecureItem(secureKeys.PIN_HASH);
        setHasPin(!!pin);

        if (config.demoMode) {
          setSession(null);
          return;
        }

        const session = await getSession();
        setSession(session);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [setSession, setLoading, setHasPin]);
}

export function useLogin() {
  const { setSession } = useAuthStore();

  return async (email: string, password: string) => {
    const session = await signIn(email, password);
    setSession(session);
    resetToMainTabs();
  };
}

export function useDemoLogin() {
  const { setSession } = useAuthStore();

  return () => {
    setSession({
      userId: DEMO_USER.id,
      email: DEMO_USER.email,
      fullName: DEMO_USER.fullName,
    });
    resetToMainTabs();
  };
}

export function useLogout() {
  const { logout } = useAuthStore();

  return async () => {
    await signOut();
    logout();
    resetToLogin();
  };
}
