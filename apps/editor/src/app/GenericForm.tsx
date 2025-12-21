"use client";

import { FormSchema, ResumeData } from "./FieldRenderer";
import FieldRenderer from "./FieldRenderer";
import { CirclePlus, Plus } from "lucide-react";
import { SortableSection } from "./SortableSection";
import { SortableItem } from "./SortableItem";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { CustomSectionModal, SECTION_TEMPLATES } from "./CustomSectionModal";

interface Props {
    schema: FormSchema;
    data: ResumeData;
    onChange: (data: ResumeData) => void;
    onSchemaChange?: (schema: FormSchema) => void;
}

const GenericForm = ({ schema, data, onChange, onSchemaChange }: Props) => {
    // Track section order
    const [sectionOrder, setSectionOrder] = useState<string[]>(Object.keys(schema));
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Update section order if schema changes
        const schemaKeys = Object.keys(schema);
        if (schemaKeys.length !== sectionOrder.length) {
            setSectionOrder(schemaKeys);
        }
    }, [schema]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

    const handleSectionDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSectionOrder((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleItemDragEnd = (key: string) => (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const items = data[key] || [];
            const oldIndex = items.findIndex((_: any, i: number) => `${key}-${i}` === active.id);
            const newIndex = items.findIndex((_: any, i: number) => `${key}-${i}` === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                updateSection(key, arrayMove(items, oldIndex, newIndex));
            }
        }
    };

    const handleAddCustomSection = (sectionId: string, sectionLabel: string) => {
        const template = SECTION_TEMPLATES.find(t => t.id === sectionId);
        if (!template || !onSchemaChange) return;

        // Add to schema
        const newSchema = {
            ...schema,
            [sectionId]: {
                label: sectionLabel,
                type: "array" as const,
                item: template.fields
            }
        };

        // Update section order
        setSectionOrder([...sectionOrder, sectionId]);

        // Initialize empty data for this section
        onChange({ ...data, [sectionId]: [] });

        // Update schema
        onSchemaChange(newSchema);
    };

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleSectionDragEnd}
            >
                <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                    <div className="space-y-0">
                        {sectionOrder.map((key) => {
                            const config = schema[key];
                            if (!config) return null;

                            return (
                                <SortableSection
                                    key={key}
                                    id={key}
                                    title={config.label}
                                    defaultOpen={key === "personalInfo"}
                                >
                                    {config.type === "object" && (
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(config.fields).map(([fieldKey, field]) => (
                                                <div key={fieldKey} className={"mb-4 " + field.className}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {field.label}
                                                    </label>
                                                    <FieldRenderer
                                                        field={field}
                                                        value={data[key]?.[fieldKey] || ""}
                                                        onChange={(val) =>
                                                            updateSection(key, {
                                                                ...data[key],
                                                                [fieldKey]: val,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {config.type === "array" && (
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleItemDragEnd(key)}
                                        >
                                            <SortableContext
                                                items={(data[key] || []).map((_: any, i: number) => `${key}-${i}`)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                <div className="space-y-4">
                                                    {(data[key] || []).map((item: any, index: number) => (
                                                        <SortableItem
                                                            key={`${key}-${index}`}
                                                            id={`${key}-${index}`}
                                                            index={index}
                                                            label={config.label}
                                                            onRemove={() => removeItem(key, index)}
                                                        >
                                                            {Object.entries(config.item).map(([fieldKey, field]) => (
                                                                <div key={fieldKey} className={"mb-3 " + field.className}>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        {field.label}
                                                                    </label>
                                                                    <FieldRenderer
                                                                        field={field}
                                                                        value={item[fieldKey] || ""}
                                                                        onChange={(val) =>
                                                                            updateArrayItem(key, index, fieldKey, val)
                                                                        }
                                                                    />
                                                                </div>
                                                            ))}
                                                        </SortableItem>
                                                    ))}

                                                    <button
                                                        onClick={() => addItem(key)}
                                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                    >
                                                        <CirclePlus className="w-4 h-4" />
                                                        <span>Add {config.label}</span>
                                                    </button>
                                                </div>
                                            </SortableContext>
                                        </DndContext>
                                    )}
                                </SortableSection>
                            );
                        })}

                        {/* Add Custom Section Button */}
                        <div className="p-6 border-t border-gray-200">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-medium">Add Custom Section</span>
                            </button>
                        </div>
                    </div>
                </SortableContext>
            </DndContext>

            <CustomSectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddCustomSection}
            />
        </>
    );
};

export default GenericForm;
