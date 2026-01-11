import { SectionBadge } from "@repo/ui/section-badge";
import { Title } from "@repo/ui/title";
import { Description } from "@repo/ui/description";


/**
 * @author Avinash Mani Tripathi
 * Props for the IntroSection component.
 * @interface IntroSectionProps
 * @property {React.ReactNode} [badgeIcon] - The icon to display in the section badge.
 * @property {string} [label] - The label to display in the section badge.
 * @property {string} [title] - The title of the section.
 * @property {string} [description] - The description of the section.
 * @property {string} [highlightText] - The text to highlight in the title.
 * @property {string} [sectionClassName] - The class name to apply to the section.
 */
interface IntroSectionProps {
    /** The icon to display in the section badge. */
    badgeIcon?: React.ReactNode;
    /** The label to display in the section badge. */
    label?: string;
    /** The title of the section. */
    title?: string;
    /** The description of the section. */
    description?: string;
    /** The text to highlight in the title. */
    highlightText?: string;
    /** The class name to apply to the section. */
    sectionClassName?: string;
}

export function IntroSection({ badgeIcon, label, title, description, highlightText, sectionClassName }: IntroSectionProps) {
    const sectionClass = "pt-20 pb-20 px-6 " + sectionClassName;
    return <section className={sectionClass}>
        <div className="max-w-6xl mx-auto text-center">
            {badgeIcon || label ? <SectionBadge icon={badgeIcon} label={label || ''} /> : null}
            {title && < Title normalText={title} highlightText={highlightText} />}
            {description && <Description description={description} />}
        </div>
    </ section>
}

