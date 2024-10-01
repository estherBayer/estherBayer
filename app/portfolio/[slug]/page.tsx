import Link from "next/link"; 
import { draftMode } from "next/headers";
import { getPortfolioPieces, getPortfolioPieceBySlug } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import NavBar from "../../nav-bar"; // Import the navbar component

// Fetch portfolio slugs for dynamic paths
export async function generateStaticParams() {
  const allPortfolioPieces = await getPortfolioPieces();
  return allPortfolioPieces.map((piece) => ({
    slug: piece.slug,
  }));
}

// Helper function to render rich text fields with embedded assets and links
const renderRichText = (richText: any, links: any) => {
  if (!richText) return null;

  // Extract assets from the links property
  const assetMap = new Map();
  links?.assets?.block?.forEach((asset: any) => {
    assetMap.set(asset.sys.id, asset);
  });

  return documentToReactComponents(richText, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node?.data?.target?.sys?.id;
        const asset = assetMap.get(assetId);
        const imageUrl = asset?.url;
        const title = asset?.description;

        if (imageUrl) {
          return (
            <div className="p-3 lg:p-5 mb-8 sm:mx-0 md:mb-16">
              <img
                src={imageUrl.startsWith("http") ? imageUrl : `https:${imageUrl}`}
                alt={title || "Embedded Asset"}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          );
        }
        return null;
      },
      [INLINES.HYPERLINK]: (node: any) => {
        const { uri } = node.data;
        return (
          <a href={uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {node.content[0].value}
          </a>
        );
      },
    },
  });
};

export default async function PortfolioPage({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode() || { isEnabled: false };

  // Fetch the portfolio piece based on the slug
  const portfolioPiece = await getPortfolioPieceBySlug(params.slug);

  // Add a fallback in case the data doesn't load
  if (!portfolioPiece) {
    return <div>Portfolio piece not found</div>;
  }

  return (
    <div>
      {/* Render NavBar here, outside the container */}
      <NavBar />
      
      {/* The rest of the portfolio page content */}
      <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter"></h2>
      
        <article>
          <h1 className="mb-12 text-left text-5xl text-darkThistlePurple font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
            {portfolioPiece?.title || "Untitled Project"}
          </h1>

          {/* Render cover image if available */}
          {portfolioPiece?.coverImage?.url && (
            <div className="mb-8 sm:mx-0 md:mb-16">
              <img
                src={portfolioPiece.coverImage.url.startsWith("http") ? portfolioPiece.coverImage.url : `https:${portfolioPiece.coverImage.url}`}
                alt={portfolioPiece.coverImage.title || "Cover Image"}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Render description if available */}
          <div className="prose max-w-none w-full text-licorice text-lg lg:text-xl leading-loose mb-16">
            {portfolioPiece?.description?.json &&
              renderRichText(portfolioPiece.description.json, portfolioPiece.description.links)}
          </div>

          {/* Render up to 17 images and descriptions */}
          {Array.from({ length: 17 }).map((_, index) => {
            const imageKey = `image${index + 1}`;
            const descKey = `description${index + 2}`;

            const image = portfolioPiece?.[imageKey];
            const description = portfolioPiece?.[descKey]?.json;

            return (image?.url || description) ? (
              <div key={index} className="mb-12">
                {image?.url && (
                  <div className="p-3 lg:p-5 mb-8 sm:mx-0 md:mb-16">
                    <img
                      src={image.url.startsWith("http") ? image.url : `https:${image.url}`}
                      alt={image.title || `Image ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
                {description && (
                  <div className="prose max-w-none w-full text-licorice text-lg lg:text-xl leading-loose">
                    {renderRichText(description, description.links)}
                  </div>
                )}
              </div>
            ) : null;
          })}
        </article>
      </div>
    </div>
  );
}
