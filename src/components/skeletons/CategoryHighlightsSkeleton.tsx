const CategoryHighlightsSkeleton = () => (
    <div className="mb-10">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-28 h-28 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded mt-3 w-16 mx-auto"></div>
                </div>
            ))}
        </div>
    </div>
);

export default CategoryHighlightsSkeleton;
