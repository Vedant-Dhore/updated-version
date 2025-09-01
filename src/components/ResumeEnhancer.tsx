import React, { useState, useEffect } from 'react';
import { X, Wand2, CheckCircle, AlertCircle, TrendingUp, Sparkles, Brain, Target, FileText, User, Mail, Phone, Linkedin, Github, GraduationCap, Briefcase, Code, Trophy } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  jobId: string;
  stage: string;
  matchPercentage?: number;
  status: string;
  avatar?: string;
  skills: string[];
  fitmentScore: number;
  fitmentSummary: string;
  profileImage: string;
  statusColor: string;
}

interface ResumeEnhancerProps {
  candidate?: Candidate;
  onSave?: (candidateId: string, newScore: number, enhancedResume?: any) => void;
  onClose: () => void;
}

const ResumeEnhancer: React.FC<ResumeEnhancerProps> = ({ candidate, onSave, onClose }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementProgress, setEnhancementProgress] = useState(0);
  const [enhancementComplete, setEnhancementComplete] = useState(false);
  const [enhancedFitmentScore, setEnhancedFitmentScore] = useState(candidate?.fitmentScore || 75);
  const [enhancementSummary, setEnhancementSummary] = useState('');
  const [enhancedResume, setEnhancedResume] = useState<any>(null);

  // Get the original resume data for the candidate
  const getOriginalResumeData = () => {
    if (!candidate) return null;
    
    const candidateResumes: { [key: string]: any } = {
      '1': { // Janhavi Sharma - missing Git
        name: "Janhavi Sharma",
        email: "janhavi.sharma@email.com",
        contact: "+91 9876543210",
        linkedin: "linkedin.com/in/janhavisharma",
        github: "", // Missing GitHub
        education: "Bachelor of Computer Science, Pune University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Developed a Blood Bank Management System using Java and MySQL",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["Java", "React", "SQL"],
        projects: [
          "Blood Bank Management System - Java application with database integration",
          "E-commerce Website - Frontend development with responsive design"
        ],
        achievements: [
          "Dean's List for 2 consecutive semesters",
          "Winner of College Technical Fest 2023"
        ]
      },
      '2': { // Aarya Ranpise - missing React, has GitHub
        name: "Aarya Ranpise",
        email: "aarya123r@email.com",
        contact: "+91 9856543211",
        linkedin: "linkedin.com/in/ranpiseaarya",
        github: "github.com/aarya",
        education: "Bachelor of Technology, MIT WPU (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Built web applications using Python and Django framework",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["Python", "Django", "HTML", "CSS"],
        projects: [
          "Library Management System - Python Django application",
          "Personal Portfolio Website - Frontend development with responsive design"
        ],
        achievements: [
          "Certiface of Merit in Academics for 2 years",
          "IBM - Java certification course"
        ]
      },
      '3': { // Priya Patel - missing React, has GitHub
        name: "Priya Patel",
        email: "priya.patel@email.com",
        contact: "+91 9876543211",
        linkedin: "linkedin.com/in/priyapatel",
        github: "github.com/priyapatel",
        education: "Bachelor of Information Technology, Mumbai University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Built web applications using Python and Django framework",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["Python", "Django", "HTML", "CSS"],
        projects: [
          "Library Management System - Python Django application",
          "Personal Portfolio Website - Frontend development with responsive design"
        ],
        achievements: [
          "Certiface of Honour in Academics for 2 years",
          "IBM - Python certification course"
        ]
      },
      '4': { // Rahul Singh - missing SQL, no GitHub
        name: "Rahul Singh",
        email: "rahul.singh@email.com",
        contact: "+91 9876543212",
        linkedin: "linkedin.com/in/rahulsingh",
        github: "", // Missing GitHub
        education: "Bachelor of Computer Applications, Delhi University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Developed REST APIs using Node.js and Express",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["JavaScript", "Node.js", "MongoDB"],
        projects: [
          "Chat Application - Real-time messaging using Node.js and Socket.io",
          "E-commerce Website - Full-stack development with responsive design"
        ],
        achievements: [
          "Best Project Award in Web Development course",
          "Merit at Academic Program - NIT Goa 2024"
        ]
      },
      '5': { // Anita Desai - missing backend, has GitHub
        name: "Anita Desai",
        email: "anita.desai@gmail.com",
        contact: "+91 9876543213",
        linkedin: "linkedin.com/in/anitadesai",
        github: "github.com/anitadesai",
        education: "Bachelor of Computer Science, Bangalore University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Built interactive user interfaces using React and JavaScript",
          "Created responsive web designs using HTML, CSS, and modern frameworks"
        ],
        skills: ["React", "JavaScript", "CSS", "HTML"],
        projects: [
          "Weather App - React application with API integration",
          "Portfolio Website - Frontend development with modern design"
        ],
        achievements: [
          "Outstanding Student in Frontend Development",
          "Udemy - React certification course"
        ]
      },
      '6': { // Vikram Kumar - missing SQL, no GitHub
        name: "Vikram Kumar",
        email: "@vikram12345@gmail.com",
        contact: "+91 9876543212",
        linkedin: "linkedin.com/in/vikramks",
        github: "", // Missing GitHub
        education: "Bachelor of Computer Applications, Delhi University (2022-2026)",
        summary: "Computer Science student with experience in web development and software developement.",
        experience: [
          "Developed REST APIs using Node.js and Express",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["JavaScript", "Node.js", "MongoDB"],
        projects: [
          "Chat Application - Real-time messaging using Node.js and Socket.io",
          "E-commerce Website - Full-stack development with responsive design"
        ],
        achievements: [
          "Best Project Award in Web Development Hackwithme - 2024",
          "Coursera - JavaScript certification"
        ]
      }
    };

    return candidateResumes[candidate.id] || candidateResumes['1'];
  };

  const originalResume = getOriginalResumeData();

  const runEnhancement = async () => {
    if (!candidate || !originalResume) return;
    
    setIsEnhancing(true);
    setEnhancementProgress(0);
    setEnhancementComplete(false);

    // Simulate AI enhancement process with realistic progress
    const steps = [
      { progress: 15, message: 'Analyzing resume structure...' },
      { progress: 30, message: 'Identifying skill gaps...' },
      { progress: 50, message: 'Generating enhancement suggestions...' },
      { progress: 70, message: 'Optimizing content for job requirements...' },
      { progress: 85, message: 'Calculating improved fitment score...' },
      { progress: 100, message: 'Enhancement complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEnhancementProgress(step.progress);
    }

    // Generate enhanced resume based on candidate's gaps
    const jobRequiredSkills = ['Java', 'React', 'SQL', 'Git'];
    const candidateSkills = originalResume.skills;
    const missingSkills = jobRequiredSkills.filter(skill => 
      !candidateSkills.some((cSkill: string) => 
        cSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );

    // Create enhanced resume with added skills and improved content
    const enhanced = {
      ...originalResume,
      skills: [...candidateSkills, ...missingSkills],
      summary: originalResume.summary + " Demonstrated proficiency in full-stack development with strong problem-solving abilities.",
      experience: [
        ...originalResume.experience,
        "Completed additional coursework in missing technical areas to strengthen job readiness"
      ],
      github: originalResume.github || "github.com/" + originalResume.name.toLowerCase().replace(' ', ''),
      projects: [
        ...originalResume.projects,
        "Personal Learning Projects - Self-directed study in " + missingSkills.join(', ')
      ]
    };

    setEnhancedResume(enhanced);

    // Calculate new fitment score (improvement based on missing skills filled)
    const improvementPerSkill = 5;
    const newScore = Math.min(95, candidate.fitmentScore + (missingSkills.length * improvementPerSkill));
    setEnhancedFitmentScore(newScore);

    // Generate enhancement summary
    const summary = `Enhanced resume by adding ${missingSkills.length} missing skills (${missingSkills.join(', ')}), improved professional summary, and strengthened project portfolio. Fitment score improved from ${candidate.fitmentScore}% to ${newScore}%.`;
    setEnhancementSummary(summary);

    setIsEnhancing(false);
    setEnhancementComplete(true);
  };

  const handleSave = () => {
    if (candidate && onSave && enhancementComplete) {
      // Save the enhanced resume data
      onSave(candidate.id, enhancedFitmentScore, enhancedResume);
      
      // Also save enhancement details for persistence
      localStorage.setItem(`resume_enhancements_${candidate.id}`, JSON.stringify({
        fitmentScore: enhancedFitmentScore,
        summary: enhancementSummary,
        enhancedResume: enhancedResume,
        timestamp: Date.now()
      }));
      
      onClose();
    }
  };

  // Load any existing enhancements
  useEffect(() => {
    if (candidate) {
      const savedEnhancements = localStorage.getItem(`resume_enhancements_${candidate.id}`);
      if (savedEnhancements) {
        try {
          const { fitmentScore, summary, enhancedResume: savedResume } = JSON.parse(savedEnhancements);
          setEnhancedFitmentScore(fitmentScore);
          setEnhancementSummary(summary);
          setEnhancedResume(savedResume);
          setEnhancementComplete(true);
        } catch (error) {
          console.error('Error loading saved enhancements:', error);
        }
      }
    }
  }, [candidate]);

  if (!candidate || !originalResume) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Candidate Selected</h2>
          <p className="text-gray-600 mb-4">Please select a candidate to enhance their resume.</p>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Sticky Header */}
        <div className="flex-shrink-0 bg-white rounded-t-lg border-b border-gray-200">
          {/* Top Header with Title and Close */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Wand2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Enhancer</h1>
                <p className="text-gray-600">AI-powered resume optimization for {candidate.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Fitment Score and Progress */}
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Current Fitment Score</h3>
                  <p className="text-sm text-gray-600">For Intern Software Developer position</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    {enhancementComplete ? `${enhancedFitmentScore}%` : `${candidate.fitmentScore}%`}
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${enhancementComplete ? enhancedFitmentScore : candidate.fitmentScore}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Enhancement Progress Bar */}
              {isEnhancing && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">Enhancing Resume...</span>
                    <span className="text-sm text-purple-600">{enhancementProgress}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${enhancementProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Enhancement Summary */}
              {enhancementComplete && enhancementSummary && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Enhancement Summary</h4>
                      <p className="text-sm text-gray-700">{enhancementSummary}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <div className="flex justify-between">
              <button
                onClick={runEnhancement}
                disabled={isEnhancing}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isEnhancing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-sm'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>{isEnhancing ? 'Enhancing...' : 'Run AI Enhancement'}</span>
              </button>

              {enhancementComplete && (
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Enhanced Resume</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Enhancement Status */}
            {!enhancementComplete && !isEnhancing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Ready for Enhancement</h3>
                </div>
                <p className="text-blue-700 mt-2 text-sm">
                  Click "Run AI Enhancement" to analyze and improve this resume's fitment for the job requirements.
                </p>
              </div>
            )}

            {/* Resume Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Resume */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Original Resume</h3>
                </div>

                {/* Header Section */}
                <div className="text-center mb-6 pb-4 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                    <img 
                      src={candidate.profileImage} 
                      alt={originalResume.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{originalResume.name}</h2>
                  <p className="text-sm text-gray-600 mb-3">{originalResume.summary}</p>
                  
                  {/* Contact Information */}
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{originalResume.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{originalResume.contact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Linkedin className="w-3 h-3" />
                      <span>{originalResume.linkedin}</span>
                    </div>
                    {originalResume.github && (
                      <div className="flex items-center space-x-1">
                        <Github className="w-3 h-3" />
                        <span>{originalResume.github}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Education</h4>
                  </div>
                  <p className="text-sm text-gray-700">{originalResume.education}</p>
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Experience</h4>
                  </div>
                  <div className="space-y-1">
                    {originalResume.experience.map((exp: string, index: number) => (
                      <p key={index} className="text-sm text-gray-700">• {exp}</p>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {originalResume.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Projects</h4>
                  </div>
                  <div className="space-y-1">
                    {originalResume.projects.map((project: string, index: number) => (
                      <p key={index} className="text-sm text-gray-700">• {project}</p>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Achievements</h4>
                  </div>
                  <div className="space-y-1">
                    {originalResume.achievements.map((achievement: string, index: number) => (
                      <p key={index} className="text-sm text-gray-700">• {achievement}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Resume */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {enhancementComplete ? 'Enhanced Resume' : 'Enhanced Version (Preview)'}
                  </h3>
                </div>

                {!enhancementComplete ? (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enhanced version will appear here after running AI enhancement</p>
                  </div>
                ) : (
                  <>
                    {/* Header Section */}
                    <div className="text-center mb-6 pb-4 border-b border-green-200">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                        <img 
                          src={candidate.profileImage} 
                          alt={enhancedResume.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{enhancedResume.name}</h2>
                      <p className="text-sm text-gray-600 mb-3">{enhancedResume.summary}</p>
                      
                      {/* Contact Information */}
                      <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{enhancedResume.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{enhancedResume.contact}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Linkedin className="w-3 h-3" />
                          <span>{enhancedResume.linkedin}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Github className="w-3 h-3" />
                          <span>{enhancedResume.github}</span>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-gray-900">Education</h4>
                      </div>
                      <p className="text-sm text-gray-700">{enhancedResume.education}</p>
                    </div>

                    {/* Experience */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-gray-900">Experience</h4>
                      </div>
                      <div className="space-y-1">
                        {enhancedResume.experience.map((exp: string, index: number) => {
                          const isNew = index >= originalResume.experience.length;
                          return (
                            <p key={index} className={`text-sm ${isNew ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                              • {exp}
                              {isNew && <span className="ml-2 text-xs bg-green-200 text-green-800 px-1 rounded">NEW</span>}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Code className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-gray-900">Skills</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {enhancedResume.skills.map((skill: string, index: number) => {
                          const isNew = !originalResume.skills.includes(skill);
                          return (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                isNew 
                                  ? 'bg-green-200 text-green-800 border border-green-300' 
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {skill}
                              {isNew && <span className="ml-1">✨</span>}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-gray-900">Projects</h4>
                      </div>
                      <div className="space-y-1">
                        {enhancedResume.projects.map((project: string, index: number) => {
                          const isNew = index >= originalResume.projects.length;
                          return (
                            <p key={index} className={`text-sm ${isNew ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                              • {project}
                              {isNew && <span className="ml-2 text-xs bg-green-200 text-green-800 px-1 rounded">NEW</span>}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-gray-900">Achievements</h4>
                      </div>
                      <div className="space-y-1">
                        {enhancedResume.achievements.map((achievement: string, index: number) => (
                          <p key={index} className="text-sm text-gray-700">• {achievement}</p>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Enhancement Insights */}
            {enhancementComplete && (
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Enhancement Insights</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Skills Added</h4>
                    <p className="text-sm text-blue-700">
                      {enhancedResume.skills.length - originalResume.skills.length} new technical skills
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Score Improvement</h4>
                    <p className="text-sm text-green-700">
                      +{enhancedFitmentScore - candidate.fitmentScore}% fitment increase
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Profile Strength</h4>
                    <p className="text-sm text-purple-700">
                      Enhanced professional presence
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEnhancer;