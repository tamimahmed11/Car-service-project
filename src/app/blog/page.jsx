"use client";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600">
            Tips, tricks, and updates from Car Doctor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-primary to-orange-500 h-48"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Regular Car Maintenance Tips
              </h3>
              <p className="text-gray-600 mb-4">
                Learn the essential maintenance tasks to keep your car running smoothly and extend its lifespan.
              </p>
              <a href="#" className="text-primary font-semibold hover:text-primary/80">
                Read More →
              </a>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-primary to-orange-500 h-48"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How to Check Your Tire Pressure
              </h3>
              <p className="text-gray-600 mb-4">
                Proper tire pressure is crucial for safety and fuel efficiency. Here's how to check it correctly.
              </p>
              <a href="#" className="text-primary font-semibold hover:text-primary/80">
                Read More →
              </a>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-primary to-orange-500 h-48"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Understanding Your Car's Warning Lights
              </h3>
              <p className="text-gray-600 mb-4">
                Don't ignore those warning lights! Learn what they mean and when to visit a mechanic.
              </p>
              <a href="#" className="text-primary font-semibold hover:text-primary/80">
                Read More →
              </a>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">More Articles Coming Soon</h3>
          <p className="text-gray-600">
            Subscribe to our newsletter to get the latest updates and blog posts delivered to your inbox.
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary ml-2">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
