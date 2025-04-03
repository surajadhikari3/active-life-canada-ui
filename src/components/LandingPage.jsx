import React from "react";

// Images (Placeholder URLs, replace with actual images from your server or assets)
const images = {
    swimming: "https://media.istockphoto.com/id/465383082/photo/female-swimmer-at-the-swimming-pool.jpg?s=1024x1024&w=is&k=20&c=xVP9ZlVFLgxxHQTE8ND3KtM8nIj8IzO9U7P19YEOFsk=",
    skating: "https://media.istockphoto.com/id/1186323725/photo/strategy-to-win-in-ice-hockey.jpg?s=1024x1024&w=is&k=20&c=dgsUqsEq5XsJNvIvIp1hCecIXnkbkL5MUqK6d3kQJm4=",
    city: "https://media.istockphoto.com/id/1209988354/photo/young-man-skateboarding-in-los-angeles.jpg?s=1024x1024&w=is&k=20&c=FE52cFnj9rwmp9W4OT1hwh98BX4Cor4JSukm3HfzNCs=",
};

const LandingPage = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-blue-300 text-white text-center py-16">
                <h1 className="text-4xl font-bold mb-4">Active Life Canada</h1>
                <p className="text-xl mb-6">Recreational Activities for Every Resident</p>
                <a
                    href="/course"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl"
                >
                    Explore Activities
                </a>
            </section>

            {/* Activities Section */}
            <section id="activities" className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Popular Activities</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Swimming */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="/category/swim-image.jpg"
                                alt="Swimming"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-4">Swimming</h3>
                                <p className="text-gray-600 mb-4">
                                    Enjoy refreshing swimming sessions at our indoor pools, perfect for all ages.
                                </p>
                                <a href="/swimming" className="text-blue-600">
                                    Learn More &raquo;
                                </a>
                            </div>
                        </div>

                        {/* Skating */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={images.skating}
                                alt="Skating"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-4">Skating</h3>
                                <p className="text-gray-600 mb-4">
                                    Glide across the ice with our expert skating facilities, open to all skill levels.
                                </p>
                                <a href="/skating" className="text-blue-600">
                                    Learn More &raquo;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* City Overview Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">For Our Residents</h2>
                    <p className="text-xl mb-8">
                        Active Life Canada offers residents easy access to a variety of activities that promote health and wellness.
                    </p>
                    <img
                        src={images.city}
                        alt="City Overview"
                        className="mx-auto rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-blue-300 text-white text-center py-16">
                <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
                <p className="text-xl mb-6">Start living a healthier, more active lifestyle.</p>
                <a
                    href="/signup"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl"
                >
                    Sign Up Now
                </a>
            </section>
        </div>
    );
};

export default LandingPage;
