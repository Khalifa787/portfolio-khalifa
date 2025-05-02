import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaLink, FaFolder, FaFile } from 'react-icons/fa';
import DraggableWindow from './DraggableWindow';

interface GitHubViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  homepage?: string;
  language: string;
}

interface GitHubContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  url: string;
  html_url: string;
}

const GitHubViewer = ({ isOpen, onClose }: GitHubViewerProps) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [repoContents, setRepoContents] = useState<GitHubContent[]>([]);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      fetch('https://api.github.com/users/Khalifa787/repos')
        .then((res) => res.json())
        .then((data) => {
          const sorted = data.sort((a: GitHubRepo, b: GitHubRepo) => b.id - a.id);
          setRepos(sorted);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedRepo) {
      fetch(`https://api.github.com/repos/Khalifa787/${selectedRepo.name}/contents`)
        .then((res) => res.json())
        .then((data) => setRepoContents(data));
    }
  }, [selectedRepo]);

  const togglePath = (path: string) => {
    const updated = new Set(expandedPaths);
    if (updated.has(path)) updated.delete(path);
    else updated.add(path);
    setExpandedPaths(updated);
  };

  const fetchAndSetSubContent = async (item: GitHubContent) => {
    const res = await fetch(item.url);
    const data = await res.json();
    setRepoContents((prev) => [...prev, ...data]);
    togglePath(item.path);
  };

  const renderContentTree = (items: GitHubContent[], pathPrefix = '') => {
    return items
      .filter((item) => item.path.startsWith(pathPrefix) && item.path.replace(pathPrefix, '').split('/').length === 1)
      .map((item) => (
        <div key={item.path} className="ml-4 mb-1">
          <div
            className="flex items-center cursor-pointer hover:bg-gray-700/50 p-1 rounded"
            onClick={() => {
              if (item.type === 'dir') fetchAndSetSubContent(item);
            }}
          >
            {item.type === 'dir' ? (
              <FaFolder className="text-yellow-500 mr-2" />
            ) : (
              <FaFile className="text-blue-400 mr-2" />
            )}
            <a
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:underline"
            >
              {item.name}
            </a>
          </div>
          {item.type === 'dir' && expandedPaths.has(item.path) && (
            <div className="ml-4">
              {renderContentTree(
                repoContents.filter((c) => c.path.startsWith(item.path + '/') && c.path !== item.path),
                item.path + '/'
              )}
            </div>
          )}
        </div>
      ));
  };

  if (!isOpen) return null;

  return (
    <DraggableWindow
      title={selectedRepo ? selectedRepo.name : 'Mes projets GitHub'}
      onClose={onClose}
      initialPosition={{ x: Math.floor(window.innerWidth * 0.2), y: Math.floor(window.innerHeight * 0.2) }}
      className="w-[93vw] md:max-w-4xl max-h-[90vh]"
      initialSize={{ width: 800, height: 600 }}
    >
      <div className="overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 1.5rem)' }}>
        {!selectedRepo ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Mes Projets GitHub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                  onClick={() => setSelectedRepo(repo)}
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{repo.name}</h3>
                  <p className="text-gray-400 mb-2">{repo.description}</p>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{repo.language}</span>
                  <div className="flex gap-4 mt-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-blue-400 text-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub />
                      <span>Repository</span>
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-blue-400 text-gray-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelectedRepo(null)}
              className="flex items-center gap-2 text-gray-300 hover:text-gray-100 mb-4"
            >
              <FaChevronLeft />
              <span>Retour aux projets</span>
            </button>
            <h3 className="text-2xl font-bold text-gray-200 mb-2">{selectedRepo.name}</h3>
            <p className="text-gray-400 mb-4">{selectedRepo.description}</p>
            <div className="flex gap-4 mb-6">
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-blue-400 text-gray-300"
              >
                <FaGithub />
                <span>Repository GitHub</span>
              </a>
              {selectedRepo.homepage && (
                <a
                  href={selectedRepo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-blue-400 text-gray-300"
                >
                  <FaLink />
                  <span>Site en ligne</span>
                </a>
              )}
            </div>
            <div className="text-gray-200">
              <h4 className="text-lg font-semibold mb-2">Contenu du projet</h4>
              {renderContentTree(repoContents)}
            </div>
          </div>
        )}
      </div>
    </DraggableWindow>
  );
};

export default GitHubViewer;