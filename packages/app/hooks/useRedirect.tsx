import { useCallback, useState, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/router';
import { LoadingOverlay } from 'app/components/ui/loading';

// Custom hook for dynamic redirect with loading message
const useRedirect = () => {
  const { push } = useRouter(); // Solito router for web
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Carregando...');

  // Perform redirect with platform-specific navigation
  const redirect = useCallback(
    (to: string, message: string = 'Carregando...') => {
      setLoadingMessage(message);
      setIsRedirecting(true);

      // Simulate a small delay to ensure loading message is visible
      setTimeout(() => {
        if (Platform.OS === 'web') {
          // Web: Use Solito/Next.js router
          push(to);
        }
        // Reset state after redirect
        setIsRedirecting(false);
      }, 500); // 500ms delay for smooth transition
    },
    [push]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsRedirecting(false);
    };
  }, []);

  // Render loading overlay if redirecting
  const renderLoading = useMemo(
    () => (isRedirecting ? <LoadingOverlay message={loadingMessage} /> : null),
    [isRedirecting, loadingMessage]
  );

  return { redirect, renderLoading };
};

export default useRedirect;