import Link from 'next/link'

export default function FourOhFour() {
  return <>
    <div className="flex flex-col justify-center items-center mt-16">
      <p className="text-6xl text-primary">404 Not Found</p>
      <Link href="/">
        <button
          className="sm:w-full lg:w-auto my-2 border hover:border-primary rounded md py-4 px-8 text-center bg-primary text-neutral hover:bg-neutral hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
          Back to home!
        </button>
      </Link>
    </div>
  </>
}
