import React, { ReactNode } from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// 错误边界一定要class来实现
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };
  // 当发生了渲染错误的时候(子组件发生异常), 这个方法就会被调用，这个值就会被赋给state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    } else {
      return children; // 正常渲染
    }
  }
}
