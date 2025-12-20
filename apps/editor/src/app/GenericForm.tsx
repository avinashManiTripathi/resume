import { FormSchema, ResumeData } from "./FieldRenderer";
import FieldRenderer from "./FieldRenderer";
import { CirclePlus, GripVertical, Trash2Icon } from "lucide-react"

interface Props {
    schema: FormSchema;
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

const GenericForm = ({ schema, data, onChange }: Props) => {
    const updateSection = (key: string, value: any) => {
        onChange({ ...data, [key]: value });
    };

    const addItem = (key: string) => {
        updateSection(key, [...(data[key] || []), {}]);
    };

    const updateArrayItem = (
        key: string,
        index: number,
        field: string,
        value: string
    ) => {
        const updated = [...data[key]];
        updated[index] = { ...updated[index], [field]: value };
        updateSection(key, updated);
    };

    const removeItem = (key: string, index: number) => {
        updateSection(
            key,
            data[key].filter((_: any, i: number) => i !== index)
        );
    };

    return (
        <div className="space-y-8">
            {Object.entries(schema).map(([key, config]) => (
                <div key={key} className="p-1 border-b border-[#E0E0E0] rounded  flex flex-wrap gap-2 w-full">

                    <div className="text-xl font-semibold mb-4 w-full flex items-center gap-2 ">
                        <GripVertical color="#A4A4A4" size={18} />  <span className="text-base">{config.label}</span>
                    </div>

                    {config.type === "object" &&
                        Object.entries(config.fields).map(
                            ([fieldKey, field]) => (
                                <div key={fieldKey} className={"mb-4 " + field.className}>
                                    <label className="block text-sm mb-1">
                                        {field.label}
                                    </label>
                                    <FieldRenderer
                                        field={field}
                                        value={data[key]?.[fieldKey] || ""}
                                        onChange={(val) =>
                                            updateSection(key, {
                                                ...data[key],
                                                [fieldKey]: val
                                            })
                                        }
                                    />
                                </div>
                            )
                        )}

                    {config.type === "array" && (
                        <div
                            className="mb-4 rounded-lg p-[10px] border border-[#E0E0E0] w-full">
                            {(data[key] || []).map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="mb-4 flex flex-wrap gap-2 w-full"
                                >
                                    <div className=" justify-between mb-4 w-full flex items-center">
                                        <div className="flex items-center gap-2 "><GripVertical color="#A4A4A4" size={18} />  <span className="text-base font-semibold ">{index + 1}. {config.label}</span></div>
                                        <div className="flex items-center gap-1 color-[#E5503A] font-sm text-[12px] cursor-pointer" onClick={() => removeItem(key, index)}> <Trash2Icon size={12} /> <span>Delete</span></div>
                                    </div>
                                    {Object.entries(config.item).map(
                                        ([fieldKey, field]) => (
                                            <div key={fieldKey} className={"mb-3  " + field.className}>



                                                <label className="block text-sm mb-1">
                                                    {field.label}
                                                </label>

                                                <FieldRenderer
                                                    field={field}
                                                    value={item[fieldKey] || ""}
                                                    onChange={(val) =>
                                                        updateArrayItem(
                                                            key,
                                                            index,
                                                            fieldKey,
                                                            val
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            ))}


                            <div className="flex mb-2 items-center gap-1 color-[#E5503A] font-sm text-[12px] cursor-pointer" onClick={() => addItem(key)}> <CirclePlus size={12} /> <span>Add {config.label}</span></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default GenericForm;
