import { FaRegClipboard, FaTasks, FaUsers, FaVoteYea } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white min-h-[80vh] flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6">
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay */}
        
        {/* Left Content */}
        <div className="relative z-10 md:w-1/2 flex flex-col items-center md:items-start">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            FixMyTown
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-6 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Report local issues. Track progress. Make your town a better place to live.
          </motion.p>
          <motion.a
            href="/report-issue"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-gray-100 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Report an Issue
          </motion.a>
        </div>

        {/* Right Illustration */}
        <motion.div
          className="relative z-10 md:w-1/2 mt-10 md:mt-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="City Illustration"
            className="rounded-xl shadow-2xl max-h-[400px] object-cover"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why FixMyTown?
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Feature 1 */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FaRegClipboard className="text-blue-600 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Report Issues Easily
              </h3>
              <p className="text-gray-600">
                Quickly report potholes, streetlight failures, or any local issue in just a few clicks.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <FaTasks className="text-green-600 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Track Your Submissions
              </h3>
              <p className="text-gray-600">
                Stay updated on the progress of your reported issues with real-time status updates.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <FaUsers className="text-purple-600 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                NGO & Admin Collaboration
              </h3>
              <p className="text-gray-600">
                Connect with NGOs and local authorities to resolve issues faster and effectively.
              </p>
            </motion.div>

            {/* Feature 4 - Community Driven */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <FaVoteYea className="text-red-600 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Users can upvote issues, helping prioritize the most important problems in your area.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-white py-16 text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to make a difference?
        </motion.h2>
        <motion.a
          href="/register"
          className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold shadow-lg hover:bg-gray-100 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Get Started
        </motion.a>
      </section>
    </div>
  );
}
