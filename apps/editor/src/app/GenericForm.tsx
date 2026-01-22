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
    MouseSensor,
    TouchSensor,
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
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { CustomSectionModal, SECTION_TEMPLATES } from "./CustomSectionModal";
import { SkillsInput } from "./SkillsInput";
import { Dialog } from "@repo/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface Props {
    schema: FormSchema;
    data: ResumeData;
    onChange: (data: ResumeData) => void;
    onSchemaChange?: (schema: FormSchema) => void;
    onSectionNameChange?: (sectionKey: string, newLabel: string) => void;
    sectionOrder: string[];
    setSectionOrder: (order: string[]) => void;
}

const GenericForm = ({ schema, data, onChange, onSchemaChange, onSectionNameChange, sectionOrder, setSectionOrder }: Props) => {
    // Track section order
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Update section order if schema changes
        const schemaKeys = Object.keys(schema);

        // Only update if the keys are actually different (not just length)
        const hasChanged = schemaKeys.length !== sectionOrder.length ||
            schemaKeys.some((key, index) => !sectionOrder.includes(key));

        if (hasChanged) {
            setSectionOrder(schemaKeys);
        }
    }, [schema, sectionOrder, setSectionOrder]);

    // Sensors configuration - useSensors already returns stable references
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8, // Prevents accidental drags
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // Delay to distinguish scroll from drag
                tolerance: 5, // Movement tolerance
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const updateSection = useCallback((key: string, value: any) => {
        onChange({ ...data, [key]: value });
    }, [data, onChange]);

    const addItem = useCallback((key: string) => {
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
                            type: fieldDef?.type || 'text',
                            className: fieldDef?.className
                        };
                        return acc;
                    }, {} as Record<string, any>)
                }));

                newData.customSections[customSectionIndex] = customSection;
            }
        }

        onChange(newData);
    }, [data, onChange]);

    const updateArrayItem = useCallback((
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
                            type: fieldDef?.type || 'text',
                            className: fieldDef?.className
                        };
                        return acc;
                    }, {} as Record<string, any>)
                }));

                newData.customSections[customSectionIndex] = customSection;
            }
        }

        onChange(newData);
    }, [data, onChange]);

    const removeItem = useCallback((key: string, index: number) => {
        updateSection(
            key,
            data[key].filter((_: any, i: number) => i !== index)
        );
    }, [data, updateSection]);

    const handleSectionDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            //@ts-ignore
            setSectionOrder((items: any) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }, [setSectionOrder]);

    const handleItemDragEnd = useCallback((key: string) => (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const items = data[key] || [];
            const oldIndex = items.findIndex((_: any, i: number) => `${key}-${i}` === active.id);
            const newIndex = items.findIndex((_: any, i: number) => `${key}-${i}` === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                updateSection(key, arrayMove(items, oldIndex, newIndex));
            }
        }
    }, [data, updateSection]);

    const handleAddCustomSection = useCallback((sectionId: string, sectionLabel: string) => {
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
                    options: field.options,
                    className: field.className
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
        setIsModalOpen(false);
    }, [schema, data, onChange, onSchemaChange, sectionOrder, setSectionOrder]);

    const [deleteSectionDialog, setDeleteSectionDialog] = useState<{
        isOpen: boolean;
        sectionId: string | null;
        sectionTitle: string;
        isChecked: boolean;
    }>({
        isOpen: false,
        sectionId: null,
        sectionTitle: "",
        isChecked: false
    });

    const [dontAskDeleteConfirmation, setDontAskDeleteConfirmation] = useState(false);

    const handleDeleteSection = useCallback((sectionId: string) => {
        // Remove from order
        const newOrder = sectionOrder.filter(id => id !== sectionId);
        setSectionOrder(newOrder);

        // Remove data for BOTH standard and custom sections to "permanently remove" it
        const newData = { ...data };

        // If it's a custom section, remove from array
        if (newData.customSections) {
            const idx = newData.customSections.findIndex((cs: any) => cs.id === sectionId);
            if (idx !== -1) {
                newData.customSections.splice(idx, 1);
            }
        }

        // Delete the data key (works for standard sections 'education' and custom 'section-id')
        delete newData[sectionId];

        // CRITICAL: Update the persistent sectionOrder in the data object
        newData.sectionOrder = newOrder;

        onChange(newData);
    }, [data, onChange, sectionOrder, setSectionOrder]);


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

                            const onDeleteSection = () => {
                                if (dontAskDeleteConfirmation) {
                                    handleDeleteSection(key);
                                } else {
                                    setDeleteSectionDialog({ isOpen: true, sectionId: key, sectionTitle: config.label, isChecked: false });
                                }
                            };

                            return (
                                <SortableSection
                                    key={key}
                                    id={key}
                                    title={config.label}
                                    onTitleChange={onSectionNameChange ? (newLabel) => onSectionNameChange(key, newLabel) : undefined}
                                    defaultOpen={key === "personalInfo"}
                                    isCollapsible={config.isCollapsible}
                                    onDelete={key !== "personalInfo" ? () => {
                                        if (dontAskDeleteConfirmation) {
                                            handleDeleteSection(key);
                                        } else {
                                            setDeleteSectionDialog({ isOpen: true, sectionId: key, sectionTitle: config.label, isChecked: false });
                                        }
                                    } : undefined}
                                >
                                    {config.type === "object" && (
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(config.fields).map(([fieldKey, field]) => (
                                                <div key={fieldKey} className={"mb-4 " + field.className}>
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">
                                                        {field.label}
                                                    </label>
                                                    {field.description && (
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            {field.description}
                                                        </p>
                                                    )}
                                                    < FieldRenderer
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
                                        config.component === "smart-tags" ? (
                                            <div className="mb-4">
                                                <SkillsInput
                                                    value={data[key]}
                                                    onChange={(val) => updateSection(key, val)}
                                                    variant={config.variant || "skills"}
                                                    label={config.label}
                                                />
                                            </div>
                                        ) : (
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
                                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">
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
                                        )
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

            <Dialog
                isOpen={deleteSectionDialog.isOpen}
                onClose={() => setDeleteSectionDialog(prev => ({ ...prev, isOpen: false }))}
                title="Are you sure?"
                description="This action will delete all your information. You won't be able to revert this!"
                type="confirm"
                icon={<AlertTriangle className="w-12 h-12 text-red-500" />}
                primaryActionLabel="Yes, delete it"
                onPrimaryAction={() => {
                    if (deleteSectionDialog.sectionId) {
                        handleDeleteSection(deleteSectionDialog.sectionId);
                    }
                    setDeleteSectionDialog(prev => ({ ...prev, isOpen: false }));
                }}
                secondaryActionLabel="Cancel"
            />
        </>
    );
};

// Wrap with React.memo to prevent re-renders when props haven't changed
export default memo(GenericForm);
