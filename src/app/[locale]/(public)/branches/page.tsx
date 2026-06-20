import { prisma } from '@/lib/prisma'
import { MapPin, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function BranchesPage() {
  const branches = await prisma.branch.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="pt-16" style={{ background: '#f8faff' }}>
      {/* Header */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2580 100%)' }}
      >
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
          style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623' }}
        >
          OUR LOCATIONS
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Our Branches
        </h1>
        <p className="text-blue-200 max-w-xl mx-auto">
          Find an Aritech branch near you and visit us today
        </p>
      </section>

      {/* Branches Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {branches.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">No branches added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map(branch => (
                <div
                  key={branch.id}
                  className="rounded-2xl border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ background: '#ffffff', borderColor: '#e8ecff' }}
                >
                  <div
                    className="h-3"
                    style={{ background: 'linear-gradient(135deg, #1a3fca, #0d2580)' }}
                  />
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(26,63,202,0.08)' }}
                    >
                      <MapPin className="w-6 h-6" style={{ color: '#1a3fca' }} />
                    </div>
                    <h3 className="font-black text-lg mb-1" style={{ color: '#0d2580' }}>
                      {branch.name}
                    </h3>
                    <p className="text-sm font-medium mb-3" style={{ color: '#1a3fca' }}>
                      {branch.city}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">{branch.address}</p>

                    <a
                      href={`tel:${branch.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-sm font-medium mb-4 hover:text-[#1a3fca] transition-colors"
                      style={{ color: '#374151' }}
                    >
                      <Phone className="w-4 h-4" style={{ color: '#1a3fca' }} />
                      {branch.phone}
                    </a>
                    {branch.mapUrl && (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-bold"
                        style={{ color: '#f5a623' }}
                      >
                        Get Directions
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #1a3fca, #0d2580)' }}
      >
        <h2 className="text-2xl font-black text-white mb-3">
          Visit Us Today
        </h2>
        <p className="text-blue-200 mb-6">
          Walk in or book a free demo class at your nearest branch
        </p>
        <Link
          href="/book-demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #f5a623, #e8920f)', color: '#0d2580' }}
        >
          Book Free Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}