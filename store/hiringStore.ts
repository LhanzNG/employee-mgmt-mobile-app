import { create } from 'zustand';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'active' | 'filled' | 'draft' | 'closed';
  postedDate: string;
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  applicantsCount: number;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  jobId: string;
  resumeUrl?: string;
  photo?: string;
  stage: 'application' | 'interview' | 'offer' | 'hired' | 'rejected';
  rating?: number;
  appliedDate: string;
  notes?: string;
}

interface HiringState {
  jobs: Job[];
  candidates: Candidate[];
  isLoading: boolean;
  error: string | null;
  
  fetchJobs: () => Promise<void>;
  fetchCandidates: () => Promise<void>;
  addJob: (job: Omit<Job, 'id'>) => Promise<Job>;
  updateJob: (id: string, updates: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  getJob: (id: string) => Job | undefined;
  
  addCandidate: (candidate: Omit<Candidate, 'id'>) => Promise<Candidate>;
  updateCandidate: (id: string, updates: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  getCandidate: (id: string) => Candidate | undefined;
  getCandidatesForJob: (jobId: string) => Candidate[];
}

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Remote)',
    type: 'full-time',
    status: 'active',
    postedDate: '2023-04-15',
    description: 'We are looking for a Senior Software Engineer to join our team and help build innovative products.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in software development',
      'Proficient in JavaScript, TypeScript, and React',
      'Experience with Node.js and RESTful APIs',
      'Strong problem-solving skills'
    ],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    applicantsCount: 23
  },
  {
    id: '2',
    title: 'UX Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'full-time',
    status: 'active',
    postedDate: '2023-04-20',
    description: 'We are seeking a talented UX Designer to create amazing user experiences.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '3+ years of experience in UX design',
      'Proficient in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating UX process',
      'Excellent communication skills'
    ],
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD'
    },
    applicantsCount: 18
  },
  {
    id: '3',
    title: 'Product Manager',
    department: 'Product',
    location: 'Austin, TX (Hybrid)',
    type: 'full-time',
    status: 'active',
    postedDate: '2023-04-25',
    description: 'We are looking for a Product Manager to lead our product development efforts.',
    requirements: [
      'Bachelor\'s degree in Business, Computer Science, or related field',
      '4+ years of experience in product management',
      'Experience with agile methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership skills'
    ],
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD'
    },
    applicantsCount: 15
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'full-time',
    status: 'active',
    postedDate: '2023-05-01',
    description: 'We are seeking a Marketing Specialist to help grow our brand and drive user acquisition.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '2+ years of experience in digital marketing',
      'Experience with social media marketing and content creation',
      'Familiarity with marketing analytics tools',
      'Strong creative and analytical skills'
    ],
    salary: {
      min: 70000,
      max: 90000,
      currency: 'USD'
    },
    applicantsCount: 27
  },
  {
    id: '5',
    title: 'Data Analyst',
    department: 'Data',
    location: 'Chicago, IL',
    type: 'full-time',
    status: 'active',
    postedDate: '2023-05-05',
    description: 'We are looking for a Data Analyst to help us make data-driven decisions.',
    requirements: [
      'Bachelor\'s degree in Statistics, Mathematics, Computer Science, or related field',
      '2+ years of experience in data analysis',
      'Proficient in SQL and Python',
      'Experience with data visualization tools like Tableau or Power BI',
      'Strong analytical and problem-solving skills'
    ],
    salary: {
      min: 80000,
      max: 110000,
      currency: 'USD'
    },
    applicantsCount: 12
  }
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 123-4567',
    position: 'Senior Software Engineer',
    jobId: '1',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'interview',
    rating: 4.5,
    appliedDate: '2023-04-20',
    notes: 'Great technical skills, positive attitude. Second interview scheduled.'
  },
  {
    id: '2',
    name: 'John Davis',
    email: 'john.davis@example.com',
    phone: '(555) 234-5678',
    position: 'Senior Software Engineer',
    jobId: '1',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'application',
    rating: 3.5,
    appliedDate: '2023-04-22',
    notes: 'Strong resume, scheduling first interview.'
  },
  {
    id: '3',
    name: 'Mark Johnson',
    email: 'mark.johnson@example.com',
    phone: '(555) 345-6789',
    position: 'UX Designer',
    jobId: '2',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'offer',
    rating: 4.8,
    appliedDate: '2023-04-25',
    notes: 'Excellent portfolio and interview performance. Preparing offer.'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(555) 456-7890',
    position: 'UX Designer',
    jobId: '2',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'application',
    rating: 4.0,
    appliedDate: '2023-04-26',
    notes: 'Strong portfolio, scheduling first interview.'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '(555) 567-8901',
    position: 'Product Manager',
    jobId: '3',
    photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'interview',
    rating: 4.2,
    appliedDate: '2023-04-30',
    notes: 'Good first interview, scheduling second round with team.'
  },
  {
    id: '6',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    phone: '(555) 678-9012',
    position: 'Marketing Specialist',
    jobId: '4',
    photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'application',
    rating: 3.8,
    appliedDate: '2023-05-05',
    notes: 'Interesting background, scheduling first interview.'
  },
  {
    id: '7',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 789-0123',
    position: 'Data Analyst',
    jobId: '5',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stage: 'offer',
    rating: 4.7,
    appliedDate: '2023-05-08',
    notes: 'Excellent technical skills and cultural fit. Preparing offer.'
  }
];

export const useHiringStore = create<HiringState>((set, get) => ({
  jobs: mockJobs,
  candidates: mockCandidates,
  isLoading: false,
  error: null,
  
  fetchJobs: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ jobs: mockJobs, isLoading: false });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch jobs' 
      });
    }
  },
  
  fetchCandidates: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ candidates: mockCandidates, isLoading: false });
    } catch (error) {
      console.error('Error fetching candidates:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch candidates' 
      });
    }
  },
  
  addJob: async (job) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newJob = {
        ...job,
        id: Date.now().toString()
      };
      
      set(state => ({
        jobs: [...state.jobs, newJob],
        isLoading: false
      }));
      
      return newJob;
    } catch (error) {
      console.error('Error adding job:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to add job' 
      });
      throw error;
    }
  },
  
  updateJob: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        jobs: state.jobs.map(job => 
          job.id === id ? { ...job, ...updates } : job
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error updating job:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update job' 
      });
      throw error;
    }
  },
  
  deleteJob: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        jobs: state.jobs.filter(job => job.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error deleting job:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete job' 
      });
      throw error;
    }
  },
  
  getJob: (id) => {
    return get().jobs.find(job => job.id === id);
  },
  
  addCandidate: async (candidate) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCandidate = {
        ...candidate,
        id: Date.now().toString()
      };
      
      set(state => ({
        candidates: [...state.candidates, newCandidate],
        isLoading: false
      }));
      
      return newCandidate;
    } catch (error) {
      console.error('Error adding candidate:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to add candidate' 
      });
      throw error;
    }
  },
  
  updateCandidate: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        candidates: state.candidates.map(candidate => 
          candidate.id === id ? { ...candidate, ...updates } : candidate
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error updating candidate:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update candidate' 
      });
      throw error;
    }
  },
  
  deleteCandidate: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        candidates: state.candidates.filter(candidate => candidate.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error deleting candidate:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete candidate' 
      });
      throw error;
    }
  },
  
  getCandidate: (id) => {
    return get().candidates.find(candidate => candidate.id === id);
  },
  
  getCandidatesForJob: (jobId) => {
    return get().candidates.filter(candidate => candidate.jobId === jobId);
  }
}));