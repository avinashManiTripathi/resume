# @repo/hooks

A collection of reusable React hooks for the monorepo.

## Available Hooks

### `useDebounce`
Delays updating a value until after a specified delay.

```typescript
import { useDebounce } from '@repo/hooks/useDebounce';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

### `useLocalStorage`
Sync state with localStorage.

```typescript
import { useLocalStorage } from '@repo/hooks/useLocalStorage';

const [name, setName] = useLocalStorage('name', 'John Doe');
```

### `useMediaQuery`
Track media query matches for responsive design.

```typescript
import { useMediaQuery } from '@repo/hooks/useMediaQuery';

const isMobile = useMediaQuery('(max-width: 768px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
```

### `useClickOutside`
Detect clicks outside of a specific element.

```typescript
import { useClickOutside } from '@repo/hooks/useClickOutside';

const menuRef = useRef<HTMLDivElement>(null);
useClickOutside(menuRef, () => setIsOpen(false));
```

### `useWindowSize`
Track window dimensions.

```typescript
import { useWindowSize } from '@repo/hooks/useWindowSize';

const { width, height } = useWindowSize();
```

### Network Hooks

#### `useFetch` / `useGet`
Fetch data from an API endpoint automatically.

```typescript
import { useFetch, useGet } from '@repo/hooks/network';

// Generic fetch
const { data, loading, error, refetch } = useFetch<User>('/api/user');

// Specific GET request
const { data, loading, error } = useGet<User[]>('/api/users');

// Skip initial fetch
const { data, loading, refetch } = useGet<User>('/api/user', { skip: true });
```

#### `usePost`
Make POST requests with loading and error states.

```typescript
import { usePost } from '@repo/hooks/network';

const { execute, data, loading, error, reset } = usePost<User>('/api/users');

const handleSubmit = async () => {
  const result = await execute({ name: 'John Doe', email: 'john@example.com' });
  if (result) {
    console.log('User created:', result);
  }
};
```

#### `usePut`
Update resources with PUT requests.

```typescript
import { usePut } from '@repo/hooks/network';

const { execute, loading } = usePut<User>('/api/user/123');
await execute({ name: 'Jane Doe' });
```

#### `usePatch`
Partially update resources with PATCH requests.

```typescript
import { usePatch } from '@repo/hooks/network';

const { execute, loading } = usePatch<User>('/api/user/123');
await execute({ email: 'newemail@example.com' });
```

#### `useDelete`
Delete resources.

```typescript
import { useDelete } from '@repo/hooks/network';

const { execute, loading, error } = useDelete('/api/user/123');

const handleDelete = async () => {
  const result = await execute();
  if (result) {
    console.log('User deleted');
  }
};
```

### Template Hooks

#### `useTemplates`
Fetch all resume templates from the API with automatic caching.

```typescript
import { useTemplates } from '@repo/hooks/useTemplate';

const { templates, loading, error, refetch, clearCache, isCached } = useTemplates();

// With custom cache TTL (10 minutes)
const { templates } = useTemplates({ cacheTTL: 10 * 60 * 1000 });

// Skip cache for fresh data
const { templates } = useTemplates({ skipCache: true });

if (loading) return <Spinner />;
if (error) return <Error message={error.message} />;

return (
  <div>
    {isCached && <Badge>Cached</Badge>}
    <button onClick={refetch}>Refresh Templates</button>
    <div className="grid grid-cols-3 gap-4">
      {templates?.map(template => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  </div>
);
```

#### `useTemplate`
Fetch a single template by ID.

```typescript
import { useTemplate } from '@repo/hooks/useTemplate';

const { template, loading, error } = useTemplate('template-123');
```

#### `useTemplatesByCategory`
Fetch templates filtered by category.

```typescript
import { useTemplatesByCategory } from '@repo/hooks/useTemplate';

const { templates, loading } = useTemplatesByCategory('professional');
```

## Features

All hooks include:
- ✅ **TypeScript support** - Full type safety
- ✅ **Loading states** - Track request progress
- ✅ **Error handling** - Catch and display errors
- ✅ **Request cancellation** - Auto-cancel on unmount
- ✅ **SSR safe** - Works with Next.js

## Usage

Install the package in your app:

```json
{
  "dependencies": {
    "@repo/hooks": "*"
  }
}
```

Then import the hooks you need:

```typescript
import { useDebounce } from '@repo/hooks/useDebounce';
import { useLocalStorage } from '@repo/hooks/useLocalStorage';
```
