import { SectionBadge } from "@repo/ui/section-badge";
import { Title } from "@repo/ui/title";
import { Description } from "@repo/ui/description";


export function IntroSection({ badgeIcon, label, title, description, highlightText }: { badgeIcon: React.ReactNode, label: string, title: string, description: string, highlightText: string }) {
    return <section className="pt-20 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
            <SectionBadge icon={badgeIcon} label={label} />
            <Title normalText={title} highlightText={highlightText} />
            <Description description={description} />
        </div>
    </section>
}

