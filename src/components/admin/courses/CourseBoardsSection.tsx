"use client"

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

type Props = {
  boards: any[]

  newBoard: string

  setNewBoard: (
    value: string
  ) => void

  handleAddBoard: () => void

  handleDeleteBoard: (
    id: string
  ) => void

  boardLoading: boolean
}

export default function CourseBoardsSection({
  boards,
  newBoard,
  setNewBoard,
  handleAddBoard,
  handleDeleteBoard,
  boardLoading,
}: Props) {
  return (
    <div className="space-y-3">

      <Label>
        Boards
      </Label>

      {/* ADD BOARD */}

      <div className="flex gap-2">

        <Input
          value={newBoard}
          onChange={e =>
            setNewBoard(
              e.target.value
            )
          }
          placeholder="Enter board name"
        />

        <Button
          type="button"
          onClick={handleAddBoard}
          disabled={boardLoading}
        >
          Add
        </Button>

      </div>

      {/* LIST */}

      <div className="flex flex-wrap gap-2">

        {boards.length === 0 && (
          <p className="text-sm text-gray-400">
            No boards added yet.
          </p>
        )}

        {boards.map(board => (
          <div
            key={board.id}
            className="
              flex
              items-center
              gap-2
              px-3
              py-1
              rounded-full
              bg-gray-100
              text-sm
            "
          >
            <span>
              {board.board}
            </span>

            <button
              type="button"
              onClick={() =>
                handleDeleteBoard(
                  board.id
                )
              }
              className="
                text-red-500
                font-bold
              "
            >
              ×
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}