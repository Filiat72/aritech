'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { toast } from 'sonner'

type Props = {
  mode: any
  pkg: any
  setModes: React.Dispatch<React.SetStateAction<any[]>>
  isDraft?: boolean
}

export default function PackageFeaturesSection({
  mode,
  pkg,
  setModes,
  isDraft,
}: Props) {
  const [newFeature, setNewFeature] = useState('')
  const [featureLoading, setFeatureLoading] = useState(false)

  function generateTempId() {
    return `temp-${Math.random().toString(36).slice(2)}-${Date.now()}`
  }

  async function handleAddFeature() {
    if (!newFeature.trim()) {
      toast.error('Feature name is required')

      return
    }

    try {
      setFeatureLoading(true)

      if (isDraft) {
        setModes(prev =>
          prev.map(item => {
            if (item.id !== mode.id) return item

            return {
              ...item,
              packages: item.packages.map((packageItem: any) => {
                if (packageItem.id !== pkg.id) return packageItem

                return {
                  ...packageItem,
                  features: [
                    ...(packageItem.features || []),
                    {
                      id: generateTempId(),
                      feature: newFeature.trim(),
                    },
                  ],
                }
              }),
            }
          })
        )

        setNewFeature('')
        toast.success('Feature added successfully')
        return
      }

      const res = await fetch(
        '/api/package-features',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feature: newFeature.trim(),
            packageId: pkg.id,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || 'Failed to add feature'
        )
      }

      setModes(prev =>
        prev.map(item => {
          if (item.id !== mode.id) return item

          return {
            ...item,
            packages: item.packages.map(
              (packageItem: any) => {
                if (packageItem.id !== pkg.id)
                  return packageItem

                return {
                  ...packageItem,
                  features: [
                    ...(packageItem.features || []),
                    data,
                  ],
                }
              }
            ),
          }
        })
      )

      setNewFeature('')
      toast.success('Feature added successfully')
    } catch (error: any) {
      toast.error(
        error.message || 'Failed to add feature'
      )
    } finally {
      setFeatureLoading(false)
    }
  }

  async function handleDeleteFeature(
    featureId: string
  ) {
    try {
      if (isDraft) {
        setModes(prev =>
          prev.map(item => {
            if (item.id !== mode.id) return item

            return {
              ...item,
              packages: item.packages.map(
                (packageItem: any) => {
                  if (packageItem.id !== pkg.id)
                    return packageItem

                  return {
                    ...packageItem,
                    features: (packageItem.features || []).filter(
                      (feature: any) =>
                        feature.id !== featureId
                    ),
                  }
                }
              ),
            }
          })
        )

        toast.success('Feature removed successfully')
        return
      }

      const res = await fetch(
        `/api/package-features?id=${featureId}`,
        {
          method: 'DELETE',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || 'Failed to delete feature'
        )
      }

      setModes(prev =>
        prev.map(item => {
          if (item.id !== mode.id) return item

          return {
            ...item,
            packages: item.packages.map(
              (packageItem: any) => {
                if (packageItem.id !== pkg.id)
                  return packageItem

                return {
                  ...packageItem,
                  features: (packageItem.features || []).filter(
                    (feature: any) =>
                      feature.id !== featureId
                  ),
                }
              }
            ),
          }
        })
      )

      toast.success('Feature removed successfully')
    } catch (error: any) {
      toast.error(
        error.message || 'Failed to delete feature'
      )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Package Features</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input
          placeholder="Feature"
          value={newFeature}
          onChange={e =>
            setNewFeature(e.target.value)
          }
        />

        <div className="md:col-span-2 flex items-center gap-2">
          <Button
            type="button"
            onClick={handleAddFeature}
            disabled={featureLoading}
          >
            Add Feature
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {(!pkg.features || pkg.features.length === 0) && (
          <p className="text-sm text-gray-400">
            No features added yet.
          </p>
        )}

        {pkg.features?.map((feature: any) => (
          <div
            key={feature.id}
            className="
              flex
              items-center
              justify-between
              gap-3
              rounded-xl
              border
              p-3
            "
          >
            <span>{feature.feature}</span>

            <button
              type="button"
              onClick={() =>
                handleDeleteFeature(feature.id)
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
        ))}
      </div>
    </div>
  )
}
