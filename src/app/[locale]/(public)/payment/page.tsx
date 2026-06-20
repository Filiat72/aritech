import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PaymentForm from '@/components/public/payment/PaymentForm'
export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{
    courseId?: string
    modeId?: string
    packageId?: string
  }>
}) {
  const {
    courseId,
    modeId,
    packageId,
  } = await searchParams

  if (
    !courseId ||
    !modeId ||
    !packageId
  ) {
    notFound()
  }

  const course =
    await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    })

  const mode =
    await prisma.courseMode.findUnique({
      where: {
        id: modeId,
      },
    })

  const pkg =
    await prisma.coursePackage.findUnique({
      where: {
        id: packageId,
      },
    })

  if (!course || !mode || !pkg) {
    notFound()
  }

  return (

  <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#081C4B]">
        Course Enrollment
      </h1>


  <p className="mt-3 text-gray-500">
    Complete your enrollment and proceed with secure payment.
  </p>
</div>

<div className="grid lg:grid-cols-5 gap-8 mt-8">

  <PaymentForm
    courseId={courseId}
    modeId={modeId}
    packageId={packageId}
    amount={pkg.monthlyPrice}
  />

   


  {/* Order Summary */}
  <div
    className="
      lg:col-span-2
      rounded-3xl
      bg-gradient-to-br
      from-white
      to-[#f8fbff]
      shadow-lg
      p-8
      h-fit
    "
  >
    <h2 className="text-xl font-bold text-[#081C4B]">
      Order Summary
    </h2>

    <div className="mt-6 space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-500">
          Course
        </span>

        <span className="font-semibold">
          {course.title}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Mode
        </span>

        <span className="font-semibold">
          {mode.modeName}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Package
        </span>

        <span className="font-semibold">
          {pkg.packageName}
        </span>
      </div>
    </div>
      

    <div className="mt-6 pt-6 border-t">
      <p className="text-sm text-gray-500">
        Total Payable
      </p>

      <h3 className="text-4xl font-bold text-[#4063a2] mt-2">
        ₹{pkg.monthlyPrice.toLocaleString()}
      </h3>
    </div>

    <div className="mt-6 space-y-2 text-sm text-gray-600">
      <p>✓ Secure Razorpay Payment</p>
      <p>✓ Instant Confirmation</p>
      <p>✓ LMS Credentials Shared After Verification</p>
    </div>
  </div>
</div>
</div>

 
)
}