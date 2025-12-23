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
    sectionOrder: string[];
    setSectionOrder: (order: string[]) => void;
}

const GenericForm = ({ schema, data, onChange, onSchemaChange, sectionOrder, setSectionOrder }: Props) => {
    // Track section order
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Update section order if schema changes
        const schemaKeys = Object.keys(schema);

        // Only update if the keys are actually different (not just length)
        const hasChanged = schemaKeys.length !== sectionOrder.length ||
            schemaKeys.some((key, index) => !sectionOrder.includes(key));

        if (hasChanged) {
            console.log('Schema changed, updating section order:', schemaKeys);
            setSectionOrder(schemaKeys);
        }
    }, [schema, sectionOrder, setSectionOrder]);

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
        const newItem = {};
        const updated = [...(data[key] || []), newItem];
        const newData = { ...data, [key]: updated };

        // Also update customSections if this is a custom section
        if (newData.customSections) {
            const customSectionIndex = newData.customSections.findIndex((cs: any) => cs.id === key);
            if (customSectionIndex !== -1) {
                const customSection = { ...newData.customSections[customSectionIndex] };

                // Add new item to customSection.items
                customSection.items = updated.map((item, idx) => ({
                    id: `${key}-${idx}`,
                    fields: Object.entries(item).reduce((acc, [fieldKey, fieldValue]) => {
                        const fieldDef = customSection.fieldDefinitions[fieldKey];
                        acc[fieldKey] = {
                            label: fieldDef?.label || fieldKey,
                            value: fieldValue as string || '',
                            type: fieldDef?.type || 'text'
                        };
                        return acc;
                    }, {} as Record<string, any>)
                }));

                newData.customSections[customSectionIndex] = customSection;
            }
        }

        onChange(newData);
    };

    const updateArrayItem = (
        key: string,
        index: number,
        field: string,
        value: string
    ) => {
        const updated = [...data[key]];
        updated[index] = { ...updated[index], [field]: value };

        const newData = { ...data, [key]: updated };

        // Also update customSections if this is a custom section
        if (newData.customSections) {
            const customSectionIndex = newData.customSections.findIndex((cs: any) => cs.id === key);
            if (customSectionIndex !== -1) {
                const customSection = { ...newData.customSections[customSectionIndex] };

                // Sync items with the updated data
                customSection.items = updated.map((item, idx) => ({
                    id: `${key}-${idx}`,
                    fields: Object.entries(item).reduce((acc, [fieldKey, fieldValue]) => {
                        const fieldDef = customSection.fieldDefinitions[fieldKey];
                        acc[fieldKey] = {
                            label: fieldDef?.label || fieldKey,
                            value: fieldValue as string,
                            type: fieldDef?.type || 'text'
                        };
                        return acc;
                    }, {} as Record<string, any>)
                }));

                newData.customSections[customSectionIndex] = customSection;
            }
        }

        onChange(newData);
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
            //@ts-ignore
            setSectionOrder((items: any) => {
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
                isCollapsible: true,
                icon: template.icon,
                item: template.fields
            }
        };

        // Initialize custom section in data
        const newData = { ...data };
        if (!newData.customSections) {
            newData.customSections = [];
        }

        // Add custom section definition
        newData.customSections.push({
            id: sectionId,
            label: sectionLabel,
            icon: template.icon,
            items: [],
            fieldDefinitions: Object.entries(template.fields).reduce((acc, [key, field]) => {
                acc[key] = {
                    label: field.label,
                    type: field.type,
                    options: field.options
                };
                return acc;
            }, {} as Record<string, any>)
        });

        // Also initialize the section data array for form rendering
        newData[sectionId] = [];

        onChange(newData);

        // Update section order
        setSectionOrder([...sectionOrder, sectionId]);

        // Update schema
        onSchemaChange(newSchema);

        setIsModalOpen(false);
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
                                    isCollapsible={config.isCollapsible}
                                >
                                    {config.type === "object" && (
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(config.fields).map(([fieldKey, field]) => (
                                                <div key={fieldKey} className={"mb-4 " + field.className}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {field.label}
                                                    </label>
                                                    {field.description && (
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            {field.description}
                                                        </p>
                                                    )}
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
                                                        <CirclePlus className="w-4 h-4 text-[#223DC5]" />
                                                        <span className="text-[#223DC5]">Add {config.label}</span>
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
