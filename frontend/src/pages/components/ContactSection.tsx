export const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Contact Me</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border-2 border-black dark:border-white rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white focus:border-red-600 dark:focus:border-red-500 transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border-2 border-black dark:border-white rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white focus:border-red-600 dark:focus:border-red-500 transition-colors duration-300"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 border-2 border-black dark:border-white rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white focus:border-red-600 dark:focus:border-red-500 transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white border-2 border-black dark:border-white hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
