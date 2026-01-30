import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Story | Senkoun Care Homes",
  description:
    "Learn about Senkoun Care Homes - our history, mission, and the values that guide our commitment to exceptional care.",
};

const timeline = [
  {
    year: "1998",
    title: "The Beginning",
    description:
      "Senkoun Care Homes was founded with a vision to provide compassionate, high-quality care for the elderly in London.",
  },
  {
    year: "2005",
    title: "Growing Family",
    description:
      "We opened our second care home, Joseph Lodge, expanding our capacity to serve more families in need of quality care.",
  },
  {
    year: "2015",
    title: "Excellence Recognized",
    description:
      "Received our first 'Outstanding' rating from the Care Quality Commission, a testament to our dedicated team.",
  },
  {
    year: "2023",
    title: "Continuing Our Mission",
    description:
      "Now operating four care homes across London, we continue to set the standard for exceptional elderly care.",
  },
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Medical Director",
    image: "/images/team-1.jpg",
    bio: "With over 20 years of experience in geriatric medicine, Dr. Chen leads our medical team with expertise and compassion.",
  },
  {
    name: "James Okonkwo",
    role: "Operations Director",
    image: "/images/team-2.jpg",
    bio: "James ensures our homes run smoothly, bringing 15 years of healthcare management experience to Senkoun.",
  },
  {
    name: "Maria Santos",
    role: "Head of Care",
    image: "/images/team-3.jpg",
    bio: "Maria coordinates care across all our homes, ensuring every resident receives personalized attention.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/our-story-hero.jpg"
            alt="Senkoun Care Homes"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 py-16">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Our Story
            </h1>
            <p className="mt-6 text-xl text-white/80">
              For over 25 years, we've been dedicated to providing exceptional
              care for elderly residents across London.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                At Senkoun Care Homes, our mission is simple: to provide the
                highest quality of care in environments where residents feel
                truly at home. We believe every person deserves dignity,
                respect, and the opportunity to live their best life, regardless
                of age or health challenges.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                We achieve this through our dedicated team of professionals who
                treat each resident as an individual, creating personalized care
                plans that address their unique needs and preferences.
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/mission.jpg"
                alt="Our caring team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-off-white">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-gray-900 text-center sm:text-4xl">
            Our Journey
          </h2>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative border-l-2 border-primary pl-8 space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    {/* Dot marker */}
                  </div>
                  <div className="absolute -left-[25px] h-4 w-4 rounded-full border-4 border-primary bg-white" />
                  <p className="text-sm font-bold text-primary">{item.year}</p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet Our Leadership
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team brings decades of healthcare
              expertise to ensure the highest standards of care.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full bg-primary/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary">
        <div className="container text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Become Part of Our Story
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Whether you're looking for care for a loved one or a rewarding
            career in care, we'd love to hear from you.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/enquire"
              className="btn bg-accent hover:bg-accent-dark text-white"
            >
              Make an Enquiry
            </Link>
            <Link
              href="/careers"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
