import Link from 'next/link'
import {
  ArrowRight,
  GraduationCap,
  Target,
  BookOpen,
  Heart,
  CheckCircle,
  Briefcase,
  Star,
  Users,
  Clock,
 Globe,
 HeartHandshake,
 BriefcaseBusiness,
 LaptopMinimal,
  Layers,
  FileCheck,
} from 'lucide-react'
import AboutHeroSection from '@/components/public/about/AboutHeroSection'
import StorySection from '@/components/public/about/StorySection'
import MissionVisionSection from '@/components/public/about/MissionVisionSection'
import WhyChooseSection from '@/components/public/about/WhyChooseSection'
import AboutCTASection from '@/components/public/about/AboutCTASection'
import { mentorName, showcaseBadge, showcaseDescription, showcaseHeading, testimonialText } from '@/styles/typography'




const features = [
  {
    icon: GraduationCap,
    title: 'Experienced & Industry Trainers',
    short: 'Learn from real-world professionals',
    detail:
      'Learn directly from professionals with real-time industry experience and practical knowledge. Our trainers bring years of hands-on expertise to every session.',
  },
  {
    icon: Target,
    title: 'Career-Oriented Training',
    short: 'Industry-aligned curriculum',
    detail:
      'Courses designed to match current industry requirements and improve job readiness. Every module is curated to close the gap between academics and the workplace.',
  },
  {
    icon: BookOpen,
    title: 'Smart LMS Support',
    short: 'Learn anytime, anywhere',
    detail:
      'Access recorded classes, assignments, notes, and progress tracking anytime through our intelligent Learning Management System — on mobile or web.',
  },
  {
    icon: Heart,
    title: 'Personal Mentorship',
    short: 'One-on-one student guidance',
    detail:
      'One-on-one guidance to help students improve confidence and technical skills. Your mentor tracks your growth and helps you overcome individual challenges.',
  },
  {
    icon: CheckCircle,
    title: 'Weekly Assessments',
    short: 'Track your progress consistently',
    detail:
      'Regular tests and evaluations to monitor student performance and growth. Weekly reports help you identify strengths and areas that need improvement.',
  },
  {
    icon: Briefcase,
    title: 'Placement Assistance',
    short: 'Job support for eligible students',
    detail:
      'Resume preparation, interview guidance, and job support for eligible students. We maintain strong ties with companies actively looking for our graduates.',
  },
]

const extraFeatures = [
  {
    icon: Star,
    title: 'Communication & Personality Development',
    detail:
      'Improve spoken English, presentation skills, and professional communication. Personality development sessions run alongside technical training.',
  },
  {
    icon: Users,
    title: 'Support for Dropout Students',
    detail:
      'Helping students restart education and build successful careers with confidence. We provide a judgment-free, structured path back into learning.',
  },
  {
    icon: Clock,
    title: 'Flexible Learning for All Ages',
    detail:
      'No age limit — learning opportunities for students, graduates, and working professionals. Our schedules flex around your life, not the other way around.',
  },
  {
    icon: Globe,
    title: 'Distance Education Guidance',
    detail:
      'Assistance for online and distance degree programs with proper academic support. We help you navigate NIOS, IGNOU, Tamil Nadu Open University and more.',
  },
  {
    icon: Layers,
    title: 'Practical Project Training',
    detail:
      'Real-time projects and hands-on practice to gain practical exposure. Build a portfolio that speaks louder than a certificate.',
  },
  {
    icon: FileCheck,
    title: 'Certification Support',
    detail:
      'Guidance for industry-recognized certifications and exam preparation. We help you choose the right certifications and prepare you to pass on the first attempt.',
  },
]

const visionOptions = [
  'To become a leading career-focused training institute that empowers students with practical skills, confidence, and opportunities for a successful future.',
  'To transform lives through quality education, industry-oriented training, and continuous career support.',
  'To create skilled professionals who are ready to meet global industry standards and challenges.',
]

const missionPoints = [
  'Provide affordable and high-quality training programs.',
  'Bridge the gap between academics and industry expectations.',
  'Support students with mentorship, skill development, and placement guidance.',
  'Empower students with real-world skills and a motivating learning environment.',
  'Ensure consistent learning through smart technology and LMS platforms.',
  'Prepare students for successful careers and future opportunities.',
]

const lmsFeatures = [
  'Live and recorded classes',
  'Online tests and assignments',
  'Student performance tracking',
  'Study materials download',
  'Mobile and web access',
  'Doubt clearing sessions',
]

export default function AboutPage() {
  return (
    <div
      className="pt-20 overflow-hidden relative"
      style={{
        background:
          'linear-gradient(to bottom, #F8FBFF 0%, #F3F7FF 100%)',
      }}
    >
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* BLURS */}
        <div className="absolute top-0 right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-100 blur-3xl opacity-40" />

        <div className="absolute top-[900px] left-[-250px] w-[650px] h-[650px] rounded-full bg-blue-100 blur-3xl opacity-30" />

        <div className="absolute bottom-[400px] right-[-180px] w-[500px] h-[500px] rounded-full bg-blue-200 blur-3xl opacity-30" />

        {/* FLOATING DOTS */}
        <div className="absolute top-[200px] left-[10%] w-4 h-4 rounded-full bg-[#2563EB]/20" />

        <div className="absolute top-[700px] right-[12%] w-6 h-6 rounded-full bg-[#3B82F6]/20" />

        <div className="absolute bottom-[500px] left-[15%] w-5 h-5 rounded-full bg-[#60A5FA]/20" />

        {/* CURVED LINES */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          viewBox="0 0 1440 3200"
          fill="none"
        >
          <path
            d="M-120 220C140 120 260 340 520 260C760 190 920 40 1180 120C1320 160 1480 260 1540 300"
            stroke="#2563EB"
            strokeWidth="2"
          />

          <path
            d="M-100 760C180 900 340 620 620 700C860 770 980 980 1260 860C1380 810 1480 720 1540 680"
            stroke="#60A5FA"
            strokeWidth="2"
          />

          <path
            d="M-80 1320C220 1200 380 1450 700 1360C980 1280 1180 1100 1540 1240"
            stroke="#3B82F6"
            strokeWidth="2"
          />

          <path
            d="M-60 1900C180 2100 460 1800 760 1940C1040 2060 1260 1860 1540 2020"
            stroke="#2563EB"
            strokeWidth="2"
          />

          <path
            d="M-100 2500C220 2360 420 2660 760 2540C1080 2420 1280 2280 1540 2380"
            stroke="#60A5FA"
            strokeWidth="2"
          />
        </svg>
      </div>


<AboutHeroSection />
<StorySection />
     
<MissionVisionSection />

<WhyChooseSection />





{/* ====================================================
    MEET OUR MENTORS SECTION
==================================================== */}

<section
  className="
    relative
    overflow-hidden
    py-20
    px-4
  "
  style={{
    background: '#F8FAFF',
  }}
>

  {/* subtle glow */}
  <div
    className="
      absolute
      top-[-120px]
      right-[-120px]
      w-[320px]
      h-[320px]
      rounded-full
      blur-3xl
      opacity-10
    "
    style={{
      background: '#93C5FD',
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* ====================================================
        SECTION HEADER
    ==================================================== */}

    <div className="text-center max-w-3xl mx-auto mb-14">

      {/* label */}
      <div
        className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          mb-6
        "
        style={{
          background: '#4062a2b3',
          border: '1px solid #4063a2',
        }}
      >

        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: '#FFFFFF',
          }}
        />

        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
          "
          style={{
            color: '#FFFFFF',
          }}
        >
          Meet Our Mentors
        </span>
      </div>

      {/* heading */}
      <h2
        className={showcaseHeading.default}
        style={{
          
          color: '#081C4B',
        }}
      >
        Learn from Mentors
        <span
          className="block"
          style={{
            color: '#4063a2',
          }}
        >
          Focused on Student Growth
        </span>
      </h2>

      {/* desc */}
      <p
       className={`
  mt-6
  ${showcaseDescription.default}
`}
        style={{
          
          color: '#64748B',
        }}
      >
        Our mentors combine practical experience, industry knowledge,
        and student-focused guidance to help learners build confidence
        and real-world skills.
      </p>
    </div>

    {/* ====================================================
        MENTOR CARDS
    ==================================================== */}

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {[
        {
          name: 'Rahul Sharma',
          role: 'NEET & Biology Mentor',

          desc:
            '8+ years helping students prepare for competitive medical entrance exams.',

          image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
        },

        {
          name: 'Priya Menon',
          role: 'Spoken English Trainer',

          desc:
            'Focused on communication confidence, fluency, and practical speaking skills.',

          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
        },

        {
          name: 'Arjun Kumar',
          role: 'Software Training Mentor',

          desc:
            'Industry-oriented guidance in programming, development, and technical skills.',

          image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
        },
      ].map((mentor, index) => (
        <div
          key={index}
          className="
            group
            rounded-[30px]
            overflow-hidden
            border
            transition-all
            duration-300
            hover:-translate-y-1
          "
          style={{
            background: '#FFFFFF',

            borderColor:
              'rgba(3,73,224,0.08)',

            boxShadow:
              '0 14px 34px rgba(15,23,42,0.05)',
          }}
        >

          {/* image */}
          <div className="relative overflow-hidden">

            {/* accent */}
            <div
             className="
             absolute
             left-0
             top-6
             w-[4px]
             h-14
             rounded-r-full
           "
              style={{
                background:
                  '#4063a2',
              }}
            />

            <img
              src={mentor.image}
              alt={mentor.name}
              className="
                w-full
                h-[340px]
                object-cover
                transition-transform
                duration-500
                group-hover:scale-[1.03]
              "
            />
          </div>

          {/* content */}
          <div className="p-7">

            {/* role badge */}
            <div
              className={`
  inline-flex
  px-3
  py-1.5
  rounded-full
  mb-5
  ${showcaseBadge.default}
`}
              style={{
                background:
                  '#4062a2b3',

                color: '#FFFFFF',
              }}
            >
              {mentor.role}
            </div>

            {/* name */}
            <h3
              className={mentorName.default}
              style={{
                color: '#081C4B',
              }}
            >
              {mentor.name}
            </h3>

            {/* desc */}
            <p
              className="
                mt-4
                leading-relaxed
              "
              style={{
                color: '#64748B',
                fontSize: '15px',
              }}
            >
              {mentor.desc}
            </p>

            {/* footer */}
            <div
              className="
                flex
                items-center
                gap-2
                mt-6
                text-sm
                font-semibold
              "
              style={{
                color: '#4063a2',
              }}
            >
              Student-Focused Mentor

              <span>•</span>

              <span>Career Guidance</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ====================================================
    STUDENT IMPACT SECTION
==================================================== */}

<section
  className="
    relative
    overflow-hidden
    py-20
    px-4
  "
  style={{
    background: '#FFFFFF',
  }}
>

  {/* subtle glow */}
  <div
    className="
      absolute
      bottom-[-120px]
      left-[-120px]
      w-[320px]
      h-[320px]
      rounded-full
      blur-3xl
      opacity-10
    "
    style={{
      background: '#93C5FD',
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* ====================================================
        CONTENT GRID
    ==================================================== */}

    <div
      className="
        grid
        lg:grid-cols-2
        gap-10
        items-center
      "
    >

      {/* ====================================================
          FEATURED STUDENT CARD
      ==================================================== */}

      <div
        className="
          relative
          rounded-[34px]
          overflow-hidden
          border
        "
        style={{
          background: '#FFFFFF',

          borderColor:
            'rgba(3,73,224,0.08)',

          boxShadow:
            '0 24px 60px rgba(15,23,42,0.06)',
        }}
      >

        {/* top accent */}
        <div
          className="
            h-1.5
            w-full
          "
          style={{
            background:
' #4063a2',
          }}
        />

        <div className="p-8">

          {/* student info */}
          <div className="flex items-center gap-5">

            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
              alt="Student"
              className="
                w-24
                h-24
                rounded-3xl
                object-cover
              "
            />

            <div>

              <div
                className="
                  inline-flex
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-semibold
                  mb-3
                "
                style={{
                  background:
                    '#4062a2b3',

                  color: '#FFFFFF',
                }}
              >
                Student Success Highlight
              </div>

              <h3
                className="
                  text-2xl
                  font-black
                "
                style={{
                  color: '#081C4B',
                }}
              >
                Kiran Sharma
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                "
                style={{
                  color: '#64748B',
                }}
              >
                NEET Coaching • 2025
              </p>
            </div>
          </div>

          {/* achievement */}
          <div className="mt-8">

            <div
              className="
                text-3xl
                font-bold
                leading-none
              "
              style={{
                color: '#4063a2',
              }}
            >
              AIR 245
            </div>

            <p
              className="
                mt-3
                text-sm
                font-medium
              "
              style={{
                color: '#64748B',
              }}
            >
              NEET Examination Result
            </p>
          </div>

          {/* testimonial */}
          <div
            className="
              mt-8
              rounded-2xl
              p-5
            "
            style={{
              background: '#F8FAFF',
              border:
                '1px solid rgba(3,73,224,0.06)',
            }}
          >

            <p
              className={`
  italic
  ${testimonialText.default}
`}
              style={{
                color: '#64748B',
              }}
            >
              “The mentorship, regular guidance, and practical
              approach helped me stay consistent and confident
              throughout my preparation journey.”
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          IMPACT STATS
      ==================================================== */}

      <div>

        {/* intro */}
        <div>

          <h3
            className={showcaseHeading.default}
            style={{
              color: '#081C4B',
            }}
          >
            Supporting Students Beyond
            <span
              className="block"
              style={{
                color: '#4063a2',
              }}
            >
              Traditional Learning
            </span>
          </h3>

          <p
            className={`
  mt-5
  ${showcaseDescription.default}
`}
            style={{
              
              color: '#64748B',
            }}
          >
            Our focus goes beyond exams and certifications.
            We aim to create supportive learning experiences
            that help students improve confidence, skills,
            and long-term career readiness.
          </p>
        </div>

        {/* metrics */}
        <div
          className="
            grid
            sm:grid-cols-1
            gap-5
            mt-10
          "
        >

          {[
            

            {
              value: 'Over the past 10 years',
              label: 'Thousands of students have progressed to higher education',
            },

           

          ].map((item, index) => (
            <div
              key={index}
              className="
                rounded-[26px]
                p-6
                border
              "
              style={{
                background: '#F8FAFF',

                borderColor:
                  'rgba(3,73,224,0.08)',
              }}
            >

              <div
                className="
                  text-1.5xl
                  font-extrabold
                "
                style={{
                  color: '#4063a2',
                }}
              >
                {item.value}
              </div>

              <p
                className="
                  mt-2
                  leading-relaxed
                "
                style={{
                  color: '#64748B',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* disclaimer */}
        <p
          className="
            mt-6
            text-sm
            leading-relaxed
          "
          style={{
            color: '#94A3B8',
          }}
        >
          Student outcomes and achievements shown are based on
          internal records and individual learner performance.
        </p>
      </div>
    </div>
  </div>
</section>

    <AboutCTASection />



    
      
      
    </div>
  )
}