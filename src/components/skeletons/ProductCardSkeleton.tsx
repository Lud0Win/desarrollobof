const ProductCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
        <div className="bg-gray-200 w-full h-48"></div>
        <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-7 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
    </div>
);

export default ProductCardSkeleton;
