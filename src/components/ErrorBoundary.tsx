import React from 'react';

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error('[PortfolioOS]', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full min-h-screen flex-col items-center justify-center gap-4 bg-black p-6 text-center font-mono text-white">
          <div className="font-pixel text-coral text-lg">SYSTEM ERROR</div>
          <p className="max-w-lg text-xs text-white/60">
            Ada komponen yang gagal dimuat. Coba refresh. Detail error di console.
          </p>
          <pre className="max-w-full overflow-auto rounded border border-white/10 bg-white/5 p-3 text-left text-[10px] text-red-300">
            {this.state.error.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="rounded border border-coral/40 px-4 py-2 font-pixel text-xs text-coral hover:bg-coral/10"
          >
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
