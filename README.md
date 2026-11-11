# useFetch

A custom React hook for fetching JSON, with a small product grid that uses it. Built for a Tutedude assignment.

Live demo: https://tutedudereacthook.netlify.app/

## The hook

`src/hooks/useFetch.js` takes a URL and gives back three things:

```jsx
const { data, loading, error } = useFetch("https://api.escuelajs.co/api/v1/products");

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
return <ProductGrid products={data} />;
```

It fetches when the component mounts and again whenever the URL changes. A response that is not OK is treated as an error, and an empty URL is skipped.

It does not cancel a request that is still in flight when the URL changes, and it does not cache anything. For a real app I would reach for TanStack Query or SWR.

## The demo

Products come from the Platzi Fake Store API and are shown in a grid. Click a product image to open it in a modal.

## Running it

```bash
npm install
npm run dev
```

React, Vite, plain CSS.
