import React, { Component } from 'react';
import Globe2DFallback from '../3d/Globe2DFallback';

export default class ErrorBoundary3D extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D WebGL Context/Rendering fallback triggered:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Globe2DFallback />;
    }
    return this.props.children;
  }
}
