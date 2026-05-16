import './global.css';
import { AppProviders } from '@/providers/AppProviders';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useAuthInit } from '@/hooks/useAuth';

export default function App() {
  useAuthInit();

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
