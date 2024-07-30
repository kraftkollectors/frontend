import Link from "next/link";

export default function AllCategories() {
    return (
        <div className="app-container py-16">
            <div className="flex judtify-between">
                <h3 className="text-title font-bold text-black-400">Our Categories</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
                {
                    categories.map((category, index) => (
                        <Link key={index}
                        href={`/search?category=${category.title}`}
                        className="relative block aspect-[4/3] rounded-lg overflow-hidden bg-cover bg-center"
                        style={{ backgroundImage: `url(${category.image})` }}
                        >
                            <div className="absolute h-full w-full bg-gradient-to-t from-[#00000099] to-transparent p-4 flex flex-col justify-end">
                                <p className="text-light font-bold">{category.title}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div>
    );
}


const categories = [
    {
        image: "/images/categories/home-services.jpg",
        title: "Home Services",
    },
    {
        image: "/images/categories/beauty-wellness.jpg",
        title: "Beauty & Welness",
    },
    {
        image: "/images/categories/technology.jpg",
        title: "Technology",
    },
    {
        image: "/images/categories/automotive.jpg",
        title: "Automotive",
    },
    {
        image: "/images/categories/cleaning-services.jpg",
        title: "Cleaning Services",
    },
    {
        image: "/images/categories/planning.jpg",
        title: "Event Planning",
    },
    {
        image: "/images/categories/fashion-styling.jpg",
        title: "Fashion & Styling",
    },
    {
        image: "/images/categories/real-estate-services.jpg",
        title: "Real Estate Services",
    },
]