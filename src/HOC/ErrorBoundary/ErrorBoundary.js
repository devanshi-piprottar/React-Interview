import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({ error, errorInfo });
    }

    render() {
        const { hasError, error, errorInfo } = this.state;
        if (hasError) {  
            return (  
              <div>  
                <h2>Something went wrong.</h2>  
                <details style={{ whiteSpace: 'pre-wrap' }}>  
                  {error && error.toString()}  
                  <br />  
                  {errorInfo.componentStack}
                </details>  
              </div>  
            );  
          }  

        return this.props.children;
    }
}