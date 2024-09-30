export async function getPortfolioPieces(): Promise<any[]> {
  // Fetch all portfolio pieces with extended fields
  const query = `query {
    portfolioPieceCollection(order: sys_publishedAt_DESC) {
      items {
        title
        slug
        coverImage {
          url
          title
        }
        description {
          json
        }
        image1 {
          url
          title
        }
        description2 {
          json
        }
        image2 {
          url
          title
        }
        description3 {
          json
        }
        image3 {
          url
          title
        }
        description4 {
          json
        }
        image4 {
          url
          title
        }
        description5 {
          json
        }
        image5 {
          url
          title
        }
        description6 {
          json
        }
        image6 {
          url
          title
        }
        description7 {
          json
        }
        image7 {
          url
          title
        }
        description8 {
          json
        }
        image8 {
          url
          title
        }
        description9 {
          json
        }
        image9 {
          url
          title
        }
        description10 {
          json
        }
        image10 {
          url
          title
        }
        description11 {
          json
        }
        image11 {
          url
          title
        }
        description12 {
          json
        }
        image12 {
          url
          title
        }
        description13 {
          json
        }
        image13 {
          url
          title
        }
        description14 {
          json
        }
        image14 {
          url
          title
        }
        description15 {
          json
        }
        image15 {
          url
          title
        }
        description16 {
          json
        }
        image16 {
          url
          title
        }
        description17 {
          json
        }
        imagesManyCollection {
          items {
            url
            title
          }
        }
      }
    }
  }`;

  const entries = await fetchGraphQL(query);
  return entries?.data?.portfolioPieceCollection?.items || [];
}

export async function getPortfolioPieceBySlug(slug: string): Promise<any> {
  const query = `query {
    portfolioPieceCollection(where: { slug: "${slug}" }, limit: 1) {
      items {
        title
        slug
        coverImage {
          url
          title
        }
        description {
          json
        }
        image1 {
          url
          title
        }
        description2 {
          json
        }
        image2 {
          url
          title
        }
        description3 {
          json
        }
        image3 {
          url
          title
        }
        description4 {
          json
        }
        image4 {
          url
          title
        }
        description5 {
          json
        }
        image5 {
          url
          title
        }
        description6 {
          json
        }
        image6 {
          url
          title
        }
        description7 {
          json
        }
        image7 {
          url
          title
        }
        description8 {
          json
        }
        image8 {
          url
          title
        }
        description9 {
          json
        }
        image9 {
          url
          title
        }
        description10 {
          json
        }
        image10 {
          url
          title
        }
        description11 {
          json
        }
        image11 {
          url
          title
        }
        description12 {
          json
        }
        image12 {
          url
          title
        }
        description13 {
          json
        }
        image13 {
          url
          title
        }
        description14 {
          json
        }
        image14 {
          url
          title
        }
        description15 {
          json
        }
        image15 {
          url
          title
        }
        description16 {
          json
        }
        image16 {
          url
          title
        }
        description17 {
          json
        }
        imagesManyCollection {
          items {
            url
            title
          }
        }
      }
    }
  }`;

  const entries = await fetchGraphQL(query);
  return entries?.data?.portfolioPieceCollection?.items?.[0] || null;
}



// Fields for Blog Posts
const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

// Fields for Work Samples (adjusted to match the "sample" content type in Contentful)
const WORK_SAMPLES_INDEX_GRAPHQL_FIELDS = `
  title
  description {
    json
  }
  image {
    url
    title
  }
  link
  order
  project
  liveWebsiteLink
`;

// Helper function to run GraphQL queries
async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store', // Disable caching
      next: { revalidate: 0 } // Optional: Disable revalidation (based on your need)
    }
  ).then((response) => response.json());
}


// Extract function for a single post
function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

// Extract function for multiple posts
function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

// Fetch a preview post by slug
export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

// Fetch all blog posts
export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractPostEntries(entries);
}

// Fetch post and more posts
export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

// Fetch all work samples (adjusted for the "samples" content type)
export async function getWorkSamplesIndex(): Promise<any[]> {
  const query = `query {
    samplesCollection {
      items {
        ${WORK_SAMPLES_INDEX_GRAPHQL_FIELDS}
      }
    }
  }`;

  const entries = await fetchGraphQL(query);
  return entries?.data?.samplesCollection?.items || []; // Ensure it returns an empty array if there are no results
}
