export default function CourseCard() {
    const courses = [
        { title: "Swimming", details: "Learn swimming with our experts" },
        { title: "Hockey", details: "Learn hockey with our experts" },
        { title: "Tennis", details: "Master the art of tennis" },
        { title: "Basketball", details: "Improve your basketball skills" },
        { title: "Football", details: "Train with top football coaches" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8">
            {courses.map((course, index) => (
                <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{course.details}</p>
                </div>
            ))}
        </div>
    );
}