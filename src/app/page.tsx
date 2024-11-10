import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        role="dialog"
        id="radix-:r1e:"
        aria-describedby="radix-:r1g:"
        aria-labelledby="radix-:r1f:"
        data-state="open"
        className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border shadow-lg duration-200 sm:rounded-lg gap-0 overflow-hidden p-0 md:rounded-2xl"
        tabIndex={-1} // Correct tabIndex case
        style={{
          pointerEvents: "auto", // Correct inline style
        }}
      >
        <div className="flex flex-col text-center sm:text-left items-center justify-center space-y-3 px-16 py-8">
          <a href="https://precedent.dev">
            {/* <Image
              alt="Logo"
              loading="lazy"
              width={48}
              height={48}
              className="h-10 w-10 rounded-full"
              src="/logo.png" // Simplified src for Next.js image
            /> */}
            <div className="w-12 h-12 rounded-md bg-gray-200"></div>
          </a>
          <h2 id="radix-:r1f:" className="font-display text-2xl font-bold leading-normal tracking-normal">
            Delete Account
          </h2>
          <p id="radix-:r1g:" className="text-muted-foreground text-sm text-center">
            This account will be deleted along with all your uploaded images and AI generated images/gifs.
          </p>
        </div>
        <div data-orientation="horizontal" role="none" className="bg-[#f4f4f5] shrink-0 bg-border h-[1px] w-full"></div>
        <div className="flex flex-col space-y-4 bg-muted px-16 py-8">
          <form className="flex flex-col space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="deleteConfirmation"
              >
                To verify, type <b>delete my account</b> below:
              </label>
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                id="deleteConfirmation"
                required
                pattern="delete my account"
                type="text"
                name="deleteConfirmation"
              />
            </div>
            <button
              className="text-white bg-[#ef4444] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              <p>Delete Account</p>
            </button>
          </form>
        </div>
        <button
          type="button"
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x h-4 w-4"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
}
