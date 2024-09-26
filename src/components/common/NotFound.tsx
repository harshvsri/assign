function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="space-y-4 text-center">
        <h1 className="text-9xl font-extrabold tracking-tighter">404</h1>
        <h2 className="text-4xl font-bold">Not Found</h2>
        <p className="text-xl text-muted-foreground">
          Oops! Something went wrong.
        </p>
      </div>
      <div className="mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="240"
          height="240"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
    </div>
  );
}

export default NotFound;
