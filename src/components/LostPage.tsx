import FuzzyText from "@/components/ui/fuzzyText";

export default function LostPage() {
  return (
    <div className=" bg-black/90 h-[100dvh] flex flex-col overflow-y-hidden overflow-x-hidden items-center justify-center backdrop-blur-sm">
      <FuzzyText baseIntensity={0.2}>404 Not found</FuzzyText>
    </div>
  );
}
