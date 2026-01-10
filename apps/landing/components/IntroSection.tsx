import { SectionBadge } from "@repo/ui/section-badge";
import { Title } from "@repo/ui/title";
import { Description } from "@repo/ui/description";

interface IntroSectionProps {
    badgeIcon?: React.ReactNode;
    label?: string;
    title?: string;
    description?: string;
    highlightText?: string;
    sectionClassName?: string;
}

export function IntroSection({ badgeIcon, label, title, description, highlightText, sectionClassName }: IntroSectionProps) {

    const sectionClass = "pt-20 pb-20 px-6 " + sectionClassName;

    return <section className={sectionClass}>
        <div className="max-w-6xl mx-auto text-center">
            {badgeIcon || label && <SectionBadge icon={badgeIcon} label={label} />}
            {title && < Title normalText={title} highlightText={highlightText} />}
            {description && <Description description={description} />}
        </div>
    </ section>
}

