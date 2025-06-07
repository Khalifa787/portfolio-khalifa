import { useState } from 'react';
import {
    FaGraduationCap, FaBriefcase, FaChevronLeft,
    FaCode, FaProjectDiagram, FaPalette, FaCertificate
} from 'react-icons/fa';
import { userConfig } from '../../config/userConfig';
import DraggableWindow from './DraggableWindow';

interface NotesAppProps {
    isOpen: boolean;
    onClose: () => void;
}

type Section =
    | 'menu'
    | 'certifications'
    | 'education'
    | 'experience'
    | 'skills'
    | 'projects'
    | 'activities';

const NotesApp = ({ isOpen, onClose }: NotesAppProps) => {
    const [activeSection, setActiveSection] = useState<Section>('menu');

    const handleSectionClick = (section: Section) => {
        setActiveSection(section);
    };

    const handleBackClick = () => {
        setActiveSection('menu');
    };

    if (!isOpen) return null;

    const education = userConfig.education || [];
    const experience = userConfig.experience || [];
    const certifications = [
        {
            title: "Certified Ethical Hacker (CEH)",
            institution: "EC-Council",
            year: "2025",
            pdfUrl: "https://drive.google.com/file/d/1ed5_JmsjFQXIi7u0WpyInWcJFl9Ca1Ge/view?usp=sharing"
        }
    ];

    const skills = [
        ...userConfig.skills,
        "Metasploit", "Burp Suite", "Kali Linux", "Wireshark", "OWASP ZAP",
        "React", "Node.js", "MongoDB", "Express.js", "Docker", "Nmap"
    ];

    const projects = [
        {
            title: "Exploits en Capture The Flag (CTF)",
            description: "Participation à des plateformes comme Hack The Box, TryHackMe et Root Me pour développer mes compétences en cybersécurité offensive. Utilisation d'outils tels que Metasploit, Nmap, John the Ripper, Wireshark, et Nessus. Objectif : identifier des vulnérabilités, exécuter des exploits et résoudre des défis complexes sur des machines virtuelles sécurisées."
        },
        {
            title: "Audit de sécurité d'infrastructure",
            description: "Réalisation d'audits de sécurité sur des environnements réseau simulés : cartographie des risques, identification des failles potentielles, et recommandations d'amélioration."
        },
        {
            title: "Projet BDD/Réseau - Université",
            description: "Mise en place d'une infrastructure réseau avec base de données et gestion de la présence des étudiants. Technologies : SQL, TCP/IP, DNS, DHCP, gestion des utilisateurs."
        },
        {
            title: "Jeu vidéo avec IA - Gardien",
            description: "Développement d'un jeu intégrant des bots dotés d'intelligence artificielle. Gestion des comportements des IA, ainsi que la logique de combat. Participation active à la maintenance des règles d'analyse pour le moteur de jeu."
        },
        {
            title: "Analyseur de fichiers Python",
            description: "Création d'une application Java avec interface graphique (GUI) permettant d'analyser des dossiers de fichiers Python. Statistiques générées sur les lignes de code, structures de contrôle et fréquence des fonctions."
        }
    ];

    const activities = userConfig.hobbies || []; 

    const getWindowTitle = () => {
        switch (activeSection) {
            case 'menu': return 'Notes';
            case 'certifications': return 'Notes - Certifications';
            case 'education': return 'Notes - Formation';
            case 'experience': return 'Notes - Expérience';
            case 'skills': return 'Notes - Compétences';
            case 'projects': return 'Notes - Projets';
            case 'activities': return 'Notes - Activités';
            default: return 'Notes';
        }
    };

    const renderBackButton = () => (
        <button onClick={handleBackClick} className="flex items-center gap-2 text-gray-300 hover:text-gray-100 mb-4">
            <FaChevronLeft />
            <span>Retour au menu</span>
        </button>
    );

    const renderSection = () => {
        switch (activeSection) {
            case 'certifications':
                return (
                    <div>
                        {renderBackButton()}
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Certifications</h2>
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="mb-6">
                                <h3 className="text-lg text-white font-semibold">{cert.title}</h3>
                                <p className="text-gray-300">{cert.institution} ({cert.year})</p>
                                <a
                                    href={cert.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline mt-2 inline-block"
                                >
                                    Voir la certification en PDF
                                </a>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div>
                        {renderBackButton()}
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Formations</h2>
                        {education.map((item, idx) => (
                            <div key={idx} className="mb-4">
                                <h3 className="text-lg text-white font-semibold">{item.degree} - {item.major}</h3>
                                <p className="text-gray-300">{item.institution}, {item.location} ({item.year})</p>
                            </div>
                        ))}
                    </div>
                );
            case 'experience':
                return (
                    <div>
                        {renderBackButton()}
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Expériences professionnelles</h2>
                        {experience.map((item, idx) => (
                            <div key={idx} className="mb-4">
                                <h3 className="text-lg text-white font-semibold">{item.title}</h3>
                                <p className="text-gray-300">{item.company}, {item.location} ({item.period})</p>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div>
                        {renderBackButton()}
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Compétences</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-700 rounded text-sm text-gray-300">{skill}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div>
                        {renderBackButton()}
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Mes projets</h2>
                        {projects.map((project, idx) => (
                            <div key={idx} className="mb-4">
                                <h3 className="text-lg text-white font-semibold">{project.title}</h3>
                                <p className="text-gray-400">{project.description}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'activities':
                return (
                    <div>
                        {renderBackButton()}
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Activités</h2>
                        {activities.map((hobby, idx) => (
                            <p key={idx} className="text-gray-300">- {hobby}</p>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const renderMenu = () => (
        <div>
            <h2 className="text-2xl font-bold text-gray-200 mb-6">Mes Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors" onClick={() => handleSectionClick('certifications')}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                            <FaCertificate size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Certifications</h3>
                    </div>
                    <p className="text-gray-400">Consultez mes certifications techniques et professionnelles</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors" onClick={() => handleSectionClick('education')}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <FaGraduationCap size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Formation</h3>
                    </div>
                    <p className="text-gray-400">Mon parcours académique</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors" onClick={() => handleSectionClick('experience')}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                            <FaBriefcase size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Expérience Pro</h3>
                    </div>
                    <p className="text-gray-400">Mes expériences en entreprise et stages</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors" onClick={() => handleSectionClick('projects')}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <FaProjectDiagram size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Projets</h3>
                    </div>
                    <p className="text-gray-400">Mes projets académiques et personnels</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors" onClick={() => handleSectionClick('skills')}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                            <FaCode size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Compétences</h3>
                    </div>
                    <p className="text-gray-400">Mes compétences techniques et outils</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors" onClick={() => handleSectionClick('activities')}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
                            <FaPalette size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Activités</h3>
                    </div>
                    <p className="text-gray-400">Mes autres passions et centres d'intérêt</p>
                </div>
            </div>
        </div>
    );

    return (
        <DraggableWindow
            title={getWindowTitle()}
            onClose={onClose}
            initialPosition={{ x: Math.floor(window.innerWidth * 0.3), y: Math.floor(window.innerHeight * 0.2) }}
            className="w-[93vw] md:max-w-4xl max-h-[90vh]"
            initialSize={{ width: 700, height: 600 }}
        >
            <div className="overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 1.5rem)' }}>
                {activeSection === 'menu' ? renderMenu() : renderSection()}
            </div>
        </DraggableWindow>
    );
};

export default NotesApp;
