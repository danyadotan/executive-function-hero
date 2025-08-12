export enum GameState {
  START_MENU,
  PLAYING,
  LOADING,
  ERROR,
}

export interface Scene {
  story: string;
  image_prompt: string;
  choices: string[];
  feedback: string;
  score_change: number;
}

export interface DisplayScene extends Scene {
  imageUrl: string;
}

export interface StoryTurn {
    story: string;
    choice: string;
}