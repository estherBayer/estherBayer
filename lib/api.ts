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
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text(); // Capture the error message for debugging
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}. Response: ${errorMessage}`);
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
export async function getPortfolioPieces(preview = false): Promise<any[]> {
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
          image1 {
            url
            title
          }
          description2 {
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
          image2 {
            url
            title
          }
        }
      }
    }`;

  const result = await fetchGraphQL(query, {}, preview);
  return result?.portfolioPieceCollection?.items || [];
}

// Fetch a specific portfolio piece by slug
export async function getPortfolioPieceBySlug(slug: string, preview = false): Promise<any> {
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
          image1 {
            url
            title
          }
          description2 {
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
          image2 {
            url
            title
          }
        }
      }
    }`;

  const variables = { slug };
  const result = await fetchGraphQL(query, variables, preview);
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
export async function getAllPosts(preview = false): Promise<any[]> {
  const query = `
    query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;
  
  const result = await fetchGraphQL(query, {}, preview); // Pass preview to manage draft content
  return result?.postCollection?.items || [];
}

// Function to fetch a single post and related posts
export async function getPostAndMorePosts(slug: string, preview = false): Promise<any> {
  const query = `
    query($slug: String!, $limit: Int) {
      postCollection(where: { slug: $slug }, limit: 1) {
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

export async function getWorkSamplesIndex(preview = false): Promise<any[]> {
  const query = `
    query {
      samplesCollection {
        items {
          ${WORK_SAMPLES_INDEX_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const result = await fetchGraphQL(query, {}, preview);
  return result?.samplesCollection?.items || [];
}
