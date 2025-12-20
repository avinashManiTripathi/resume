import { TextArea } from "@repo/ui/text-area"
import { Input } from "@repo/ui/input"

export type FieldType =
    | "text"
    | "email"
    | "textarea"
    | "select"
    | "month";

export interface BaseField {
    label: string;
    type: FieldType;
    options?: string[];
    className?: string;
}

export interface ObjectSchema {
    label: string;
    type: "object";
    fields: Record<string, BaseField>;
}

export interface ArraySchema {
    label: string;
    type: "array";
    item: Record<string, BaseField>;
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

    return (
        <Input type={field.type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)} name={""} />

    );
};

export default FieldRenderer;
