/**
 * @repo/hooks - Collection of reusable React hooks
 * 
 * This package provides common React hooks for use across the monorepo.
 */

export { useDebounce } from './useDebounce';
export { useLocalStorage } from './useLocalStorage';
export { useMediaQuery } from './useMediaQuery';
export { useClickOutside } from './useClickOutside';
export { useWindowSize } from './useWindowSize';

// Network hooks
export {
    useFetch,
    useGet,
    usePost,
    usePut,
    usePatch,
    useDelete,
    type FetchState,
    type FetchOptions,
    type MutationState,
} from './network';

// Template hooks
export {
    useTemplates,
    useTemplate,
    useTemplatesByCategory,
    clearAllTemplateCache,
    type Template,
} from './useTemplate';
