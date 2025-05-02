import { useEffect, useState } from 'react';
import MacToolbar from '../components/global/MacToolbar';
import MacTerminal from '../components/global/MacTerminal';
import MobileDock from '../components/global/MobileDock';
import DesktopDock from '../components/global/DesktopDock';
import NotesApp from '../components/global/NotesApp';
import GitHubViewer from '../components/global/GitHubViewer';
import ResumeViewer from '../components/global/ResumeViewer';

interface AppLayoutProps {
  initialBg: string;
  backgroundMap: Record<string, string>;
}

type TutorialStep = {
  title: string;
  content: string;
  action?: () => void;
  buttonText?: string;
};

export default function Desktop({ initialBg, backgroundMap }: AppLayoutProps) {
  const [currentBg, setCurrentBg] = useState<string>(initialBg);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  const [activeApps, setActiveApps] = useState({
    terminal: false,
    notes: false,
    github: false,
    resume: false,
    spotify: false,
  });

  useEffect(() => {
    const lastBg = localStorage.getItem('lastBackground');
    const hasCompletedTutorial = localStorage.getItem('hasCompletedTutorial') === 'true';

    if (lastBg === initialBg) {
      const bgKeys = Object.keys(backgroundMap);
      const availableBgs = bgKeys.filter((bg) => bg !== lastBg);
      const newBg =
        availableBgs[Math.floor(Math.random() * availableBgs.length)];
      setCurrentBg(newBg);
    }

    // Afficher le tutoriel uniquement si l’utilisateur ne l’a jamais vu
    if (!hasCompletedTutorial) {
      setShowTutorial(true);
    }

    localStorage.setItem('lastBackground', currentBg);
  }, [initialBg, backgroundMap]);

  // Réinitialiser le tutoriel
  const resetTutorial = () => {
    setCurrentTutorialStep(0);
    setShowTutorial(true);
    localStorage.setItem('hasCompletedTutorial', 'false');
  };

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Bienvenue sur mon portfolio ! 👋",
      content: "Voici un portfolio inspiré de macOS où vous pouvez explorer mes projets et mon parcours. Je vais vous guider à travers les fonctionnalités !",
      action: () => setShowNotes(true),
      buttonText: "C'est parti"
    },
    {
      title: "Application Notes",
      content: "Voici mon application Notes où vous trouverez des informations détaillées sur ma formation, mes expériences et mes compétences.",
      action: () => {
        setShowNotes(false);
        setShowGitHub(true);
      },
      buttonText: "Suivant : Projets"
    },
    {
      title: "Projets GitHub",
      content: "Vous pouvez explorer mes projets, voir leur structure, consulter le code, les captures d’écran et les liens vers les dépôts GitHub.",
      action: () => {
        setShowGitHub(false);
        setShowTerminal(true);
      },
      buttonText: "Suivant : Terminal"
    },
    {
      title: "Terminal",
      content: "Ce terminal interactif vous permet d’en apprendre davantage sur moi. Essayez des questions comme « Quelles sont tes compétences ? » ou « Parle-moi de ton expérience ».",
      action: () => {
        setShowTerminal(false);
      },
      buttonText: "Suivant : Explorer"
    },
    {
      title: "Explorer",
      content: "Maintenant que vous avez vu les bases, n'hésitez pas à explorer le reste du portfolio via le dock ci-dessous.",
      action: () => {
        setShowTutorial(false);
      },
      buttonText: "Merci ! Je continue seul·e"
    }
  ];

  const handleTutorialAction = () => {
    if (tutorialSteps[currentTutorialStep].action) {
      tutorialSteps[currentTutorialStep].action!();
    }

    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
      localStorage.setItem('hasCompletedTutorial', 'true');
    }
  };

  const handleAppOpen = (app: keyof typeof activeApps) => {
    setActiveApps(prev => ({
      ...prev,
      [app]: true
    }));
  };

  const handleAppClose = (app: keyof typeof activeApps) => {
    setActiveApps(prev => ({
      ...prev,
      [app]: false
    }));
  };

  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${backgroundMap[currentBg]})` }}
      />

      <div className='relative z-10'>
        <MacToolbar 
          onTerminalClick={() => setShowTerminal(true)} 
          onShowTutorial={resetTutorial}
        />
      </div>

      <div className='relative z-0 flex items-center justify-center h-[calc(100vh-10rem)] md:h-[calc(100vh-1.5rem)] pt-6'>
      </div>

      <MobileDock
        onGitHubClick={() => {
          setShowGitHub(true);
          handleAppOpen('github');
        }}
        onNotesClick={() => {
          setShowNotes(true);
          handleAppOpen('notes');
        }}
        onResumeClick={() => {
          setShowResume(true);
          handleAppOpen('resume');
        }}
        onTerminalClick={() => {
          setShowTerminal(true);
          handleAppOpen('terminal');
        }}
      />
      <DesktopDock
        onTerminalClick={() => {
          setShowTerminal(true);
          handleAppOpen('terminal');
        }}
        onNotesClick={() => {
          setShowNotes(true);
          handleAppOpen('notes');
        }}
        onGitHubClick={() => {
          setShowGitHub(true);
          handleAppOpen('github');
        }}
        activeApps={activeApps}
      />

      <NotesApp isOpen={showNotes} onClose={() => {
        setShowNotes(false);
        handleAppClose('notes');
      }} />
      <GitHubViewer isOpen={showGitHub} onClose={() => {
        setShowGitHub(false);
        handleAppClose('github');
      }} />
      <ResumeViewer isOpen={showResume} onClose={() => {
        setShowResume(false);
        handleAppClose('resume');
      }} />
      <MacTerminal isOpen={showTerminal} onClose={() => {
        setShowTerminal(false);
        handleAppClose('terminal');
      }} />
      {showTutorial && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="bg-gray-800/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl max-w-xs animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">{tutorialSteps[currentTutorialStep].title}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {tutorialSteps[currentTutorialStep].content}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {currentTutorialStep + 1} sur {tutorialSteps.length}
              </span>
              <button
                onClick={handleTutorialAction}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                {tutorialSteps[currentTutorialStep].buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
