'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import PackageFeaturesSection from './PackageFeaturesSection'

import { toast } from 'sonner'

type Props = {
  mode: any

  setModes: React.Dispatch<
    React.SetStateAction<any[]>
  >

  isDraft?: boolean
}

export default function CoursePackagesSection({
  mode,
  setModes,
  isDraft,
}: Props) {
  const [newPackageName, setNewPackageName] =
    useState('')

  const [newPackagePrice, setNewPackagePrice] =
    useState('')

  const [
    newPackageDuration,
    setNewPackageDuration,
  ] = useState('')

  const [packageLoading, setPackageLoading] =
    useState(false)

  /* ======================================================
      ADD PACKAGE
  ====================================================== */

  async function handleAddPackage() {
    if (
      !newPackageName ||
      !newPackagePrice
    ) {
      toast.error(
        'Package name and price are required'
      )

      return
    }

    try {
      setPackageLoading(true)

      /* ======================================================
          DRAFT MODE
      ====================================================== */

      if (isDraft) {
        setModes(prev =>
          prev.map(item => {
            if (item.id !== mode.id)
              return item

            return {
              ...item,

              packages: [
                ...(item.packages || []),

                {
                  id: `temp-${Math.random()
                    .toString(36)
                    .slice(2)}-${Date.now()}`,

                  packageName:
                    newPackageName,

                  monthlyPrice:
                    Number(
                      newPackagePrice
                    ),

                  duration:
                    newPackageDuration,

                  features: [],
                },
              ],
            }
          })
        )

        setNewPackageName('')
        setNewPackagePrice('')
        setNewPackageDuration('')

        toast.success(
          'Package added successfully'
        )

        return
      }

      /* ======================================================
          DATABASE MODE
      ====================================================== */

      const res = await fetch(
        '/api/course-packages',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            packageName:
              newPackageName,

            monthlyPrice:
              Number(
                newPackagePrice
              ),

            duration:
              newPackageDuration,

            modeId: mode.id,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to add package'
        )
      }

      /* ======================================================
          UPDATE LOCAL STATE
      ====================================================== */

      setModes(prev =>
        prev.map(item => {
          if (item.id !== mode.id)
            return item

          return {
            ...item,

            packages: [
              ...(item.packages || []),
              data,
            ],
          }
        })
      )

      setNewPackageName('')
      setNewPackagePrice('')
      setNewPackageDuration('')

      toast.success(
        'Package added successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to add package'
      )
    } finally {
      setPackageLoading(false)
    }
  }

  /* ======================================================
      DELETE PACKAGE
  ====================================================== */

  async function handleDeletePackage(
    packageId: string
  ) {
    try {
      /* ======================================================
          DRAFT MODE
      ====================================================== */

      if (isDraft) {
        setModes(prev =>
          prev.map(item => {
            if (item.id !== mode.id)
              return item

            return {
              ...item,

              packages:
                item.packages.filter(
                  (pkg: any) =>
                    pkg.id !== packageId
                ),
            }
          })
        )

        toast.success(
          'Package deleted successfully'
        )

        return
      }

      /* ======================================================
          DATABASE MODE
      ====================================================== */

      const res = await fetch(
        `/api/course-packages?id=${packageId}`,
        {
          method: 'DELETE',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to delete package'
        )
      }

      setModes(prev =>
        prev.map(item => {
          if (item.id !== mode.id)
            return item

          return {
            ...item,

            packages:
              item.packages.filter(
                (pkg: any) =>
                  pkg.id !== packageId
              ),
          }
        })
      )

      toast.success(
        'Package deleted successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to delete package'
      )
    }
  }

  return (
    <div className="space-y-4">

      {/* ADD PACKAGE */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-3
        "
      >

        <Input
          placeholder="Package name"
          value={newPackageName}
          onChange={e =>
            setNewPackageName(
              e.target.value
            )
          }
        />

        <Input
          type="number"
          placeholder="Price"
          value={newPackagePrice}
          onChange={e =>
            setNewPackagePrice(
              e.target.value
            )
          }
        />

        <Input
          placeholder="Duration"
          value={newPackageDuration}
          onChange={e =>
            setNewPackageDuration(
              e.target.value
            )
          }
        />

        <Button
          type="button"
          onClick={handleAddPackage}
          disabled={packageLoading}
        >
          Add Package
        </Button>

      </div>

      {/* PACKAGE LIST */}

      <div className="space-y-3">

        {mode.packages?.length === 0 && (
          <p className="text-sm text-gray-400">
            No packages added yet.
          </p>
        )}

        {mode.packages?.map(
          (pkg: any) => (
            <div
              key={pkg.id}
              className="
                border
                rounded-xl
                p-4
                space-y-4
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h4 className="font-semibold">
                    {pkg.packageName}
                  </h4>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    ₹{pkg.monthlyPrice}

                    {pkg.duration &&
                      ` • ${pkg.duration}`}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDeletePackage(
                      pkg.id
                    )
                  }
                  className="
                    text-red-500
                    text-sm
                    font-medium
                  "
                >
                  Delete
                </button>

              </div>

              <PackageFeaturesSection
                mode={mode}
                pkg={pkg}
                setModes={setModes}
                isDraft={isDraft}
              />

            </div>
          )
        )}

      </div>

    </div>
  )
}