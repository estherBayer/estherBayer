"use client";

type TextImageStackFields = {
  title: string;
  text: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
};

interface TextImageStackProps {
  fields: TextImageStackFields;
}

export default function TextImageStack({ fields }: TextImageStackProps) {
  return (
    <div>
      {/* The rest of the portfolio page content */}
      <div className="container mx-auto px-5">
        <article>
          <h1 className="mt-12 mb-12 text-left text-5xl text-darkThistlePurple font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
            {fields.title}
          </h1>

          <div className="w-full">
            <div className="prose max-w-none w-full text-2xl lg:text-3xl leading-loose">
              <p>{fields.text}</p>
            </div>
            {fields.image && (
              <div className="p-[3%] lg:p-[5%] mb-8 sm:mx-0 md:mb-16">
                <img
                  src={fields.image.fields.file.url}
                  alt={fields.image.fields.title}
                />
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
