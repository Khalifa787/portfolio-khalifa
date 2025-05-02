import { useState, useEffect, useRef } from 'react';
import { FaRegFolderClosed } from 'react-icons/fa6';
import { userConfig } from '../../config/userConfig';
import DraggableWindow from './DraggableWindow';

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatHistory = {
  messages: Message[];
  input: string;
};

interface MacTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MESSAGES_PLACEHOLDER = [
  'Tapez votre question...',
  'Quelles sont vos compétences ?',
  'Où êtes-vous situé ?',
  'Quels sont vos projets ?'
];

export default function MacTerminal({ isOpen, onClose }: MacTerminalProps) {
  const [chatHistory, setChatHistory] = useState<ChatHistory>({ messages: [], input: '' });
  const [isTyping, setIsTyping] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentMessage = MESSAGES_PLACEHOLDER[currentPlaceholderIndex];

    const animatePlaceholder = () => {
      if (isDeleting) {
        if (placeholder.length === 0) {
          setIsDeleting(false);
          setCurrentPlaceholderIndex((prev) => (prev + 1) % MESSAGES_PLACEHOLDER.length);
          timeout = setTimeout(animatePlaceholder, 400);
        } else {
          setPlaceholder((prev) => prev.slice(0, -1));
          timeout = setTimeout(animatePlaceholder, 80);
        }
      } else {
        if (placeholder.length === currentMessage.length) {
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        } else {
          setPlaceholder(currentMessage.slice(0, placeholder.length + 1));
          timeout = setTimeout(animatePlaceholder, 120);
        }
      }
    };

    timeout = setTimeout(animatePlaceholder, 100);
    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, currentPlaceholderIndex]);

  const messageAccueil = `Bienvenue sur mon portfolio !\n\nNom : ${userConfig.name}\nPoste : ${userConfig.role}\nLocalisation : ${userConfig.location}\n\nContact : ${userConfig.contact.email}\nGitHub : ${userConfig.social.github}\n\nPosez-moi une question pour en savoir plus.`;

  useEffect(() => {
    setChatHistory((prev) => ({
      ...prev,
      messages: [...prev.messages, { role: 'assistant', content: messageAccueil }],
    }));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory.messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatHistory((prev) => ({ ...prev, input: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = chatHistory.input.trim().toLowerCase();
    if (!userInput) return;

    let response = "❌ Je n’ai pas compris. Veuillez reformuler ou explorer les autres sections.";

    if (userInput.includes('compétence') || userInput.includes('skills')) {
      response = `Voici mes compétences :\n${userConfig.skills.map(s => `- ${s}`).join('\n')}`;
    } else if (userInput.includes('projet') || userInput.includes('projects')) {
      response = `Voici quelques-uns de mes projets :\n
- Exploits en Capture The Flag (CTF)\nParticipation à des plateformes comme Hack The Box, TryHackMe et Root Me pour développer mes compétences en cybersécurité offensive. Utilisation d'outils tels que Metasploit, Nmap, John the Ripper, Wireshark, et Nessus. Objectif : identifier des vulnérabilités, exécuter des exploits et résoudre des défis complexes sur des machines virtuelles sécurisées.

- Audit de sécurité d'infrastructure\nRéalisation d'audits de sécurité sur des environnements réseau simulés : cartographie des risques, identification des failles potentielles, et recommandations d'amélioration.

- Projet BDD/Réseau - Université\nMise en place d'une infrastructure réseau avec base de données et gestion de la présence des étudiants. Technologies : SQL, TCP/IP, DNS, DHCP, gestion des utilisateurs.

- Jeu vidéo avec IA - Gardien\nDéveloppement d'un jeu intégrant des bots dotés d'intelligence artificielle. Gestion des comportements des IA, ainsi que la logique de combat. Participation active à la maintenance des règles d'analyse pour le moteur de jeu.

- Analyseur de fichiers Python\nDéveloppement d'une application Java avec interface GUI pour analyser des fichiers Python et produire des statistiques.`;
    } else if (userInput.includes('localisation') || userInput.includes("où")) {
      response = `J'habite en région parisienne, mais je suis mobile dans toute la France.`;
    } else if (userInput.includes('contact') || userInput.includes('email')) {
      response = `Vous pouvez me contacter à : ${userConfig.contact.email}`;
    } else if (userInput.includes('github')) {
      response = `Voici mon GitHub : https://github.com/Khalifa787`;
    }

    setChatHistory((prev) => ({
      messages: [
        ...prev.messages,
        { role: 'user', content: chatHistory.input },
        { role: 'assistant', content: response },
      ],
      input: '',
    }));
  };

  if (!isOpen) return null;

  return (
    <DraggableWindow
      title={`${userConfig.website} ⸺ zsh`}
      onClose={onClose}
      initialPosition={{ x: Math.floor(window.innerWidth * 0.1), y: Math.floor(window.innerHeight * 0.1) }}
      initialSize={{ width: 700, height: 500 }}
      className="bg-black/80 backdrop-blur-sm"
    >
      <div className='p-4 text-gray-200 font-mono text-sm h-full flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto bg-black/50 rounded-lg p-4'>
          {chatHistory.messages.map((msg, index) => (
            <div key={index} className='mb-2'>
              {msg.role === 'user' ? (
                <div className='flex items-start space-x-2'>
                  <span className='text-green-400 font-bold'>{'>'}</span>
                  <pre className='whitespace-pre-wrap'>{msg.content}</pre>
                </div>
              ) : (
                <div className='flex items-start space-x-2'>
                  <span className='text-green-400 font-bold'>${userConfig.website}:</span>
                  <pre className='whitespace-pre-wrap'>{msg.content}</pre>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className='mt-2 bg-black/50 rounded-lg p-2'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
            <span className='whitespace-nowrap text-green-400 font-bold'>{userConfig.website} root %</span>
            <input
              type='text'
              value={chatHistory.input}
              onChange={handleInputChange}
              className='w-full sm:flex-1 bg-transparent outline-none text-white placeholder-gray-400'
              placeholder={placeholder}
            />
          </div>
        </form>
      </div>
    </DraggableWindow>
  );
}