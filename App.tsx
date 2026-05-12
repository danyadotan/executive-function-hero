import React, { useState, useCallback, useEffect } from 'react';
import { GameState, type DisplayScene, type StoryTurn } from './types';
import { getNextScene } from './services/geminiService';
import StartScreen from './components/StartScreen';
import SceneDisplay from './components/SceneDisplay';
import ChoiceButton from './components/ChoiceButton';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import SettingsPanel from './components/SettingsPanel';
import SettingsButton from './components/SettingsButton';
import LearnPage from './components/LearnPage';

// Extended app state to include Learn page
enum AppView {
  HOME = 'HOME',
  LEARN = 'LEARN',
  GAME = 'GAME',
}

const App: React.FC = () => {
  // App navigation
  const [appView, setAppView] = useState<AppView>(AppView.HOME);

  // Game state
  const [gameState, setGameState] = useState<GameState>(GameState.START_MENU);
  const [currentScene, setCurrentScene] = useState<DisplayScene | null>(null);
  const [storyHistory, setStoryHistory] = useState<StoryTurn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [commitCount, setCommitCount] = useState(0);
  const [scoreFeedback, setScoreFeedback] = useState<{ key: number; text: string; score: number } | null>(null);

  // Settings state
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  // Accessibility settings with localStorage persistence
  const [isDyslexiaFont, setDyslexiaFont] = useState(() => {
    return localStorage.getItem('dyslexiaFontEnabled') === 'true';
  });

  const [isReducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('reducedMotionEnabled') === 'true' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isCalmMode, setCalmMode] = useState(() => {
    return localStorage.getItem('calmModeEnabled') === 'true';
  });

  const [isHighContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('highContrastEnabled') === 'true';
  });

  // Sensory break reminder
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [playTime, setPlayTime] = useState(0);

  // Persist accessibility settings
  useEffect(() => {
    localStorage.setItem('dyslexiaFontEnabled', String(isDyslexiaFont));
    if (isDyslexiaFont) {
      document.body.classList.add('font-dyslexia');
    } else {
      document.body.classList.remove('font-dyslexia');
    }
  }, [isDyslexiaFont]);

  useEffect(() => {
    localStorage.setItem('reducedMotionEnabled', String(isReducedMotion));
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  useEffect(() => {
    localStorage.setItem('calmModeEnabled', String(isCalmMode));
    if (isCalmMode) {
      document.documentElement.classList.add('calm-mode');
    } else {
      document.documentElement.classList.remove('calm-mode');
    }
  }, [isCalmMode]);

  useEffect(() => {
    localStorage.setItem('highContrastEnabled', String(isHighContrast));
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Sensory break reminder timer (every 20 minutes of gameplay)
  useEffect(() => {
    let interval: number | undefined;

    if (appView === AppView.GAME && gameState === GameState.PLAYING) {
      interval = window.setInterval(() => {
        setPlayTime((prev) => {
          const newTime = prev + 1;
          // Show reminder every 20 minutes (1200 seconds)
          if (newTime > 0 && newTime % 1200 === 0) {
            setShowBreakReminder(true);
            setTimeout(() => setShowBreakReminder(false), 10000);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [appView, gameState]);

  const handleStartGame = useCallback(async () => {
    setAppView(AppView.GAME);
    setGameState(GameState.LOADING);
    setError(null);
    setScore(0);
    setCommitCount(0);
    try {
      const sceneData = await getNextScene([], 'Begin Game', 0);
      setCurrentScene(sceneData);
      setStoryHistory([]);
      setCommitCount(1);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState(GameState.ERROR);
    }
  }, []);

  const handleChoice = useCallback(async (choice: string) => {
    if (!currentScene) return;

    setGameState(GameState.LOADING);
    setError(null);

    const newTurn: StoryTurn = {
      story: currentScene.story,
      choice: choice,
    };
    const updatedHistory = [...storyHistory, newTurn];

    try {
      const sceneData = await getNextScene(updatedHistory, choice, score);
      setCurrentScene(sceneData);
      setStoryHistory(updatedHistory);

      const newScore = score + sceneData.score_change;
      setScore(newScore);
      setCommitCount(prev => prev + 1);

      if(sceneData.score_change !== 0) {
        setScoreFeedback({ key: Date.now(), text: sceneData.feedback, score: sceneData.score_change });
      }

      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState(GameState.ERROR);
    }
  }, [currentScene, storyHistory, score]);

  const handleNavigateToLearn = useCallback(() => {
    setAppView(AppView.LEARN);
  }, []);

  const handleNavigateToHome = useCallback(() => {
    setAppView(AppView.HOME);
    setGameState(GameState.START_MENU);
  }, []);

  const renderGameHUD = () => (
    <div className="fixed top-0 left-0 right-0 p-4 z-10">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center bg-black/50 p-3 relative">
         <div className="ui-corner top-left"></div>
         <div className="ui-corner top-right"></div>
         <div className="ui-corner bottom-left"></div>
         <div className="ui-corner bottom-right"></div>
        <h2 className="text-xl md:text-2xl text-purple-400 font-pixel tracking-wider">COMMITS</h2>
        <div className="text-3xl md:text-4xl text-green-400 font-pixel">{score}</div>
        <SettingsButton onClick={() => setSettingsOpen(true)} />
      </div>
    </div>
  );

  const renderGameContent = () => {
    switch (gameState) {
      case GameState.START_MENU:
        return <StartScreen onStart={handleStartGame} onLearn={handleNavigateToLearn} />;
      case GameState.LOADING:
        return <LoadingIndicator />;
      case GameState.PLAYING:
        if (currentScene) {
          return (
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center pt-24 pb-8 px-4">
              <SceneDisplay scene={currentScene} />
              <div className="w-full mt-8 grid grid-cols-1 gap-4">
                {currentScene.choices.map((choice, index) => (
                  <ChoiceButton key={index} choice={choice} onChoose={handleChoice} index={index} />
                ))}
              </div>

              {/* Sensory tip during gameplay */}
              <div className="mt-6 w-full">
                <div className="p-3 rounded bg-purple-900/30 border border-purple-400/30 text-center">
                  <p className="text-sm text-purple-300">
                    Remember: There are no wrong choices here. Every action earns FLOW points.
                  </p>
                </div>
              </div>
            </div>
          );
        }
        return null;
      case GameState.ERROR:
        return (
          <ErrorDisplay
            message={error}
            onRetry={storyHistory.length > 0 ? () => handleChoice(storyHistory[storyHistory.length - 1].choice) : handleStartGame}
          />
        );
      default:
        return null;
    }
  };

  const scoreColor = scoreFeedback && scoreFeedback.score > 0 ? 'text-green-400' : 'text-yellow-400';

  // Build class names for accessibility modes
  const mainClasses = [
    'min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 relative',
    isDyslexiaFont ? 'font-dyslexia' : '',
  ].filter(Boolean).join(' ');

  return (
    <main className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 relative ${isDyslexiaFont ? 'font-dyslexia' : ''}`}>
      {gameState !== GameState.START_MENU && renderGameHUD()}

      {/* Commit Graph visualization */}
      {gameState === GameState.PLAYING && (
        <CommitGraph commitCount={commitCount} />
      )}

      {scoreFeedback && (
        <div key={scoreFeedback.key} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 bg-black bg-opacity-80 rounded-lg ui-panel text-center animate-pop-out">
          <div className="ui-corner top-left"></div>
          <div className="ui-corner top-right"></div>
          <div className="ui-corner bottom-left"></div>
          <div className="ui-corner bottom-right"></div>
          <p className="text-3xl font-pixel text-green-400">{scoreFeedback.text}</p>
          <p className={`text-4xl font-pixel mt-2 ${scoreColor}`}>+{scoreFeedback.score}</p>
        </div>
      )}
      {renderContent()}
      {isSettingsOpen && (
        <SettingsPanel
          onClose={() => setSettingsOpen(false)}
          isDyslexiaFont={isDyslexiaFont}
          onToggleDyslexiaFont={() => setDyslexiaFont(prev => !prev)}
        />
      )}
    </main>
  );
};

export default App;
