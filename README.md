## Getting Started

First, run the development server:

```bash
npm run dev

```

## There are 5 basic forms of frontend state

### Below lists each kind and the strategy for how to handle it

1. Local State (component-level, i.e., form state)
   - keep within component
   - example impl: `useState`
2. Module State (state composition between all components on a page)
   - wrap entire page in state provider
   - example impl: `ModuleStateProvider`
3. UI Alert State (alerts, modals, popups, toasters, tooltips)
   - Dedicated state providers that tracks UI and status, i.e. JSX and 'open/close' boolean
   - example impl: `useModal`, `useToaster`, `usePopup`, etc.,
4. Entity State (data from remote source)
   - fetch and cache client
   - example impl: `urql`
5. Global State (not much after considering 1-4)
   - user, menu, websockets, settings, notifications, store, etc.,
   - example impl: `AppStateProvider`, `redux library`, etc.,

### How this project implements the above

- Wrap each page in own provider, application in provider
- Use UI hooks for all UI interactions
- Use `urql` for entity state

That's it.

### TODO

- add to package.json scripts ` "predev": "npm run generate",`
- Menu, Tabs, Theme
