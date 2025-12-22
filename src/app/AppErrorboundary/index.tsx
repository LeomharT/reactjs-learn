import { Alert, Button, Card, Result } from 'antd';
import React, { type ErrorInfo } from 'react';

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  { hasError: boolean; error?: Error; errorInfo?: ErrorInfo }
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState((state) => ({ ...state, error, errorInfo }));
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Card>
          <Result
            status='error'
            styles={{ body: { padding: 0 } }}
            title={this.state.error?.name}
            subTitle={this.state.error?.message}
            extra={[
              <Button
                key='home'
                type='primary'
                onClick={() => (window.location.href = '/home')}
              >
                Home Page
              </Button>,
              <Button key='reflash' onClick={() => window.location.reload()}>
                Reflash
              </Button>,
            ]}
          >
            <div>
              <Alert
                type='error'
                title={`${this.state.error?.name}: ${this.state.error?.message}`}
                description={<pre>{this.state.errorInfo?.componentStack}</pre>}
              />
            </div>
          </Result>
        </Card>
      );
    }

    return this.props.children;
  }
}
