import { GetStaticProps, GetStaticPaths } from 'next';
import { getPortfolioPageBySlug, PortfolioPageFields, getAllPortfolioPages } from "@/lib/api";
import NavBar from "../../nav-bar";
import TextImageStack from "../../text-image-stack";
import CoverImage from "../../cover-image"; // Example of additional content

// Interface for Props
interface PortfolioPageProps {
  pageData: PortfolioPageFields;
}

// getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const pageData = await getPortfolioPageBySlug(slug);

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pageData },
  };
};

// getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPortfolioPages();

  const paths = allPages.map((page) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: "blocking", // Blocking to allow dynamic fallback rendering
  };
};

// PortfolioPage Component
export default function PortfolioPage({ pageData }: PortfolioPageProps) {
  return (
    <div>
      <NavBar />

      {/* Render Page Title */}
      <h1>{pageData.title}</h1>

      {/* Render Components Dynamically */}
      {pageData.componentsCollection?.items?.length ? (
        pageData.componentsCollection.items.map((component, index) => {
          switch (component.__typename) {
            case 'TextImageStack':
              return (
                <TextImageStack
                  key={index}
                  fields={{
                    title: component.title ?? "Untitled",
                    text: component.text ?? "",
                    image: component.image
                      ? {
                          fields: {
                            file: {
                              url: component.image?.url ?? "",
                            },
                            title: component.image?.title ?? "",
                          },
                        }
                      : undefined,
                  }}
                />
              );
            case 'CoverImage': // Example to handle cover image component
              return (
                <CoverImage
                  key={index}
                  title={component.title ?? "No Title"}
                  url={component.coverImage?.url ?? ""}
                />
              );
            // Add more component cases here for different types
            default:
              return null;
          }
        })
      ) : (
        <p>No components found for this page.</p>
      )}

    </div>
  );
}
