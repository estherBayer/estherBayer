// Helper function to run GraphQL queries
async function fetchGraphQL(query: string, variables = {}, preview = false): Promise<any> {
  try {
    const response = await fetch(
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
        body: JSON.stringify({ query, variables }),
        cache: 'no-store', // Disable caching
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      throw new Error(jsonResponse.errors.map((error: any) => error.message).join(', '));
    }

    return jsonResponse.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('GraphQL fetch error:', error.message);
    } else {
      console.error('Unknown GraphQL fetch error:', error);
    }
    return null; // Gracefully handle errors
  }
}

// Fetch all portfolio pieces
export async function getPortfolioPieces(): Promise<any[]> {
  const query = `
    query {
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
    }
  `;

  const result = await fetchGraphQL(query);
  return result?.portfolioPieceCollection?.items || [];
}

// Fetch a specific portfolio piece by slug
export async function getPortfolioPieceBySlug(slug: string): Promise<any> {
  const query = `
    query($slug: String!) {
      portfolioPieceCollection(where: { slug: $slug }, limit: 1) {
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
    }
  `;

  const variables = { slug };
  const result = await fetchGraphQL(query, variables);
  return result?.portfolioPieceCollection?.items?.[0] || null;
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

// Function to fetch all blog posts
export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  try {
    const query = `
      query {
        postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${isDraftMode ? "true" : "false"}) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }
    `;
    const result = await fetchGraphQL(query);
    return result?.postCollection?.items || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Graceful fallback
  }
}

// Function to fetch a single post and related posts
export async function getPostAndMorePosts(slug: string, preview: boolean): Promise<any> {
  const query = `
    query($slug: String!, $limit: Int) {
      postCollection(where: { slug: $slug }, preview: ${preview ? "true" : "false"}, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
      morePosts: postCollection(where: { slug_not_in: [$slug] }, order: date_DESC, limit: $limit) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const variables = { slug, limit: 2 };
  const result = await fetchGraphQL(query, variables, preview);

  return {
    post: result?.postCollection?.items?.[0] || null,
    morePosts: result?.morePosts?.items || [],
  };
}

// Fetch all work samples (adjusted for the "samples" content type)
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

export async function getWorkSamplesIndex(): Promise<any[]> {
  const query = `
    query {
      samplesCollection {
        items {
          ${WORK_SAMPLES_INDEX_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const result = await fetchGraphQL(query);
  return result?.samplesCollection?.items || [];
}