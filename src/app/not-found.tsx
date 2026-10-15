import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center py-16 px-8">
          {/* Animated 404 */}
          <div className="relative mb-6">
            <h1 className="text-[10rem] md:text-[12rem] font-extrabold leading-none bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-30 bg-linear-to-r from-primary via-secondary to-accent -z-10" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            Oops! Page not found
          </h2>

          <p className="text-base-content/70 max-w-md mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/" className="btn btn-primary gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>

            {/* <Link href="/contact" className="btn btn-outline btn-secondary gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Support
            </Link> */}
          </div>

         

        
        </div>
      </div>
    </div>
  );
}