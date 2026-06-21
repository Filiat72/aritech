'use client'



import {
  
  Clock,
  Play,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  heroHeading,
  heroDescription,
  sectionHeading,
  sectionDescription,
  getTypography,
} from '@/styles/typography'

import { useLocale } from 'next-intl'

import {
  featureCard,
  tagPill,
  elevatedSurface,
} from '@/styles/cards'







export default function BookDemoPage() {

  const locale = useLocale()


  


 

  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* HERO */}
      <section
        className={`
          relative
          ${sectionSpacingCompact}
        `}
      >
        {/* GLOW */}
        <div className="absolute top-0 right-0 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-[#EEF4FF] blur-3xl opacity-70 pointer-events-none" />

        <div
          className={`
            ${container}
            relative
            z-10
          `}
        >
          {/* HEADER */}
          <div className="max-w-3xl mx-auto text-center">
            {/* LABEL */}
            <div
              className={`
                inline-flex
                items-center
                gap-2
                ${tagPill}
                mb-6
              `}
              style={{
                background:
                  '#4062a2b3',

                border:
                  '1px solid #4063a2',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#FFFFFF]" />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#FFFFFF]
                "
              >
                Free Demo Session
              </span>
            </div>

            {/* HEADING */}
            <h1
              className={`
                ${getTypography(
  sectionHeading,
  locale
)}
                text-[#081C4B]
              `}
            >
              Book Your Free
              <br className="hidden sm:block" />
              Demo Class
            </h1>

            {/* DESCRIPTION */}
            <p
              className={`
                ${getTypography(
  heroDescription,
  locale
)}
                mt-6
                text-[#7788B6]
                max-w-2xl
                mx-auto
              `}
            >
              Experience our teaching approach
              before enrolling. Connect with
              expert trainers through a completely
              free interactive demo session.
            </p>
          </div>

          {/* MAIN */}
          <div className="grid xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 mt-14 items-start">
            {/* LEFT INFO */}
            <div
  className={`
    ${featureCard}
    relative
    rounded-[30px]
    p-5
    sm:p-7
    lg:p-8
    h-[650px]
    overflow-hidden
    hover:translate-y-0
  `}
  style={elevatedSurface}
>
              {/* ACCENT */}
              <div className="absolute left-0 top-7 h-14 w-1 bg-[#4063a2] rounded-r-full" />

              <div className="pl-4">
                {/* ICON */}
                <div className="w-11 h-11 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                  <Play className="w-5 h-5 text-[#4063a2]" />
                </div>

                {/* TITLE */}
                <h2
                  className={`
                    ${getTypography(
  sectionHeading,
  locale
)}
                    mt-5
                    text-[#081C4B]
                  `}
                >
                  Demo Information
                </h2>

                {/* DESCRIPTION */}
                <p
                  className={`
                    ${getTypography(
  sectionDescription,
  locale
)}
                    mt-4
                    text-[#7788B6]
                  `}
                >
                  Book a free session and connect
                  with our expert trainers before
                  enrollment.
                </p>
              </div>

              {/* INFO LIST */}
              <div className="space-y-5 mt-10 pl-4">
                {/* PHONE */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFF] border border-[#E6EEFF] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#4063a2]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#081C4B]">
                      Phone Number
                    </p>

                    <p className="text-[#7788B6] text-sm mt-1">
                      +91 9500020181

                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFF] border border-[#E6EEFF] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#4063a2]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#081C4B]">
                      Email Address
                    </p>

                    <p className="text-[#7788B6] text-sm mt-1">
                      aritech@gmail.com
                    </p>
                  </div>
                </div>

                {/* HOURS */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFF] border border-[#E6EEFF] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#4063a2]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#081C4B]">
                      Working Hours
                    </p>

                    <p className="text-[#7788B6] text-sm mt-1">
                      Mon - Sat : 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFF] border border-[#E6EEFF] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#4063a2]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#081C4B]">
                      Our Location
                    </p>

                    <p className="text-[#7788B6] text-sm mt-1">
                      2nd Floor, No.687/4, Trichy Rd,
                        
                         Kallimadai, Kongu Nagar,
                        <br />
                        Ramanathapuram, Coimbatore, 
                        <br />
                        Tamil Nadu 641 045
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            
             <div
  className={`
    ${featureCard}
    relative
    rounded-[30px]
    p-5
    sm:p-7
    lg:p-8
    overflow-hidden
    hover:translate-y-0
  `}
  style={elevatedSurface}
>
  <div className="absolute top-0 right-0 w-60 h-60 bg-[#EEF4FF] rounded-full blur-3xl opacity-70" />

  <div className="relative z-10">
    <div>
      <div
        className={`
          inline-flex
          items-center
          gap-2
          ${tagPill}
        `}
        style={{
          background: '#4062a2b3',
          border: '1px solid #4063a2',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[#FFFFFF]" />

        <span
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-[#FFFFFF]
          "
        >
          Get In Touch
        </span>
      </div>

      <h2
        className={`
          ${getTypography(sectionHeading, locale)}
          mt-5
          text-[#081C4B]
        `}
      >
        Schedule Your
        <br className="hidden sm:block" />
        Free Demo Session
      </h2>

      <p
        className={`
          ${getTypography(sectionDescription, locale)}
          mt-4
          text-[#7788B6]
          max-w-2xl
        `}
      >
        Fill out the form and our team will contact you
        to schedule your free session.
      </p>
    </div>

    <div className="mt-8">
      <iframe
        src="https://forms.zohopublic.in/aritechacademy1/form/AritechEnquiryForm/formperma/55Hm7Ol5iFKVmC9PnPt_kLAcMXJ0waufaLAUJlHx4gY"
        width="100%"
        height="400"
        frameBorder="0"
        className="rounded-2xl"
      />
    </div>
  </div>
</div>
  </div>
</div>

                        

                   
              
        
      </section>
    </div>
  )
}