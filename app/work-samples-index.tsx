"use client"; // Ensures client-side rendering
import { useEffect, useState } from "react";
import { getWorkSamplesIndex } from "../lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function WorkSamplesIndex() {
  const [workSamplesIndex, setWorkSamplesIndex] = useState<any[]>([]);
  const [showDarkThistlePurple, setShowDarkThistlePurple] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const samples = await getWorkSamplesIndex();
      const sortedSamples = (samples || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setWorkSamplesIndex(sortedSamples);
      setShowDarkThistlePurple(true); // Toggle after data is loaded
    }
    fetchData();
  }, []);

  if (!workSamplesIndex || workSamplesIndex.length === 0) {
    return <p className="text-center py-10">Loading work samples...</p>;
  }

  const projects = workSamplesIndex.reduce((acc: any, sample: any) => {
    const project = sample.project || 'Uncategorized';
    if (!acc[project]) acc[project] = [];
    acc[project].push(sample);
    return acc;
  }, {});

  return (
    <div id="portfolio-section" className="md:mt-20 lg:mt-20">
      {/* Full-Width Background for the Title */}
      <div className="w-full bg-gradient-to-r from-white to-darkThistlePurple py-5">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-right text-white p-5">
            WORK SAMPLES
          </h2>
        </div>
      </div>

      <div className="container mx-auto py-10 px-5">
  {Object.keys(projects).map((project, projectIndex) => (
    <div key={projectIndex} className="mb-12 container mx-auto">
      <h3 className="text-2xl md:text-4xl mb-12 flex flex-col md:flex-row items-start md:items-center">
        {/* Project Title */}
        <strong>{project}</strong>

        {/* Display the Live Website Link beside the project title */}
        {projects[project].some((sample: { liveWebsiteLink: any }) => sample.liveWebsiteLink) && (
          <a
            href={projects[project][0].liveWebsiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="md:ml-4 mt-2 md:mt-0 text-2xl md:text-4xl text-darkThistlePurple hover:text-menuBlue"
          >
            <em>- explore the live project </em><u>here</u>
          </a>
        )}
      </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects[project].map((sample: any, index: number) => (
                <div key={index} className="relative group">
                  <div className="text-right mb-2">
                    <h3 className="text-sm font-bold">
                      {sample.title || `Sample Title ${index + 1}`}
                    </h3>
                  </div>

                  {/* Image */}
                  <a href={sample.link} className="block">
                    <div className="relative overflow-hidden rounded-md">
                      {sample.image && (
                        <img
                          src={sample.image.url}
                          alt={sample.image.title || `Image ${index + 1}`}
                          className="w-full h-auto transition-all duration-300"
                        />
                      )}

                      {/* Overlay with description */}
                      <div className="absolute inset-0 bg-thistle flex flex-col justify-end items-end p-5 pl-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-lg font-bold text-right">
                          {sample.description && documentToReactComponents(sample.description.json)}
                        </p>
                      </div>
                    </div>
                  </a>

                  {/* "Read More" Link */}
                  <div className="mt-2 flex justify-between items-end">
                    <a
                      href={sample.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md font-bold underline hover:text-menuBlue"
                    >
                      READ MORE
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
