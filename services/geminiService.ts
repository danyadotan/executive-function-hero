import type { DisplayScene, StoryTurn } from "../types";

// Pre-written demo scenes for when no API key is available
const DEMO_SCENES: DisplayScene[] = [
  {
    story: "Welcome to the Commit Realm, brave developer! I'm Keif the Kraken, and I'll be your guide. You stand before the Great Terminal, ready to begin your Git journey. The repository stretches before you like an endless ocean of possibilities.",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Initialize a new repository (git init)",
      "Look around the Commit Realm first",
      "Ask Keif for advice"
    ],
    feedback: "WELCOME!",
    score_change: 0
  },
  {
    story: "Excellent choice! You've initialized your first repository. A warm glow surrounds you as the .git folder materializes. 'Wonderful!' I say, wrapping a tentacle around my clipboard. 'Now you have a place to track all your changes. Every commit is like a save point in your adventure!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Create your first commit (git commit)",
      "Check the repository status (git status)",
      "Create a new branch (git branch)"
    ],
    feedback: "INITIALIZED!",
    score_change: 50
  },
  {
    story: "You run git status and see the current state of your working directory. 'Smart move!' I beam. 'Always know where you stand before making changes. I see you have some untracked files waiting to join your adventure.' The terminal glows with helpful information.",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Add files to staging (git add)",
      "Create a new branch for features",
      "Review what changes were made"
    ],
    feedback: "GOOD THINKING!",
    score_change: 30
  },
  {
    story: "You stage your files with git add. They shimmer as they move to the staging area, ready to be committed. 'Perfect!' I exclaim. 'The staging area is like a waiting room - you decide exactly what goes into each commit. You're learning fast!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Commit the staged changes",
      "Check what's staged (git diff --staged)",
      "Unstage a file (git reset)"
    ],
    feedback: "STAGED!",
    score_change: 40
  },
  {
    story: "You create your first commit! A beautiful crystal forms in the commit graph, glowing with the energy of your saved work. 'Magnificent!' I cheer, all eight tentacles waving. 'This commit is now part of history. You can always come back to this moment!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Create a feature branch (git branch)",
      "Push to remote (git push)",
      "View the commit log (git log)"
    ],
    feedback: "COMMITTED!",
    score_change: 75
  },
  {
    story: "You create a new branch called 'feature'. The timeline splits, showing two parallel paths! 'Branching is one of Git's superpowers,' I explain. 'You can work on new features without affecting the main timeline. It's like having multiple save files!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Switch to the new branch (git checkout)",
      "List all branches (git branch -a)",
      "Make changes on this branch"
    ],
    feedback: "BRANCHED!",
    score_change: 60
  },
  {
    story: "You switch to your feature branch. The world around you shifts subtly - you're now in a parallel timeline! 'Here you can experiment freely,' I say with a knowing smile. 'When you're ready, we can merge your changes back to main. No pressure!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Make some changes and commit",
      "Switch back to main branch",
      "Check which branch you're on"
    ],
    feedback: "SWITCHED!",
    score_change: 45
  },
  {
    story: "After working on your feature, it's time to merge! You switch back to main and prepare to bring your changes together. 'Merging is like reuniting timelines,' I explain. 'Usually it goes smoothly, but sometimes there are conflicts to resolve. Don't worry - conflicts are just conversations between code!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Merge the feature branch (git merge)",
      "Rebase instead (git rebase)",
      "Review the differences first"
    ],
    feedback: "READY TO MERGE!",
    score_change: 35
  },
  {
    story: "The merge completes successfully! Your feature branch flows into main like two rivers joining. The commit graph shows the beautiful merge commit connecting both histories. 'You did it!' I celebrate. 'You've mastered the basics of Git! Remember: every expert was once a beginner.'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Push to share with others (git push)",
      "Start a new feature",
      "Take a well-deserved break"
    ],
    feedback: "MERGED!",
    score_change: 100
  },
  {
    story: "Congratulations, brave developer! You've completed your first Git adventure. Your commit graph sparkles with your accomplishments. 'Remember,' I say warmly, 'Git is your friend. It keeps your work safe and lets you explore without fear. Until next time, happy coding!'",
    image_prompt: "",
    imageUrl: "",
    choices: [
      "Start a new adventure",
      "Review what you learned",
      "Celebrate your success!"
    ],
    feedback: "CHAMPION!",
    score_change: 50
  }
];

let currentSceneIndex = 0;

export async function getNextScene(
  history: StoryTurn[],
  choice: string,
  score: number
): Promise<DisplayScene> {
  // Simulate a brief delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));

  // Get the next scene in sequence
  const scene = DEMO_SCENES[currentSceneIndex];
  currentSceneIndex = (currentSceneIndex + 1) % DEMO_SCENES.length;

  return scene;
}

export function resetDemo() {
  currentSceneIndex = 0;
}
