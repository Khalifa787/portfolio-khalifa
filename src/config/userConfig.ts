import neurospeccompanionmerged from './projects/neurospeccompanionmerged.json';
import scheds from './projects/scheds.json';
import fadedTextRestoration from './projects/fadedtextrestoration.json';
import clinicalmain from './projects/clinicalmain.json';
import seatReservation from './projects/seatreservation.json';
import nucpaBalloons from './projects/nucpa-balloons.json';
import nucpaBalloonsApi from './projects/nucpaballoonsapi.json';
import portfolio from './projects/portfolio.json';
import foodies from './projects/foodies.json';

export const userConfig = {
    // Informations personnelles
    name: 'Khalifa Mebarki',
    role: 'Étudiant en informatique',
    location: 'Paris, France',
    email: 'mebarkikhalifa@gmail.com',
    website: 'mebarkikhalifa.fr',
    roleFocus: 'Cybersécurité offensive, analyse des vulnérabilités, développement Python, Java, C, Shell.',
    age: 23,

    // Réseaux sociaux
    social: {
        github: 'https://github.com/Khalifa787',
        linkedin: 'https://www.linkedin.com/in/khalifa-mebarki-9500061b4/',
    },

    // Informations de contact
    contact: {
        email: 'mebarkikhalifa@gmail.com',
        phone: '+33 7 60 12 58 18',
        calendly: '',
    },

    // Spotify Configuration
    spotify: {
        playlistId: '5WsS94KKm5wDhgEpg8VcgM', // Your Spotify playlist ID
        playlistName: 'Coding-Time',
    },

    // SEO
    seo: {
        title: 'Khalifa Mebarki ',
        description: 'Spécialiste en cybersécurité offensive, pentesting, et développement de logiciels sécurisés.',
        keywords: ['cybersécurité', 'ethical hacking', 'pentesting', 'python', 'sécurité informatique'],
    },

    // Thème
    theme: {
        primaryColor: '#1ED760',
        secondaryColor: '#1d1d1f',
        accentColor: '#007AFF',
    },

    // Parcours académique
    education: [
        {
            degree: "Master Informatique",
            major: "Informatique", // Ajouté pour éviter l'erreur
            institution: "CY Paris Université",
            location: "Cergy-Pontoise (95)",
            year: "2025-2026",
        },
        {
            degree: "Licence Ingénierie Informatique",
            major: "Informatique",
            institution: "CY Paris Université",
            location: "Cergy-Pontoise (95)",
            year: "2022-2025",
        },
        {
            degree: "Licence Pro Web et Système",
            major: "Web et Système",
            institution: "CY Paris Université",
            location: "Cergy-Pontoise (95)",
            year: "2020-2021",
        },
        {
            degree: "Baccalauréat Scientifique",
            major: "Sciences",
            institution: "Lycée Léopold Sédar Senghor",
            location: "Magnanville (78)",
            year: "2020",
        }
    ],

    // Certifications
    certifications: [
        {
            title: "CEH - Certified Ethical Hacker",
            institution: "EC-Council, Paris",
            year: "2025",
            score: "113 / 125"
        }
    ],

    // Expériences professionnelles
    experience: [
        {
            title: "Assistant Responsable Informatique (Stage)",
            company: "Auchan Taverny",
            location: "Val-d’Oise (95)",
            period: "fev. 2025 - Aout 2025",
            description: "Sécurisation des équipements, configuration réseau et équipements de sécurité.",
            technologies: ["Réseaux", "Sécurité des End-users", "Routeurs", "Commutateurs"]
        },
        {
            title: "Chargé de sécurité informatique (Stage)",
            company: "Antenne Consommateur",
            location: "Cergy (95)",
            period: "fev. 2021 - Aout 2021",
            description: "Gestion des incidents de sécurité, mise en place de solutions, rédaction de rapports.",
            technologies: ["Sécurité", "Audit", "Correctifs"]
        },
        {
            title: "Conseiller de vente informatique",
            company: "Auchan Buchelay",
            location: "Yvelines (78)",
            period: "Depuis août 2020",
            description: "Support technique et formation utilisateur.",
            technologies: ["Assistance", "Formation"]
        }
    ],

    // Compétences techniques
    skills: [
        "Cybersécurité", "Sécurité offensive", "Pentesting", "Python", "Java", "C", "Shell",
        "SQL", "HTML/CSS/PHP", "Eclipse", "VS Code", "Linux", "Windows", "MacOS"
    ],

    // Projets personnels
    projects: [
        neurospeccompanionmerged,
        scheds,
        fadedTextRestoration,
        clinicalmain,
        seatReservation,
        nucpaBalloons,
        nucpaBalloonsApi,
        portfolio,
        foodies,
    ],

    // Concours & Réalisations
    competitions: [
        {
            title: "ECPC",
            year: "2024",
            achievement: "Qualification aux finales ECPC avec classement dans le top régional",
        }
    ],

    // Loisirs et centres d’intérêt
    hobbies: ["Lecture", "Photographie", "Montage vidéo", "Jeu de dames", "Randonnée", "Musées", "Cinéma"],
} as const;
