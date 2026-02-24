import { TextArea } from "@repo/ui/text-area"
import { Input } from "@repo/ui/input"
import { RichTextEditor } from "@repo/ui/rich-text-editor"
import { MonthPicker } from "@repo/ui/month-picker"
import { ENV } from "@/app/env";
export type FieldType =
    | "text"
    | "email"
    | "textarea"
    | "richtext"
    | "select"
    | "month";

export interface BaseField {
    label: string;
    type: FieldType;
    options?: string[];
    className?: string;
    description?: string;
}

export interface ObjectSchema {
    label: string;
    type: "object";
    isCollapsible?: boolean;
    fields: Record<string, BaseField>;
}

export interface ArraySchema {
    label: string;
    type: "array";
    isCollapsible?: boolean;
    item: Record<string, BaseField>;
    component?: "smart-tags";
    variant?: "skills" | "interests" | "languages";
}

export type SectionSchema = ObjectSchema | ArraySchema;

export type FormSchema = Record<string, SectionSchema>;

export type ResumeData = Record<string, any>;


interface Props {
    field: BaseField;
    value: string;
    onChange: (value: string) => void;
}


const FieldRenderer = ({ field, value, onChange }: Props) => {
    if (field.type === "richtext") {
        return (
            <RichTextEditor
                apiUrl={ENV.API_URL}
                value={value || ""}
                onChange={onChange}
                placeholder="Write your bio..."
            />
        );
    }

    if (field.type === "textarea") {
        return (

            <TextArea value={value || ""}
                onChange={(e) => onChange(e.target.value)} name={""} />

        );
    }

    if (field.type === "select" && field.options) {
        return (
            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <option value="">Select</option>
                {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        );
    }



    if (field.type === "month") {
        return (
            <MonthPicker
                value={value || ""}
                onChange={(newValue) => onChange(newValue)}
            />
        );
    }

    return (
        <Input type={field.type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)} name={""} />

    );
};

export default FieldRenderer;
