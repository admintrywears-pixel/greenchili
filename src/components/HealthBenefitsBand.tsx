import { ArrowRight, HeartPulse, ShieldCheck, Sparkles, Sprout } from 'lucide-react';
import { HEALTH_BENEFITS } from '../data/healthData';
import { HEALTH_BENEFIT_URDU } from '../data/urduContent';
import type { PageId } from '../types/navigation';

interface HealthBenefitsBandProps {
  onNavigate?: (page: PageId) => void;
  compact?: boolean;
}

const BENEFIT_ICONS = [ShieldCheck, HeartPulse, Sparkles, Sprout, HeartPulse, ShieldCheck];

export default function HealthBenefitsBand({ onNavigate, compact = false }: HealthBenefitsBandProps) {
  return (
    <section
      id="health-benefits"
      aria-label="Green Chili Health & Nutrition Benefits"
      className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-20"
    >
      <div className="rounded-tl-[3.75rem] rounded-br-[3.75rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/92 border border-[#84CC16]/30 p-7 sm:p-11 shadow-2xl space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635] flex flex-wrap items-center gap-2">
              <span>Complete Clean-Spice Health Brand ·</span>
              <span lang="ur" className="font-urdu-inline normal-case text-sm text-[#EAB308]">
                مکمل صحت مند برانڈ
              </span>
            </p>
            <h2
              className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Why Fresh <span className="italic font-medium text-[#A3E635]">Green Chilli</span> Is
              Built for Your Body&apos;s Health.
            </h2>
            <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB308]">
              تازہ ہری مرچ آپ کی صحت، ہاضمے اور قوتِ مدافعت کے لیے قدرتی تحفہ کیوں ہے؟
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#C8DDD0]">
              We replaced inflammatory red chilli powder, oxidized industrial seed oils, and sugary
              ketchups with biologically active green chillies, gut-healing herbs, pure desi ghee,
              and mineral-rich cooking.
            </p>
          </div>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('health')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-end"
            >
              <span className="inline-flex items-center gap-1.5">
                <span>Explore Full Health Science ·</span>
                <span lang="ur" className="font-urdu-inline text-sm">
                  صحت کے مکمل فوائد
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEALTH_BENEFITS.map((benefit, idx) => {
            const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
            const ur = HEALTH_BENEFIT_URDU[benefit.id];
            return (
              <article
                key={benefit.id}
                className="rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#0A2215]/92 border border-[#84CC16]/22 p-6 flex flex-col justify-between space-y-4 hover:border-[#A3E635]/60 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-[#A3E635]">
                      <Icon className="w-4 h-4 text-[#84CC16]" />
                      {benefit.goal}
                    </span>
                    <span className="font-mono text-lg font-semibold tabular-nums text-[#EAB308]">
                      {benefit.metric}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold leading-snug text-[#F4F7F0]">
                    {benefit.title}
                  </h3>

                  {ur && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB308]">
                      {ur.title}
                    </p>
                  )}

                  <p className="text-sm leading-relaxed text-[#C2D6C9]">{benefit.summary}</p>
                  {ur && (
                    <p lang="ur" className="font-urdu-body text-xs sm:text-sm text-[#B7CEBF]">
                      {ur.summary}
                    </p>
                  )}
                </div>

                {!compact && (
                  <p className="pt-3 border-t border-white/10 text-xs leading-relaxed text-[#9BB7A6]">
                    {benefit.unit} · {benefit.scienceNote}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
