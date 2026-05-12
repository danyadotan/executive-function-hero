import React from 'react';

interface CommitGraphProps {
  commitCount: number;
}

const CommitGraph: React.FC<CommitGraphProps> = ({ commitCount }) => {
  // Generate commit nodes based on count (max 10 visible)
  const visibleCommits = Math.min(commitCount, 10);
  const hasMoreCommits = commitCount > 10;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-5 hidden md:block">
      <svg width="80" height="400" className="opacity-60 hover:opacity-100 transition-opacity">
        {/* Main branch line */}
        <line
          x1="30"
          y1="20"
          x2="30"
          y2={20 + (visibleCommits - 1) * 35}
          stroke="#22c55e"
          strokeWidth="3"
        />

        {/* Branch line (appears after 3 commits) */}
        {commitCount > 3 && (
          <>
            <line x1="30" y1="125" x2="60" y2="125" stroke="#a855f7" strokeWidth="2" />
            <line x1="60" y1="125" x2="60" y2="195" stroke="#a855f7" strokeWidth="2" />
            <circle cx="60" cy="125" r="6" fill="#a855f7" />
            <circle cx="60" cy="160" r="6" fill="#a855f7" />
            {commitCount > 5 && (
              <>
                <line x1="60" y1="195" x2="30" y2="230" stroke="#a855f7" strokeWidth="2" />
              </>
            )}
          </>
        )}

        {/* Commit nodes */}
        {Array.from({ length: visibleCommits }).map((_, i) => {
          const y = 20 + i * 35;
          const isLatest = i === visibleCommits - 1;
          const isMerge = commitCount > 5 && i === 6;

          return (
            <g key={i}>
              <circle
                cx="30"
                cy={y}
                r={isLatest ? 10 : 8}
                fill={isMerge ? '#22c55e' : isLatest ? '#22d3ee' : '#22c55e'}
                className={isLatest ? 'animate-pulse' : ''}
              />
              {isLatest && (
                <text x="45" y={y + 4} fill="#22d3ee" fontSize="10" fontFamily="monospace">
                  HEAD
                </text>
              )}
            </g>
          );
        })}

        {/* More commits indicator */}
        {hasMoreCommits && (
          <text x="20" y="380" fill="#666" fontSize="12" fontFamily="monospace">
            +{commitCount - 10} more
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-2 text-xs text-purple-400/70 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>main</span>
        </div>
        {commitCount > 3 && (
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>feature</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitGraph;
