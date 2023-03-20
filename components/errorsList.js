const ErrorsList = ( {errors}) => {
    if (Object.keys(errors).length === 0) {
        return null;
    }

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Errores:</strong>
            <ul className="list-disc ml-4 mt-2">
                {Object.entries(errors).map(([key, value]) => (
                    <li key={key}>{value.join(", ")}</li>
                ))}
            </ul>
        </div>
    );

}

export default ErrorsList;