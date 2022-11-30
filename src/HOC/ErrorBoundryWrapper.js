import React from 'react';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

// HOC wrapping the passed component with error boundary here
export default function errorBoundry(WrappedComponent) {
  const Component = (
    <ErrorBoundary>
      <WrappedComponent />
    </ErrorBoundary>
  );
  return Component;
}