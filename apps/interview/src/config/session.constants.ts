// Session Constants - All dynamic data for interview session page
// Modify these constants to change UI behavior without editing component code

export interface SidebarTab {
    id: string;
    label: string;
    disabled: boolean;
    icon?: string;
}

export interface SidebarConfig {
    tabs: SidebarTab[];
}

export interface VideoControlButton {
    id: string;
    label: string;
    icon: string;
    type: 'mic' | 'camera' | 'screen' | 'chat' | 'more' | 'end';
    color?: string;
}

export interface AISettings {
    avatarImagePath: string;
    name: string;
    speechRate: number;
    speechPitch: number;
    speechVolume: number;
    voiceResumeDelay: number; // ms to wait before resuming voice input after speech ends
}

export interface SessionUIConfig {
    header: {
        showBackButton: boolean;
        showRecordingButton: boolean;
    };
    video: {
        showProfileBadge: boolean;
        showPipControls: boolean;
        pipPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
        pipWidth: string;
        pipHeight: string;
    };
    controls: VideoControlButton[];
    sidebar: SidebarConfig;
    ai: AISettings;
}

// Default Sidebar Configuration
export const DEFAULT_SIDEBAR_CONFIG: SidebarConfig = {
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
            label: 'Highlight Clips',
            disabled: true // Disabled until feature is implemented
        }
    ]
};

// AI Interviewer Settings
export const AI_SETTINGS: AISettings = {
    avatarImagePath: '/ai-interviewer.png',
    name: 'AI Interviewer',
    speechRate: 1.0,
    speechPitch: 1.0,
    speechVolume: 1.0,
    voiceResumeDelay: 500 // 500ms delay before auto-resuming voice input
};

// Video Control Buttons Configuration
export const VIDEO_CONTROLS: VideoControlButton[] = [
    { id: 'mic', label: 'Microphone', icon: 'Mic', type: 'mic' },
    { id: 'camera', label: 'Camera', icon: 'Video', type: 'camera' },
    { id: 'screen', label: 'Share screen', icon: 'Monitor', type: 'screen' },
    { id: 'chat', label: 'Chat', icon: 'MessageSquare', type: 'chat' },
    { id: 'more', label: 'More options', icon: 'MoreVertical', type: 'more' },
    { id: 'end', label: 'End interview', icon: 'PhoneOff', type: 'end', color: 'red' }
];

// Complete Session UI Configuration
export const SESSION_CONFIG: SessionUIConfig = {
    header: {
        showBackButton: true,
        showRecordingButton: true
    },
    video: {
        showProfileBadge: true,
        showPipControls: true,
        pipPosition: 'top-right',
        pipWidth: '288px', // w-72 = 288px
        pipHeight: '208px' // h-52 = 208px
    },
    controls: VIDEO_CONTROLS,
    sidebar: DEFAULT_SIDEBAR_CONFIG,
    ai: AI_SETTINGS
};

// Export individual configs for direct access
export const sidebarConfig = DEFAULT_SIDEBAR_CONFIG;
export const aiSettings = AI_SETTINGS;
export const videoControls = VIDEO_CONTROLS;
export const sessionConfig = SESSION_CONFIG;

// Helper to get API base URL
export const getApiBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
};
