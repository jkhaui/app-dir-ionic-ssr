'use client';

import * as React from 'react';

export const ClientProfiler = ({
  children,
  enabled = true,
  id = 'AppRoot',
  onRenderCb = (id, phase, actualDuration, baseDuration) =>
    console.log(
      `${id} Perf Metrics:\nPhase: '${phase}'; Actual Duration: ${actualDuration}ms; Base Duration: ${baseDuration}ms`
    ),
}) => {
  if (!enabled) {
    return children;
  }

  return (
    <React.Profiler id={id} onRender={onRenderCb}>
      {children}
    </React.Profiler>
  );
};
