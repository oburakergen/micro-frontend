import React, { Suspense, useState, useEffect } from 'react';
import { useAppDispatch, addNotification } from '@micro-frontend/store';
import ErrorBoundary from './ErrorBoundary';

const TigaHealthApp = React.lazy(() => import('tigaHealthPhr/App'));

const Loading: React.FC = () => (
  <div className="tiga-loading">
    <div className="spinner"></div>
    <p>Loading Tiga Health PHR...</p>
  </div>
);

const ConnectionError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="tiga-error">
    <h3>Connection Error</h3>
    <p>Could not connect to Tiga Health PHR service.</p>
    <p>Please check if the service is available.</p>
    <button onClick={onRetry}>Retry Connection</button>
  </div>
);

const TigaHealthWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const [connectionError, setConnectionError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    dispatch(addNotification({
      type: 'info',
      message: 'Tiga Health module loaded',
      source: 'tigaHealthPhr',
    }));
  }, [dispatch]);

  const handleRetry = () => {
    setConnectionError(false);
    setRetryCount((prev) => prev + 1);
  };

  if (connectionError) {
    return <ConnectionError onRetry={handleRetry} />;
  }

  return (
    <div className="tiga-health-wrapper">
      <ErrorBoundary
        onError={() => setConnectionError(true)}
        fallback={<ConnectionError onRetry={handleRetry} />}
      >
        <Suspense fallback={<Loading />}>
          <TigaHealthApp key={retryCount} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TigaHealthWrapper;
