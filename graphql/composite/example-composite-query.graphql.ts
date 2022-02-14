/**
 * This query might be page-specific, aggregations, one-offs, etc
 */
export const EXAMPLE_COMPOSITE_QUERY = `
  query {
    foo {
      id
    }
    bar {
      id
    }
    lorem {
      ipsum
    }
  }
`;
