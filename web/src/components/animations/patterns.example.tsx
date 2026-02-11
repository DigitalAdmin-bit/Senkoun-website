// Example: Common Animation Patterns
// Copy these patterns into your components as needed

import { ScrollAnimation, StaggerAnimation } from "@/components/animations";

// ==========================================
// PATTERN 1: Hero Section with Sequential Animations
// ==========================================
function HeroPattern() {
  return (
    <section>
      <ScrollAnimation animation="fadeIn" delay={0}>
        <p className="subtitle">Welcome</p>
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={0.2}>
        <h1 className="title">Main Heading</h1>
      </ScrollAnimation>

      <ScrollAnimation animation="fadeIn" delay={0.4}>
        <p className="description">Description text</p>
      </ScrollAnimation>

      <ScrollAnimation animation="scaleIn" delay={0.6}>
        <button>Call to Action</button>
      </ScrollAnimation>
    </section>
  );
}

// ==========================================
// PATTERN 2: Feature Cards Grid
// ==========================================
function FeatureCardsPattern() {
  const features = [
    { id: 1, title: "Feature 1", icon: "🎯" },
    { id: 2, title: "Feature 2", icon: "🚀" },
    { id: 3, title: "Feature 3", icon: "⚡" },
    { id: 4, title: "Feature 4", icon: "💡" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StaggerAnimation staggerDelay={0.1}>
        {features.map((feature) => (
          <div key={feature.id} className="card">
            <span className="icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
          </div>
        ))}
      </StaggerAnimation>
    </div>
  );
}

// ==========================================
// PATTERN 3: Alternating Content Sections
// ==========================================
function AlternatingContentPattern() {
  const sections = [
    { title: "Section 1", image: "/image1.jpg", imagePosition: "left" },
    { title: "Section 2", image: "/image2.jpg", imagePosition: "right" },
    { title: "Section 3", image: "/image3.jpg", imagePosition: "left" },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <ScrollAnimation
          key={index}
          animation={section.imagePosition === "right" ? "slideLeft" : "slideRight"}
          delay={0.1}
        >
          <div className={`flex ${section.imagePosition === "right" ? "flex-row-reverse" : ""}`}>
            <img src={section.image} alt={section.title} />
            <div>
              <h2>{section.title}</h2>
              <p>Content here...</p>
            </div>
          </div>
        </ScrollAnimation>
      ))}
    </>
  );
}

// ==========================================
// PATTERN 4: Stats Counter Section
// ==========================================
function StatsPattern() {
  return (
    <ScrollAnimation animation="slideUp" delay={0.2}>
      <div className="stats-grid">
        <div className="stat">
          <span className="number">500+</span>
          <span className="label">Customers</span>
        </div>
        <div className="stat">
          <span className="number">100+</span>
          <span className="label">Staff Members</span>
        </div>
        <div className="stat">
          <span className="number">5+</span>
          <span className="label">Locations</span>
        </div>
      </div>
    </ScrollAnimation>
  );
}

// ==========================================
// PATTERN 5: Content with Image (Simple)
// ==========================================
function ContentWithImagePattern() {
  return (
    <div className="flex gap-8">
      <ScrollAnimation animation="slideRight" className="flex-1">
        <img src="/image.jpg" alt="Description" />
      </ScrollAnimation>

      <ScrollAnimation animation="slideLeft" delay={0.2} className="flex-1">
        <div>
          <h2>Heading</h2>
          <p>Description text...</p>
          <button>Learn More</button>
        </div>
      </ScrollAnimation>
    </div>
  );
}

// ==========================================
// PATTERN 6: Testimonial Cards
// ==========================================
function TestimonialsPattern() {
  const testimonials = [
    { id: 1, name: "John Doe", text: "Great service!" },
    { id: 2, name: "Jane Smith", text: "Highly recommend!" },
    { id: 3, name: "Bob Johnson", text: "Excellent care!" },
  ];

  return (
    <div className="testimonials">
      <ScrollAnimation animation="fadeIn">
        <h2>What Our Clients Say</h2>
      </ScrollAnimation>

      <StaggerAnimation staggerDelay={0.15}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p>"{testimonial.text}"</p>
            <span>- {testimonial.name}</span>
          </div>
        ))}
      </StaggerAnimation>
    </div>
  );
}

// ==========================================
// PATTERN 7: Full Section Animation
// ==========================================
function FullSectionPattern() {
  return (
    <ScrollAnimation animation="fadeIn" className="section">
      <div className="container">
        <h2>Section Title</h2>
        <p>All content animates together</p>
        <button>Action Button</button>
      </div>
    </ScrollAnimation>
  );
}

// ==========================================
// PATTERN 8: List Items
// ==========================================
function ListPattern() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <ul>
      <StaggerAnimation staggerDelay={0.08}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </StaggerAnimation>
    </ul>
  );
}

// ==========================================
// PATTERN 9: CTA Banner
// ==========================================
function CTABannerPattern() {
  return (
    <section className="cta-banner">
      <ScrollAnimation animation="fadeIn">
        <p className="subtitle">Ready to get started?</p>
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={0.2}>
        <h2>Contact Us Today</h2>
      </ScrollAnimation>

      <ScrollAnimation animation="scaleIn" delay={0.4}>
        <button className="cta-button">Get in Touch</button>
      </ScrollAnimation>
    </section>
  );
}

// ==========================================
// PATTERN 10: Multi-Column Layout
// ==========================================
function MultiColumnPattern() {
  const columns = [
    { title: "Column 1", items: ["A", "B", "C"] },
    { title: "Column 2", items: ["D", "E", "F"] },
    { title: "Column 3", items: ["G", "H", "I"] },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {columns.map((column, colIndex) => (
        <ScrollAnimation
          key={colIndex}
          animation="slideUp"
          delay={colIndex * 0.15}
        >
          <div className="column">
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  );
}

export {
  HeroPattern,
  FeatureCardsPattern,
  AlternatingContentPattern,
  StatsPattern,
  ContentWithImagePattern,
  TestimonialsPattern,
  FullSectionPattern,
  ListPattern,
  CTABannerPattern,
  MultiColumnPattern,
};

