export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          About Our Project
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6 text-center">
          Our platform is built to empower citizens by allowing them to report issues 
          in their local community and ensure that NGOs and Administrators can take 
          action effectively. We believe in <span className="font-semibold">transparency, 
          collaboration, and community-driven change.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-green-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To connect citizens, NGOs, and administrators for solving 
              real-world issues faster and better.
            </p>
          </div>

          <div className="p-6 bg-blue-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-700">
              A future where communities thrive by working together 
              with transparency and accountability.
            </p>
          </div>

          <div className="p-6 bg-yellow-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-700">
              Integrity, Collaboration, and Empowerment guide every step 
              of our journey.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
          <p className="text-gray-600">
            We are a passionate group of developers and community builders 
            committed to making a difference through technology.
          </p>
        </div>
      </div>
    </div>
  );
}
