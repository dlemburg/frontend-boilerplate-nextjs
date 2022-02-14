## Getting Started

First, run the development server:

```bash
npm run dev

```

## There are 5 basic forms of frontend state

### Below lists each kind and the strategy for how to handle it

1. Local State (component-level, i.e., form state)
   - keep within component
   - example: `useState`
2. Module State (state composition between all components on a page)
   - wrap entire page in state provider
3. UI Alert State (alerts, modals, popups, toasters)
   - Dedicated state providers that tracks UI and status, i.e. JSX and 'open/close' boolean
   - example: `useModal`, `useToaster`, `usePopup`, etc.,
4. Entity State (data from remote source)
   - fetch and cache client
   - example: `urql`
5. Global State (not much after considering 1-4)
   - example: `AppStateProvider`, `redux library`, etc.,
