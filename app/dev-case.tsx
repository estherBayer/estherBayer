"use client"; // Ensures client-side rendering

export default function DevCase() {
  return (
    <div>
      {/* The rest of the portfolio page content */}
      <div className="container mx-auto px-5">
        <article>
          {/* Page Title */}
          <h1 className="mt-12 mb-12 text-left text-5xl text-darkThistlePurple font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
            Saint Carlo Web Engineering and Development Case Study
          </h1>

          {/* Development Overview Section */}
          <div className="w-full prose max-w-none text-2xl lg:text-3xl leading-loose">
          <h3>Development Overview</h3>
            <p>
              The Saint Carlo University website was built to tackle the unique challenges of delivering a tech-forward educational experience. Faced with the need to support evolving digital demands and provide an intuitive experience for prospective students, my mission was to create a platform that could enhance both usability and content management efficiency.
            </p>
            <p>
              At the heart of the project was a clear goal: to deliver a responsive, visually compelling website that performed consistently across all devices, without sacrificing scalability or flexibility. My approach was rooted in a deep understanding of both the technical and content needs of the university. By integrating Storyblok, a headless CMS, I ensured that content management became effortless for university staff, while maintaining design integrity across the site.
            </p>
            <p>
              Through thoughtful backend architecture, I constructed a system that not only handles the demands of a dynamic university site but also makes content updates intuitive and non-disruptive. This architecture relies on clean, component-driven code designed to scale with future needs. I prioritized high performance and adaptability, ensuring the website remains fast, flexible, and ready to integrate with future technologies.
            </p>
            <p>
              Every development decision, from the intuitive navigation to the sleek design and interactive elements, was made to empower both the university’s content managers and its users. This approach reduced friction in the user journey while keeping backend processes streamlined and effective.
            </p>
            <p>
              Ultimately, the website embodies Saint Carlo University’s forward-thinking ethos, merging innovation with usability. Built with a decoupled architecture and headless CMS, the platform is fully scalable, future-proofed, and capable of adapting to evolving digital trends, all while supporting the university’s mission of modern, accessible education.
            </p>
          </div>

          <div className="p-[3%] lg:p-[5%] mb-8 sm:mx-0 md:mb-16">
              <img
                src="https://images.ctfassets.net/af008cnyedli/2ybz0VU2lGNW6v9e50zp8T/7bcd2eeb3805ef3429ce4081ce3fe6a9/codeFeature.png"
                alt="code"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

          {/* Technical Stack and Architecture */}
          <div className="w-full prose max-w-none text-2xl lg:text-3xl leading-loose">
            <h3>Technical Stack and Architecture</h3>
            <p><b>Frontend Technologies:</b> The frontend of the Saint Carlo University website was built with a combination of modern technologies aimed at delivering a smooth and responsive user experience.</p>
            <p><b>HTML/CSS:</b> Leveraging semantic HTML5, I ensured that the site adheres to strict accessibility standards (WCAG). This structures the website in a way that makes the content more understandable and navigable, especially for assistive technologies like screen readers. These semantic elements provide meaning to the content, allowing both search engines and accessibility tools to interpret the layout and purpose of different sections of the website, which also improves SEO. Custom styling was applied through CSS, while Tailwind CSS was used for utility-first styling, allowing for a consistent and maintainable design language across the site.</p>
            <p><b>Vue.js:</b> Vue.js was chosen for its reactivity and component-based structure, making it an excellent fit for building dynamic and interactive user interfaces. Vue's ability to efficiently update the DOM without re-rendering entire pages was essential for creating a seamless experience for users navigating the site. Additionally, Vue’s simplicity in creating reusable components allowed me to ensure a scalable architecture for future enhancements.</p>
            <p><b>Nuxt.js (Server-Side Rendering):</b> To optimize performance and boost SEO, I employed Nuxt.js for server-side rendering (SSR). Nuxt.js also provides automatic code splitting and smart prefetching, which significantly enhances page load times, especially on first interaction. This was key in ensuring the website remains highly performant and accessible across all devices, particularly mobile.</p>
            <p><b>Tailwind CSS:</b> Tailwind CSS, with its utility-first approach, allowed me to implement a consistent design system throughout the website while minimizing custom CSS. Its flexibility enabled rapid prototyping and iterative development, ensuring that design changes could be implemented quickly. Tailwind's approach also ensured that the site adhered to a clean, minimal style, which was in line with the university’s branding.</p>

            {/* Backend Technologies */}
            <h3>Backend Technologies</h3>
            <p>The backend architecture ensures smooth content delivery and integrates several essential services.</p>
            <h3>Node.js</h3>
            <p>Node.js was utilized for handling server-side operations and API requests. Its non-blocking, event-driven architecture made it an excellent choice for handling the site's dynamic content needs. This was particularly useful for integrating various APIs and ensuring fast data processing across the website.</p>
            <h3>APIs</h3>
            <p>The website integrates several third-party APIs to enhance functionality. For example, user authentication is streamlined through API integration, and external APIs are used to fetch up-to-date course information and program details. These integrations ensure that the website remains dynamic and provides accurate, real-time data to students.</p>
            <h3>Content Management (Storyblok CMS)</h3>
            <p>I integrated Storyblok, a headless CMS, into the website to empower non-technical users to manage content independently. Its visual editor allows content managers to see changes in real-time before publishing. This headless CMS ensures that content updates are easy, without impacting the underlying code or site performance. Storyblok’s flexibility also enabled me to build dynamic content blocks that can be reused throughout the website, contributing to both scalability and ease of management.</p>
          <p></p></div>

          {/* Development Process */}
          <div className="w-full prose max-w-none text-2xl lg:text-3xl leading-loose">
            <h3>Development Process</h3>
            <h4>Setup and Configuration</h4>
            <p>To establish the development environment, I used Vue.js alongside Nuxt.js to build the core frontend structure. This combination allows for smooth server-side rendering (SSR), which not only optimizes the performance of the site but also enhances SEO and improves initial load times for users.</p>
            <p>For styling, I integrated Tailwind CSS into the project, ensuring a utility-first approach to styling. This made it easier to quickly apply consistent design rules across the entire site without cluttering the codebase with excessive custom CSS.</p>

            <h4>Storyblok Integration</h4>
            <p>A key focus was the headless CMS (Storyblok) integration. After configuring Storyblok to connect with Nuxt.js, I designed dynamic content structures, ensuring that content managers could easily update the website without involving developers. I developed custom components within Storyblok’s schema, such as hero sections, FAQs, and carousels, to provide non-technical staff with easy-to-use content blocks. The visual editor in Storyblok allowed them to preview changes in real-time, further enhancing content workflow efficiency.</p>
            <p>To ensure scalability, I structured the CMS with modular content blocks—each capable of being reused across the site. This decoupled approach ensures that as the university’s content needs grow, adding new sections or pages can be done without redeveloping the frontend code.</p>

            <h3>Component Development</h3>
            <p>I adopted a component-driven development approach, leveraging Vue.js’s ecosystem. By creating reusable Vue components, such as headers, cards, and interactive carousels, I ensured consistent functionality and design throughout the website. Each component was designed with flexibility in mind, so that they could easily be adapted for different pages or sections without requiring duplication of code.</p>
            <p>For example, the carousel component was used in various areas of the site, with different settings for each instance, ensuring dynamic content presentation while maintaining simplicity in the codebase. I aimed to follow the Single Responsibility Principle (SRP) by wrapping each UI element in its own component, making the system easier to maintain and flexible for future changes. SRP is key in component-based development, ensuring that each component focuses on one specific task.</p>
            <p>This component-based architecture ensures that updating a feature, such as altering the functionality of the carousel or buttons, can be done in isolation, reducing the risk of introducing bugs elsewhere. It also enhances scalability, allowing new features to be added without disrupting the core system.</p>
            <p>Storyblok integration further enhances the flexibility of the system. By aligning content blocks in Storyblok with Vue.js components, content managers can update and maintain the site efficiently, without needing technical knowledge or affecting the overall design and functionality. This setup provides a clear separation between content and structure, ensuring scalability and easy management for future requirements.</p>

            <h3>Conclusion</h3>
            <p>Building the Saint Carlo University website was a comprehensive process that involved designing for scalability, usability, and ease of content management.</p>
            <p>
              You can view the live website here:{" "}
              <a href="https://saintcarlo.netlify.app">
                <b><u>Saint Carlo University</u></b>
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}