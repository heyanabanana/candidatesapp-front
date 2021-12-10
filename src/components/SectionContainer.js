export default function SectionContainer({ children }) {
  return (
    <div className="p-10 h-full max-w-4xl mx-auto sm:px-6 md:max-w-4xl lg:max-w-5xl xl:max-w-5xl xl:px-0">
      {children}
    </div>
  );
}
