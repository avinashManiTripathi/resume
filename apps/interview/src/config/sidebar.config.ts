// Sidebar configuration for interview session
// This can be loaded from an API or modified per session

export interface SidebarTab {
    id: string;
    label: string;
    disabled: boolean;
    icon?: string;
}

export interface SidebarConfig {
    tabs: SidebarTab[];
}

export const defaultSidebarConfig: SidebarConfig = {
    tabs: [
        {
            id: 'questions',
            label: 'Question List',
            disabled: false
        },
        {
            id: 'timeline',
            label: 'Timeline',
            disabled: true // Disabled until feature is implemented
        },
        {
            id: 'highlights',
            label: 'Highlights',
            disabled: true // Disabled until feature is implemented
        }
    ]
};
