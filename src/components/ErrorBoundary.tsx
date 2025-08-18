import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Security-focused Error Boundary for Three.js and other components
 * Prevents crashes from propagating and provides graceful degradation
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Security: Log errors safely without exposing sensitive data
    console.error('ErrorBoundary caught an error:', {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 5).join('\n'), // Limit stack trace
      componentStack: errorInfo.componentStack?.split('\n').slice(0, 3).join('\n') // Limit component stack
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Security: Provide safe fallback UI without exposing error details
      return this.props.fallback || (
        <div 
          className="flex items-center justify-center min-h-[200px] text-gray-500 dark:text-gray-400"
          role="alert"
          aria-live="polite"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <p>Unable to load 3D background</p>
            <p className="text-sm opacity-75">The page will continue to work normally</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;