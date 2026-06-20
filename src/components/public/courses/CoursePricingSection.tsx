'use client'

import { useMemo, useState } from 'react'

import { Link } from '@/i18n/navigation'

import {
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

import { featureCard } from '@/styles/cards'

export default function CoursePricingSection({
  modes,
  courseId,
}: {
  modes: any[]
  courseId: string
}) {
  const activeModes = useMemo(
    () =>
      modes.filter(
        (mode: any) =>
          mode.isActive !== false
      ),
    [modes]
  )

  const [selectedModeId, setSelectedModeId] =
    useState(
      activeModes?.[0]?.id || ''
    )

  const selectedMode =
    activeModes.find(
      (mode: any) =>
        mode.id === selectedModeId
    ) || activeModes[0]

  if (
    !activeModes ||
    activeModes.length === 0
  ) {
    return null
  }

  return (
    <section
      id="pricing"
      className="
        py-12
        sm:py-16
        px-4
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="text-center">
          <span
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
            "
            style={{
              color: '#4063a2',
            }}
          >
            COURSE PLANS
          </span>

          <h2
            className="
              mt-3
              text-[1.4rem]
              sm:text-[3rem]
              font-semibold
              leading-[1.1]
            "
            style={{
              color: '#081C4B',
            }}
          >
            Choose Your Learning Mode
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              mx-auto
              text-sm
              sm:text-base
              leading-7
            "
            style={{
              color: '#64748B',
            }}
          >
            Flexible learning plans
            designed for different
            academic goals and
            learning preferences.
          </p>
        </div>

        {/* =======================================================
            MODE TABS
        ======================================================= */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            mt-10
          "
        >
          {activeModes.map(
            (mode: any) => {
              const isActive =
                selectedMode.id ===
                mode.id

              return (
                <button
                  key={mode.id}
                  onClick={() =>
                    setSelectedModeId(
                      mode.id
                    )
                  }
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                  "
                  style={{
                    background:
                      isActive
                        ? '#31446b'
                        : '#F8FAFF',

                    color: isActive
                      ? '#FFFFFF'
                      : '#081C4B',

                    border: isActive
                      ? '1px solid #31446b'
                      : '1px solid #DCE7FF',
                  }}
                >
                  {mode.modeName}
                </button>
              )
            }
          )}
        </div>

        {/* =======================================================
            PACKAGE CARDS
        ======================================================= */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
            mt-12
          "
        >
          {selectedMode.packages.map(
            (pkg: any) => {
              const isPremium =
                pkg.isPopular ||
                pkg.isRecommended

              return (
                <div
                  key={pkg.id}
                  className={`
                    ${featureCard}
                    relative
                    rounded-[26px]
                    border
                    overflow-hidden
flex
flex-col
h-full
                  `}
                  style={{
                    background:
                      '#FFFFFF',

                    border: isPremium
                      ? '2px solid #4063a2'
                      : '1px solid rgba(3,73,224,0.08)',

                    boxShadow:
                      '0 10px 28px rgba(15,23,42,0.05)',
                  }}
                >
                  {/* BADGE */}

                  {isPremium && (
                    <div
                      className="
                        absolute
                        top-4
                        right-4
                        px-3
                        py-1
                        rounded-full
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                      "
                      style={{
                        background:
                          '#4063a2',

                        color:
                          '#FFFFFF',
                      }}
                    >
                      {pkg.isPopular
                        ? 'Popular'
                        : 'Recommended'}
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* PACKAGE */}

                    <div>
                      <h3
                        className="
                          text-[1.7rem]
                          font-black
                          leading-none
                        "
                        style={{
                          color:
                            '#081C4B',
                        }}
                      >
                        {
                          pkg.packageName
                        }
                      </h3>

                      {/* PRICE */}

                      <div className="mt-4 flex items-end gap-1">
                        <span
                          className="
                            text-[2.2rem]
                            font-black
                            leading-none
                          "
                          style={{
                            color:
                              '#4063a2',
                          }}
                        >
                          ₹
                          {pkg.monthlyPrice.toLocaleString()}
                        </span>

                        {/* <span
                          className="
                            text-xs
                            mb-1
                          "
                          style={{
                            color:
                              '#64748B',
                          }}
                        >
                          /month
                        </span> */}
                      </div>

                      {/* DURATION */}

                      {pkg.duration && (
                        <p
                          className="
                            mt-2
                            text-xs
                            font-medium
                          "
                          style={{
                            color:
                              '#64748B',
                          }}
                        >
                          {
                            pkg.duration
                          }
                        </p>
                      )}
                    </div>

                    {/* FEATURES */}

                    {pkg.features
                      .length > 0 && (
                      <div className="mt-6 space-y-3">
                        {pkg.features
                          .slice(0, 4)
                          .map(
                            (
                              feature: any
                            ) => (
                              <div
                                key={
                                  feature.id
                                }
                                className="
                                  flex
                                  items-start
                                  gap-2.5
                                "
                              >
                                <CheckCircle
                                  className="
                                    w-4
                                    h-4
                                    mt-0.5
                                    flex-shrink-0
                                  "
                                  style={{
                                    color:
                                      '#4063a2',
                                  }}
                                />

                                <p
                                  className="
                                    text-[13px]
                                    leading-6
                                  "
                                  style={{
                                    color:
                                      '#4B5C88',
                                  }}
                                >
                                  {
                                    feature.feature
                                  }
                                </p>
                              </div>
                            )
                          )}

                        {pkg.features
                          .length >
                          4 && (
                          <p
                            className="
                              text-xs
                              font-semibold
                              pt-1
                            "
                            style={{
                              color:
                                '#4063a2',
                            }}
                          >
                            +
                            {' '}
                            {pkg.features.length -
                              4}
                            {' '}
                            more benefits
                          </p>
                        )}
                      </div>
                    )}

                    {/* CTA */}

                    <div className="mt-auto pt-6">
                      <Link
  href={{
    pathname: '/payment',
    query: {
      courseId,
      modeId: selectedMode.id,
      packageId: pkg.id,
    },
  }}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    w-full
    py-3
    rounded-2xl
    text-sm
    font-bold
    transition-all
    duration-300
    hover:scale-[1.01]
  "
  style={{
    background: isPremium
      ? '#31446b'
      : '#EEF4FF',
    color: isPremium
      ? '#FFFFFF'
      : '#081C4B',
  }}
>
  Enroll Now
  <ArrowRight className="w-4 h-4" />
</Link>
                    </div>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}