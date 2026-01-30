export default function Help() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-heading font-bold text-primary mb-6">
        Help & Support
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        We're here to help. If you have any questions or need support, please
        don't hesitate to contact us.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-cream p-6 rounded-lg">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-2">Phone: [Your Phone Number]</p>
          <p className="text-gray-700 mb-2">Email: [Your Email]</p>
          <p className="text-gray-700">Hours: Monday - Friday, 9am - 5pm</p>
        </div>

        <div className="bg-cream p-6 rounded-lg">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700">
            Browse our FAQs for quick answers to common questions about our
            services.
          </p>
        </div>
      </div>
    </div>
  );
}
