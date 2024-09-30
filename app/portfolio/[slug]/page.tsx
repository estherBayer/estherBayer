import Link from "next/link";
import { draftMode } from "next/headers";
import { getPortfolioPieces, getPortfolioPieceBySlug } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import NavBar from "../../nav-bar"; // Import the navbar component

// Fetch portfolio slugs for dynamic paths
export async function generateStaticParams() {
  const allPortfolioPieces = await getPortfolioPieces();
  return allPortfolioPieces.map((piece) => ({
    slug: piece.slug,
  }));
}

// Helper function to render rich text fields with images
// Helper function to render rich text fields with images
const renderRichText = (richText: any) => {
    if (!richText) return null;
  
    return documentToReactComponents(richText, {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          const { file, title } = node.data.target.fields || {};
          const imageUrl = file?.url;
  
          if (imageUrl) {
            return (
              <div className="p-[3%] lg:p-[5%] mb-8 sm:mx-0 md:mb-16">
                <img src={imageUrl} alt={title || "Embedded Asset"} className="w-full h-auto" />
              </div>
            );
          }
          return null;
        },
      },
    });
  };


  export default async function PortfolioPage({ params }: { params: { slug: string } }) {
    const { isEnabled } = draftMode();
    const portfolioPiece = await getPortfolioPieceBySlug(params.slug);
  
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
  
            {portfolioPiece?.coverImage?.url && (
              <div className="mb-8 sm:mx-0 md:mb-16">
                <img
                  src={portfolioPiece.coverImage.url}
                  alt={portfolioPiece.coverImage.title || "Cover Image"}
                  className="w-full h-auto"
                />
              </div>
            )}
  
            <div className="w-full">
              {portfolioPiece?.description?.json && (
                <div className="prose max-w-none w-full text-2xl lg:text-3xl leading-loose">
                  {renderRichText(portfolioPiece.description.json)}
                </div>
              )}
  
              {Array.from({ length: 17 }).map((_, index) => {
                const imageKey = `image${index + 1}`;
                const descKey = `description${index + 2}`;
  
                const image = portfolioPiece?.[imageKey];
                const description = portfolioPiece?.[descKey]?.json;
  
                return (image?.url || description) ? (
                  <div key={index}>
                    {image?.url && (
                      <div className="p-[3%] lg:p-[5%] mb-8 sm:mx-0 md:mb-16">
                        <img src={image.url} alt={image.title || `Image ${index + 1}`} className="w-full h-auto" />
                      </div>
                    )}
                    {description && (
                      <div className="prose max-w-none w-full text-2xl lg:text-3xl leading-loose">
                        {renderRichText(description)}
                      </div>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </article>
        </div>
      </div>
    );
  }
  