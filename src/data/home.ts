import {
  GraduationCap,
  Trophy,
  Briefcase,
  RefreshCcw,
  Laptop,
  FileCheck,
} from 'lucide-react'

export const LEARNING_PATHS = [
  {
    icon: GraduationCap,
    title: 'School & College',
    description:
      'Board exams, NEET, JEE, and academic coaching programs for students.',
    tags: ['Class 10 & 12', 'NEET', 'JEE Maths'],
    href: '/courses?category=school',
  },

  {
    icon: Trophy,
    title: 'Competitive Exams',
    description:
      'Government exam preparation programs with expert mentorship.',
    tags: ['TNPSC', 'UPSC', 'SSC', 'Banking'],
    href: '/courses?category=competitive',
  },

  {
    icon: Briefcase,
    title: 'Career & Job Skills',
    description:
      'Industry-focused skill development and placement-oriented training.',
    tags: [
      'Web Development',
      'Spoken English',
      'Interview Prep',
    ],
    href: '/courses?category=job',
  },

  {
    icon: RefreshCcw,
    title: 'Restart Learning',
    description:
      'Flexible learning opportunities for students restarting education.',
    tags: [
      'NIOS',
      'Open School',
      'Distance Education',
    ],
    href: '/distance-education',
  },
]

export const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Expert Trainers',
    description:
      'Learn from experienced mentors with real academic and industry expertise.',
  },

  {
    icon: Laptop,
    title: 'Smart LMS & Assessments',
    description:
      'Interactive learning system with tests, tracking, and progress support.',
  },

  {
    icon: Briefcase,
    title: 'Career Mentorship',
    description:
      'Career-focused guidance designed for placements and real-world growth.',
  },

  {
    icon: FileCheck,
    title: 'Certification Support',
    description:
      'Industry-recognized certifications and practical skill development.',
  },
]

export const fallbackStats = [
  {
    value: '98%',
    label: 'Success Rate',
    color: '#f59e0b',
  },

  {
    value: '1L+',
    label: 'Students Trained',
    color: '#3b82f6',
  },

  {
    value: '10K+',
    label: 'Placements',
    color: '#10b981',
  },

  {
    value: 'Top Ranks',
    label: 'TNPSC & NEET',
    color: '#8b5cf6',
  },
]
