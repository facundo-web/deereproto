Primary action element for all John Deere digital products. Use for every user-initiated action.

```jsx
<Button variant="primary">View Fields</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="danger">Delete operation</Button>
<Button variant="warning">Flag issue</Button>
<Button loading>Saving...</Button>
<Button variant="primary" icon={<svg .../>} iconPosition="left">Add Field</Button>
```

**Variants**
- `primary` — JD green fill; main calls-to-action
- `secondary` — green outline; secondary actions
- `ghost` — text-only; low-emphasis actions
- `danger` — red fill; destructive actions (delete, remove)
- `warning` — JD yellow fill; cautionary actions

**Sizes:** `sm` 32px · `md` 40px (default) · `lg` 48px

**Button copy:** Title Case. Action verbs. "View Fields" not "Click here to view fields."
