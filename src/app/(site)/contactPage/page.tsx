export default function ContactPage() {
    return (
        <section id="contactPage" className="min-h-dvh flex flex-col items-center justify-center">
            <div className="bg-white flex flex-col md:flex-row w-full max-w-7xl rounded-md overflow-hidden">
                {/* Left: Form */}
                <div className="flex-1 p-8 md:p-10">
                    <h2 className="text-lg font-semibold mb-6">Reach Us!</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Name *</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email *</label>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone #"
                                className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Company</label>
                            <input
                                type="text"
                                placeholder="Company name"
                                className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600">Message *</label>
                            <textarea
                                rows={4}
                                placeholder="Write your message"
                                className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 resize-none"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="bg-primary text-white px-6 py-3 font-medium text-sm rounded-sm shadow hover:bg-[#1f3369] transition"
                            >
                                SEND MESSAGE
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right: Contact Info */}
                <div className="bg-secondary text-white p-8 md:w-80 flex flex-col">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <p className="text-sm text-gray-200 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, magnam!
                    </p>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="text-lg">📍</span>
                            <span>9757 Aspen Lane South Richmond Hill, NY 11419</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg">📞</span>
                            <span>+1 (291) 939 9321</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg">✉️</span>
                            <span>info@mywebsite.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
