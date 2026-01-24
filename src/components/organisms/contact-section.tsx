import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { LinkPreview } from "@/components/ui/link-preview";

export default function ContactSection() {
  return (
    <section id="contact" className="h-fit! pb-20">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
        <DottedGlowBackground
          className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
          opacity={1}
          gap={10}
          radius={1.6}
          colorLightVar="--color-neutral-500"
          glowColorLightVar="--color-neutral-600"
          colorDarkVar="--color-neutral-500"
          glowColorDarkVar="--color-sky-800"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />

        <div className="relative z-10 flex w-full flex-col items-center justify-between space-y-6 px-8 py-16 text-left md:flex-row md:space-y-0">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-left text-muted-foreground">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:irul.career@gmail.com"
              className="inline-flex items-center justify-center rounded-4xl bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md"
            >
              Get In Touch
            </a>
            <LinkPreview
              url="https://github.com/KhoirulHusein"
              className="inline-flex items-center justify-center rounded-4xl border border-border bg-card px-8 py-3 text-sm font-medium text-card-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:shadow-md"
            >
              View GitHub
            </LinkPreview>
          </div>
        </div>
      </div>
    </section>
  );
}
