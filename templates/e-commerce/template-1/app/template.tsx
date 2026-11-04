export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter min-h-screen flex flex-col w-full">
      {children}
    </div>
  );
}

