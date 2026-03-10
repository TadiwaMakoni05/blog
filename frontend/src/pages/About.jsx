import React from "react";
import { BookOpen, Users, Globe, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black dark:bg-white mb-6">
          <BookOpen className="h-8 w-8 text-white dark:text-black" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Medium</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          A place to read, write, and deepen your understanding of the topics
          that matter most to you.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Medium is an open platform where readers find dynamic, insightful
          thinking and where expert and undiscovered voices alike can share their
          writing on any topic. We believe that what you read and write matters,
          and that the exchange of ideas and experiences is what moves humanity
          forward.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We're building a different kind of content platform — one that values
          depth over clickbait, substance over sensationalism, and thoughtful
          discourse over divisive rhetoric. Every article published on Medium is
          curated for quality, ensuring readers always discover something
          worthwhile.
        </p>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">What We Stand For</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Community First",
              description:
                "We empower writers from all backgrounds to share their stories and perspectives with the world.",
            },
            {
              icon: Globe,
              title: "Open Access",
              description:
                "Quality ideas should be accessible. We strive to keep knowledge open and available to everyone.",
            },
            {
              icon: Heart,
              title: "Authentic Voices",
              description:
                "We celebrate original thinking and first-hand experience over recycled content and hot takes.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]"
            >
              <value.icon className="h-6 w-6 text-black dark:text-white mb-3" />
              <h3 className="font-semibold mb-1">{value.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Medium was founded on the belief that the world needs a better
          platform for ideas. In an era dominated by algorithmic feeds and
          attention-driven metrics, we set out to create a space that rewards
          thoughtful writing and genuine engagement.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Since our launch, millions of writers have published on Medium, and
          hundreds of millions of readers have come to discover their work.
          From personal essays to in-depth technical guides, our community
          generates thousands of new stories every day across topics ranging
          from technology and science to culture and creativity.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We remain committed to our founding vision: a platform where the best
          ideas rise to the top, where every voice has the potential to reach an
          audience, and where the act of reading and writing is valued and
          respected.
        </p>
      </section>

      {/* Contact CTA */}
      <section className="text-center py-10 px-6 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-2">Have Questions?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We'd love to hear from you. Reach out to our team anytime.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-90 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;
