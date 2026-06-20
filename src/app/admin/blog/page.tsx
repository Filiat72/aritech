'use client'

import {
  useEffect,
  useState,
  useRef,
} from 'react'

import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Badge } from '@/components/ui/badge'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ImageIcon,
  X,
} from 'lucide-react'

const MDEditor = dynamic(
  () =>
    import(
      '@uiw/react-md-editor'
    ),
  { ssr: false }
)

type BlogPost = {
  id: string

  title: string

  slug: string

  excerpt?: string

  coverImage?: string

  content: string

  isPublished: boolean

  createdAt: string
}

const empty = {
  title: '',

  slug: '',

  excerpt: '',

  coverImage: '',

  content: '',

  isPublished: false,
}

export default function BlogPage() {
  const [posts, setPosts] =
    useState<BlogPost[]>([])

  const [form, setForm] =
    useState(empty)

  const [editing, setEditing] =
    useState<BlogPost | null>(
      null
    )

  const [showEditor, setShowEditor] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [
    imagePreview,
    setImagePreview,
  ] = useState<
    string | null
  >(null)

  const fileRef =
    useRef<HTMLInputElement>(null)

  /* ======================================================
      FETCH POSTS
  ====================================================== */

  async function fetchPosts() {
    const res = await fetch(
      '/api/blog'
    )

    const data = await res.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  /* ======================================================
      AUTO SLUG
  ====================================================== */

  function generateSlug(
    title: string
  ) {
    return title
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s-]/g,
        ''
      )
      .replace(
        /\s+/g,
        '-'
      )
  }

  /* ======================================================
      OPEN ADD
  ====================================================== */

  function openAdd() {
    setEditing(null)

    setForm(empty)

    setImagePreview(null)

    setShowEditor(true)
  }

  /* ======================================================
      OPEN EDIT
  ====================================================== */

  function openEdit(
    p: BlogPost
  ) {
    setEditing(p)

    setForm({
      title: p.title,

      slug: p.slug,

      excerpt:
        p.excerpt || '',

      coverImage:
        p.coverImage || '',

      content: p.content,

      isPublished:
        p.isPublished,
    })

    setImagePreview(
      p.coverImage || null
    )

    setShowEditor(true)
  }

  /* ======================================================
      IMAGE
  ====================================================== */

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0]

    if (!file) return

    const reader =
      new FileReader()

    reader.onload = () => {
      const result =
        reader.result as string

      setImagePreview(result)

      setForm({
        ...form,

        coverImage: result,
      })
    }

    reader.readAsDataURL(file)
  }

  function removeImage() {
    setImagePreview(null)

    setForm({
      ...form,

      coverImage: '',
    })

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  /* ======================================================
      SUBMIT
  ====================================================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    if (editing) {
      await fetch(
        `/api/blog/${editing.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            form
          ),
        }
      )
    } else {
      await fetch(
        '/api/blog',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            form
          ),
        }
      )
    }

    setLoading(false)

    setShowEditor(false)

    fetchPosts()
  }

  /* ======================================================
      DELETE
  ====================================================== */

  async function handleDelete(
    id: string
  ) {
    if (
      !confirm(
        'Delete this post?'
      )
    )
      return

    await fetch(
      `/api/blog/${id}`,
      {
        method: 'DELETE',
      }
    )

    fetchPosts()
  }

  /* ======================================================
      TOGGLE PUBLISH
  ====================================================== */

  async function togglePublish(
    p: BlogPost
  ) {
    await fetch(
      `/api/blog/${p.id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          ...p,

          isPublished:
            !p.isPublished,
        }),
      }
    )

    fetchPosts()
  }

  /* ======================================================
      EDITOR VIEW
  ====================================================== */

  if (showEditor) {
    return (
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-black">
              {editing
                ? 'Edit Post'
                : 'New Post'}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create educational blog content
            </p>

          </div>

          <Button
            variant="outline"
            onClick={() =>
              setShowEditor(
                false
              )
            }
          >
            ← Back
          </Button>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* COVER IMAGE */}

          <Card className="rounded-3xl">

            <CardContent className="pt-6">

              <div className="space-y-3">

                <Label>
                  Cover Image
                </Label>

                {imagePreview ? (

                  <div className="relative rounded-2xl overflow-hidden border">

                    <img
                      src={
                        imagePreview
                      }
                      alt="preview"
                      className="
                        w-full
                        h-[250px]
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={
                        removeImage
                      }
                      className="
                        absolute
                        top-3
                        right-3
                        w-8
                        h-8
                        rounded-full
                        bg-black/70
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <X className="w-4 h-4" />
                    </button>

                  </div>
                ) : (

                  <button
                    type="button"
                    onClick={() =>
                      fileRef.current?.click()
                    }
                    className="
                      w-full
                      h-[220px]
                      border-2
                      border-dashed
                      rounded-2xl
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-3
                      text-gray-400
                      hover:bg-gray-50
                    "
                  >

                    <ImageIcon className="w-10 h-10" />

                    <span className="text-sm font-medium">
                      Upload Cover Image
                    </span>

                  </button>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={
                    handleImage
                  }
                />

              </div>

            </CardContent>

          </Card>

          {/* TITLE */}

          <div className="space-y-2">

            <Label>
              Title
            </Label>

            <Input
              value={form.title}
              onChange={e => {
                const title =
                  e.target.value

                setForm({
                  ...form,

                  title,

                  slug:
                    generateSlug(
                      title
                    ),
                })
              }}
              placeholder="e.g. How to crack TNPSC Group 2"
              required
            />

          </div>

          {/* SLUG */}

          <div className="space-y-2">

            <Label>
              Slug
            </Label>

            <Input
              value={form.slug}
              onChange={e =>
                setForm({
                  ...form,

                  slug:
                    e.target
                      .value,
                })
              }
              placeholder="blog-url-slug"
              required
            />

          </div>

          {/* EXCERPT */}

          <div className="space-y-2">

            <Label>
              Excerpt
            </Label>

            <textarea
              className="
                w-full
                border
                rounded-xl
                p-3
                text-sm
                min-h-[90px]
                outline-none
                focus:ring-2
                focus:ring-blue-200
              "
              value={
                form.excerpt
              }
              onChange={e =>
                setForm({
                  ...form,

                  excerpt:
                    e.target
                      .value,
                })
              }
              placeholder="Short summary for blog cards and SEO..."
            />

          </div>

          {/* CONTENT */}

          <div className="space-y-2">

            <Label>
              Content
            </Label>

            <div data-color-mode="light">

              <MDEditor
                value={
                  form.content
                }
                onChange={val =>
                  setForm({
                    ...form,

                    content:
                      val ||
                      '',
                  })
                }
                height={500}
              />

            </div>

          </div>

          {/* PUBLISH */}

          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              id="publish"
              checked={
                form.isPublished
              }
              onChange={e =>
                setForm({
                  ...form,

                  isPublished:
                    e.target
                      .checked,
                })
              }
            />

            <Label htmlFor="publish">
              Publish immediately
            </Label>

          </div>

          {/* ACTIONS */}

          <div className="flex gap-2">

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Saving...'
                : editing
                ? 'Save Changes'
                : 'Publish Post'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setShowEditor(
                  false
                )
              }
            >
              Cancel
            </Button>

          </div>

        </form>

      </div>
    )
  }

  /* ======================================================
      TABLE VIEW
  ====================================================== */

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-black">
            Blog Posts
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage educational articles and announcements
          </p>

        </div>

        <button
          onClick={openAdd}
          className="
            px-4
            py-2
            rounded-xl
            text-sm
            font-bold
            transition-all
          "
          style={{
            background:
              '#31446b',

            color:
              '#ffffff',
          }}
        >
          + Add Blog Post
        </button>

      </div>

      <Card className="rounded-3xl border border-gray-200 shadow-sm">

        <CardHeader>

          <CardTitle>
            All Posts (
            {posts.length})
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Post
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Date
                </TableHead>

                <TableHead>
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {posts.length ===
                0 && (
                <TableRow>

                  <TableCell
                    colSpan={4}
                    className="
                      text-center
                      py-12
                      text-gray-400
                    "
                  >
                    No posts yet. Write your first blog post.
                  </TableCell>

                </TableRow>
              )}

              {posts.map(p => (

                <TableRow
                  key={p.id}
                >

                  {/* POST */}

                  <TableCell>

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-16
                          h-16
                          rounded-xl
                          overflow-hidden
                          bg-gray-100
                          shrink-0
                        "
                      >

                        {p.coverImage ? (

                          <img
                            src={
                              p.coverImage
                            }
                            alt={
                              p.title
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />
                        ) : (

                          <div
                            className="
                              w-full
                              h-full
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <ImageIcon className="w-5 h-5 text-gray-400" />

                          </div>
                        )}

                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          {p.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          /blog/
                          {p.slug}
                        </p>

                      </div>

                    </div>

                  </TableCell>

                  {/* STATUS */}

                  <TableCell>

                    <Badge
                      className="
                        cursor-pointer
                        border-0
                        text-white
                      "
                      style={{
                        background:
                          p.isPublished
                            ? '#16a34a'
                            : '#6b7280',
                      }}
                      onClick={() =>
                        togglePublish(
                          p
                        )
                      }
                    >
                      {p.isPublished
                        ? 'Published'
                        : 'Draft'}
                    </Badge>

                  </TableCell>

                  {/* DATE */}

                  <TableCell className="text-sm text-gray-500">

                    {new Date(
                      p.createdAt
                    ).toLocaleDateString(
                      'en-IN'
                    )}

                  </TableCell>

                  {/* ACTIONS */}

                  <TableCell>

                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          openEdit(
                            p
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleDelete(
                            p.id
                          )
                        }
                      >
                        Delete
                      </Button>

                    </div>

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>
  )
}