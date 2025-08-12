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

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START_MENU);
  const [currentScene, setCurrentScene] = useState<DisplayScene | null>(null);
  const [storyHistory, setStoryHistory] = useState<StoryTurn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [scoreFeedback, setScoreFeedback] = useState<{ key: number; text: string; score: number } | null>(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isDyslexiaFont, setDyslexiaFont] = useState(() => {
    return localStorage.getItem('dyslexiaFontEnabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('dyslexiaFontEnabled', String(isDyslexiaFont));
    if (isDyslexiaFont) {
      document.body.classList.add('font-dyslexia');
    } else {
      document.body.classList.remove('font-dyslexia');
    }
  }, [isDyslexiaFont]);


  const handleStartGame = useCallback(async () => {
    setGameState(GameState.LOADING);
    setError(null);
    setScore(0);
    try {
      const sceneData = await getNextScene([], 'Begin Game', 0);
      setCurrentScene(sceneData);
      setStoryHistory([]);
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

  const renderGameHUD = () => (
    <div className="fixed top-0 left-0 right-0 p-4 z-10">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center bg-black/50 p-3 relative">
         <div className="ui-corner top-left"></div>
         <div className="ui-corner top-right"></div>
         <div className="ui-corner bottom-left"></div>
         <div className="ui-corner bottom-right"></div>
        <h2 className="text-2xl md:text-3xl text-pink-400 font-pixel tracking-widest">FLOW</h2>
        <div className="text-3xl md:text-4xl text-yellow-300 font-pixel">{score}</div>
        <SettingsButton onClick={() => setSettingsOpen(true)} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (gameState) {
      case GameState.START_MENU:
        return <StartScreen onStart={handleStartGame} />;
      case GameState.LOADING:
        return <LoadingIndicator />;
      case GameState.PLAYING:
        if (currentScene) {
          return (
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center pt-24 pb-8 px-4">
              <SceneDisplay scene={currentScene} />
              <div className="w-full mt-8 grid grid-cols-1 gap-4">
                {currentScene.choices.map((choice, index) => (
                  <ChoiceButton key={index} choice={choice} onChoose={handleChoice} />
                ))}
              </div>
            </div>
          );
        }
        return null;
      case GameState.ERROR:
        return <ErrorDisplay message={error} onRetry={storyHistory.length > 0 ? () => handleChoice(storyHistory[storyHistory.length - 1].choice) : handleStartGame} />;
      default:
        return null;
    }
  };

  const scoreColor = scoreFeedback && scoreFeedback.score > 0 ? 'text-green-400' : 'text-yellow-400';

  return (
    <main className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 relative ${isDyslexiaFont ? 'font-dyslexia' : ''}`}>
      {gameState !== GameState.START_MENU && renderGameHUD()}
       {scoreFeedback && (
        <div key={scoreFeedback.key} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 bg-black bg-opacity-80 rounded-lg ui-panel text-center animate-pop-out">
          <div className="ui-corner top-left"></div>
          <div className="ui-corner top-right"></div>
          <div className="ui-corner bottom-left"></div>
          <div className="ui-corner bottom-right"></div>
          <p className="text-4xl font-pixel text-yellow-300">{scoreFeedback.text}</p>
          <p className={`text-5xl font-pixel mt-2 ${scoreColor}`}>+{scoreFeedback.score}</p>
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