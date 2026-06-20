"use client"

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import CoursePackagesSection from './CoursePackagesSection'

type Props = {
  modes: any[]

  setModes: React.Dispatch<
    React.SetStateAction<any[]>
  >

  newMode: string

  setNewMode: (
    value: string
  ) => void

  handleAddMode: () => void

  handleDeleteMode: (
    id: string
  ) => void

  modeLoading: boolean

  isDraft?: boolean
}

export default function CourseModesSection({
  modes,
  setModes,
  newMode,
  setNewMode,
  handleAddMode,
  handleDeleteMode,
  modeLoading,
  isDraft,
}: Props) {
  return (
    <div className="space-y-3">

      <Label>
        Course Modes
      </Label>

      {/* ADD MODE */}

      <div className="flex gap-2">

        <Input
          value={newMode}
          onChange={e =>
            setNewMode(
              e.target.value
            )
          }
          placeholder="Enter mode name"
        />

        <Button
          type="button"
          onClick={handleAddMode}
          disabled={modeLoading}
        >
          Add
        </Button>

      </div>

      {/* LIST */}

      <div className="space-y-4">

        {modes.length === 0 && (
          <p className="text-sm text-gray-400">
            No modes added yet.
          </p>
        )}

        {modes.map(mode => (
          <div
            key={mode.id}
            className="
              border
              rounded-xl
              p-4
              space-y-3
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <h3 className="font-semibold">
                {mode.modeName}
              </h3>

              <button
                type="button"
                onClick={() =>
                  handleDeleteMode(
                    mode.id
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

           <CoursePackagesSection
  mode={mode}
  setModes={setModes}
  isDraft={isDraft}
/>


          </div>
        ))}

      </div>

    </div>
  )
}