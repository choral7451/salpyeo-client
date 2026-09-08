import { Sparkles } from "lucide-react";

export function AiSummary({ text }: { text: string }) {
  return (
    <section className="rounded-3xl bg-dark p-6">
      <div className="flex items-center gap-2">
        <Sparkles size={16} strokeWidth={2} className="text-dark-on-blue" aria-hidden />
        <h2 className="text-sm font-bold text-dark-on-blue">AI 요약</h2>
      </div>
      <p className="mt-2.5 text-[15px] leading-[1.75] text-dark-body">{text}</p>
    </section>
  );
}
