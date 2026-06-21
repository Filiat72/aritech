'use client'

import { useState } from 'react'

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
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

import {
  primaryButton,
} from '@/styles/buttons'

const courses = [
  'School Coaching (1st to 12th)',
  'NEET Coaching',
  'JEE Coaching',
  'TNPSC & Competitive Exam Coaching',
  'SSC Banking Railways',
  'Spoken English',
  'Spoken Hindi',
  'Vedic Maths',
  'Phonics Program',
  'MIS Training',
  'Typewriting Training',
  'Medical Coding Job Training',
  'Software Training',
  'Hardware Training',
  'Distance Education Programs',
]
function FacebookIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M22 12.07C22 6.503 17.523 2 12 2S2 6.503 2 12.07c0 5.017 3.657 9.173 8.438 9.93v-7.03H7.898v-2.9h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.198 2.238.198v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.887h2.773l-.443 2.9h-2.33V22c4.78-.757 8.437-4.913 8.437-9.93Z" />
    </svg>
  )
}

function InstagramIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5Zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4Zm8.75 1a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 16.5 5Zm-4.5 1.5A5 5 0 1 0 17 11.5A5 5 0 0 0 12 6.5Zm0 2A3 3 0 1 1 9 11.5A3 3 0 0 1 12 8.5Z" />
    </svg>
  )
}

function YoutubeIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.9 4.8 12 4.8 12 4.8h0s-3.9 0-6.9.3c-.4 0-1.3.1-2.1.9c-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.9.8 2.4.9c1.7.2 6.6.3 6.6.3s3.9 0 6.9-.3c.4 0 1.3-.1 2.1-.9c.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8ZM10 15.2V8.8l6 3.2-6 3.2Z" />
    </svg>
  )
}

function LinkedinIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M4.98 3.5C4.98 4.604 4.104 5.5 3 5.5S1.02 4.604 1.02 3.5C1.02 2.396 1.896 1.5 3 1.5S4.98 2.396 4.98 3.5ZM1.5 8h3V22h-3V8Zm7.5 0h2.88v1.91h.04c.4-.76 1.38-1.56 2.84-1.56C18.42 8.35 20 10.13 20 13.26V22h-3v-7.24c0-1.73-.03-3.96-2.41-3.96c-2.41 0-2.78 1.88-2.78 3.83V22h-3V8Z" />
    </svg>
  )
}
export default function ContactPage() {

  const locale = useLocale()
  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          ...form,
          source: 'Contact Page',
        }),
      })

      if (res.ok) {
        setSuccess(true)

        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

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

        <div className="absolute top-0 right-0 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-[#EEF4FF] rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div
          className={`
            ${container}
            relative
            z-10
          `}
        >
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
                Contact Us
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
              Get in Touch with Us
            </h1>

            {/* DESCRIPTION */}

            <p
              className={`
                ${getTypography(
  sectionDescription,
  locale
)}
                mt-6
                text-[#7788B6]
                max-w-2xl
                mx-auto
              `}
            >
              Have questions regarding
              admissions, courses or career
              guidance? Our team is here to
              help you with everything you
              need.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}

      <section className="pb-20">
        <div className={container}>
          <div className="grid xl:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
            {/* FORM */}

            <div
              className={`
                ${featureCard}
                rounded-[28px]
                p-5
                sm:p-7
                lg:p-8
                hover:translate-y-0
              `}
              style={elevatedSurface}
            >
              {success ? (
                <div className="text-center py-10 sm:py-14">
                  <div className="w-20 h-20 rounded-full bg-[#4063a2] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#0349E0]" />
                  </div>

                  <h3
                    className={`
                      ${getTypography(
  sectionHeading,
  locale
)}
                      mt-6
                      text-[#081C4B]
                    `}
                  >
                    Message Sent Successfully
                  </h3>

                  <p
                    className={`
                      ${getTypography(
  sectionDescription,
  locale
)}
                      mt-4
                      text-[#7788B6]
                      max-w-xl
                      mx-auto
                    `}
                  >
                    Our team will contact you
                    shortly regarding your
                    enquiry.
                  </p>

                  <button
                    onClick={() =>
                      setSuccess(false)
                    }
                    className={`
                      ${primaryButton}
                      mt-8
                      bg-[#4063a2]
                      text-white
                    `}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-7">
                    {/* FIRST NAME */}

                    <div>
                      <label className="text-sm font-semibold text-[#081C4B]">
                        First Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={e =>
                          setForm({
                            ...form,
                            firstName:
                              e.target.value,
                          })
                        }
                        placeholder="Enter First Name"
                        className="
                          mt-3
                          w-full
                          border-b
                          border-[#D6E4FF]
                          bg-transparent
                          py-3
                          outline-none
                          text-[#081C4B]
                          placeholder:text-gray-400
                          focus:border-[#0349E0]
                          transition-all
                        "
                      />
                    </div>

                    {/* LAST NAME */}

                    <div>
                      <label className="text-sm font-semibold text-[#081C4B]">
                        Last Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={e =>
                          setForm({
                            ...form,
                            lastName:
                              e.target.value,
                          })
                        }
                        placeholder="Enter Last Name"
                        className="
                          mt-3
                          w-full
                          border-b
                          border-[#D6E4FF]
                          bg-transparent
                          py-3
                          outline-none
                          text-[#081C4B]
                          placeholder:text-gray-400
                          focus:border-[#0349E0]
                          transition-all
                        "
                      />
                    </div>

                    {/* EMAIL */}

                    <div>
                      <label className="text-sm font-semibold text-[#081C4B]">
                        Email *
                      </label>

                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e =>
                          setForm({
                            ...form,
                            email:
                              e.target.value,
                          })
                        }
                        placeholder="example@gmail.com"
                        className="
                          mt-3
                          w-full
                          border-b
                          border-[#D6E4FF]
                          bg-transparent
                          py-3
                          outline-none
                          text-[#081C4B]
                          placeholder:text-gray-400
                          focus:border-[#0349E0]
                          transition-all
                        "
                      />
                    </div>

                    {/* PHONE */}

                    <div>
                      <label className="text-sm font-semibold text-[#081C4B]">
                        Phone *
                      </label>

                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e =>
                          setForm({
                            ...form,
                            phone:
                              e.target.value,
                          })
                        }
                        placeholder="Enter Phone Number"
                        className="
                          mt-3
                          w-full
                          border-b
                          border-[#D6E4FF]
                          bg-transparent
                          py-3
                          outline-none
                          text-[#081C4B]
                          placeholder:text-gray-400
                          focus:border-[#0349E0]
                          transition-all
                        "
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}

                  <div className="mt-8">
                    <label className="text-sm font-semibold text-[#081C4B]">
                      Subject *
                    </label>

                    <select
                      required
                      value={form.subject}
                      onChange={e =>
                        setForm({
                          ...form,
                          subject:
                            e.target.value,
                        })
                      }
                      className="
                        mt-3
                        w-full
                        border-b
                        border-[#D6E4FF]
                        bg-transparent
                        py-3
                        outline-none
                        text-[#081C4B]
                        focus:border-[#0349E0]
                        transition-all
                      "
                    >
                      <option value="">
                        Select Course
                      </option>

                      {courses.map(
                        course => (
                          <option
                            key={course}
                            value={course}
                          >
                            {course}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* MESSAGE */}

                  <div className="mt-8">
                    <label className="text-sm font-semibold text-[#081C4B]">
                      Your Message *
                    </label>

                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={e =>
                        setForm({
                          ...form,
                          message:
                            e.target.value,
                        })
                      }
                      placeholder="Enter Message"
                      className="
                        mt-3
                        w-full
                        border-b
                        border-[#D6E4FF]
                        bg-transparent
                        py-3
                        outline-none
                        resize-none
                        text-[#081C4B]
                        placeholder:text-gray-400
                        focus:border-[#0349E0]
                        transition-all
                      "
                    />
                  </div>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      ${primaryButton}
                      mt-10
                      bg-[#31446b]
                      text-white
                      shadow-[0_10px_30px_rgba(3,73,224,0.18)]
                    `}
                  >
                    {loading
                      ? 'Sending...'
                      : 'Send Message'}

                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* CONTACT INFO */}

            <div
              className={`
                ${featureCard}
                rounded-[28px]
                p-6
                sm:p-7
                lg:sticky
                lg:top-28
                hover:translate-y-0
              `}
              style={{
                background:
                  '#4063a2',

                boxShadow:
                  '0 18px 50px rgba(3,73,224,0.18)',
              }}
            >
              <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10">
                <h2
                  className={`
                    ${getTypography(
  sectionHeading,
  locale
)}
                    text-white
                  `}
                >
                  Contact Information
                </h2>

                <p
                  className={`
                    ${getTypography(
  sectionDescription,
  locale
)}
                    mt-4
                    text-blue-100
                  `}
                >
                  Reach out anytime for
                  admissions, courses or
                  guidance support.
                </p>

                {/* ITEMS */}

                <div className="mt-10 space-y-7">
                  {/* ADDRESS */}

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Address
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-blue-100">
                        2nd Floor, No.687/4, Trichy Rd,
                        <br />
                         Kallimadai, Kongu Nagar,
                        <br />
                        Ramanathapuram, Coimbatore, 
                        <br />
                        Tamil Nadu 641 045
                      </p>
                    </div>
                  </div>

                  {/* CONTACT */}

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Contact
                      </p>

                      <p className="mt-2 text-sm text-blue-100">
                        +91 9500020181
                      </p>

                      <p className="mt-1 text-sm text-blue-100">
                        info@aritech.com
                      </p>
                    </div>
                  </div>

                  {/* HOURS */}

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Working Hours
                      </p>

                      <p className="mt-2 text-sm text-blue-100">
                        Monday to Saturday
                      </p>

                      <p className="mt-1 text-sm text-blue-100">
                        9:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Support
                      </p>

                      <p className="mt-2 text-sm text-blue-100">
                        admissions@aritech.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* SOCIAL */}

                <div className="mt-10">
                  <p className="font-bold text-white">
                    Stay Connected
                  </p>

                  <div className="flex gap-3 mt-5">
  {[
    FacebookIcon,
    InstagramIcon,
    YoutubeIcon,
    LinkedinIcon,
  ].map((Icon, index) => (
    <div
      key={index}
      className=" 
        w-10
        h-10
        rounded-full
        bg-white
        text-[#4063a2]
        flex
        items-center
        justify-center
        transition-all
        hover:scale-105
        cursor-pointer
      "
    >
      <Icon className="w-4 h-4" />
    </div>
  ))}
</div>
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}

          <div className="mt-10">
            <div
              className={`
                ${featureCard}
                rounded-[28px]
                overflow-hidden
                hover:translate-y-0
              `}
              style={elevatedSurface}
            >
              <iframe
                title="AriTech Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.557895293104!2d77.00134937451983!3d10.996704955093033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85912d75d1b11%3A0x853d89fba1969098!2sAritech%20Services%20and%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1782013278767!5m2!1sen!2sin"
                width="100%"
                height="380"
                loading="lazy"
                className="border-0 grayscale-[0.1]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}