import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsGithub, BsSpotify, BsFilePdf, BsStickyFill, BsCalendar } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';
import { RiTerminalFill } from 'react-icons/ri';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTerminalClick?: () => void;
}

export default function HelpModal({ 
  isOpen, 
  onClose, 
  onTerminalClick
}: HelpModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setActiveStep(0);
    }
  }, [isOpen]);

  const steps = [
    {
      title: "Bienvenue sur mon portfolio !",
      content: "Ceci est un portfolio inspiré de macOS avec des fonctionnalités interactives. Laisse-moi te faire un tour !",
      animation: "animate-fade-in",
      button: null
    },
    {
      title: "Le Terminal",
      content: "Le MacTerminal est ton assistant IA. Pose-lui toutes tes questions à propos de moi, mes compétences ou mon expérience !",
      animation: "animate-slide-in-right",
      button: {
        text: "Ouvrir le Terminal",
        icon: <RiTerminalFill size={20} />,
        onClick: () => {
          if (onTerminalClick) {
            onTerminalClick();
            handleClose();
          }
        }
      }
    },
    {
      title: "Le Dock",
      content: "Le dock en bas contient toutes les fonctionnalités principales de mon portfolio. Chaque icône représente une section différente :",
      animation: "animate-slide-in-left",
      button: null,
      features: [
        { icon: <BsGithub size={20} />, text: "Projets GitHub" },
        { icon: <BsStickyFill size={20} />, text: "Notes du CV" },
        { icon: <BsFilePdf size={20} />, text: "Visualiseur de CV" },
        { icon: <BsCalendar size={20} />, text: "Planifier un appel" },
        { icon: <BsSpotify size={20} />, text: "Playlist Spotify" },
        { icon: <FaLink size={20} />, text: "Liens de contact" },
        { icon: <RiTerminalFill size={20} />, text: "Terminal" }
      ]
    },
    {
      title: "La Barre de menu",
      content: "Utilise la barre de menu pour accéder à mon CV, mes projets et mes infos de contact. Survole mon nom pour une surprise !",
      animation: "animate-slide-in-up",
      button: null
    }
  ];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />
      <div 
        className={`relative bg-gray-900/95 rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <IoClose size={24} />
        </button>
        
        <div className={`${steps[activeStep].animation} mb-4`}>
          <h2 className="text-2xl font-bold text-white mb-2">{steps[activeStep].title}</h2>
          <p className="text-gray-300 mb-4">{steps[activeStep].content}</p>
          
          {steps[activeStep].features && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {steps[activeStep].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="text-white">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeStep ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {steps[activeStep].button && (
              <button
                onClick={steps[activeStep].button?.onClick}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                {steps[activeStep].button?.icon}
                {steps[activeStep].button?.text}
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {activeStep === steps.length - 1 ? 'Compris !' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
