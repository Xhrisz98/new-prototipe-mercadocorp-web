"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Building2, User, CheckCircle } from "lucide-react";

interface DualPillarsBlockProps {
  sectionTitle: string;
  sectionSubtitle: string;
  paths: {
    category: string;
    title: string;
    body: string;
    points: string[];
  }[];
}

export function DualPillarsBlock({
  sectionTitle,
  sectionSubtitle,
  paths,
}: DualPillarsBlockProps) {
  return (
    <section className="w-full py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {paths.map((path, idx) => {
            const isPersonal = idx === 1;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                      {isPersonal ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Building2 className="w-5 h-5" />
                      )}
                    </div>
                    <Badge variant="brand" size="sm">
                      {path.category}
                    </Badge>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                    style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                  >
                    {path.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
                    {path.body}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-[var(--color-border)]">
                    {path.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                        <span className="text-sm text-[var(--color-text)] font-medium">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
