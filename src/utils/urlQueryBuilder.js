function urlQueryBuilder(url, cols) {
    let queryString = "";

    url = `/${url}`;

    const filters = Array.isArray(cols)
        ? cols
        : cols
          ? Object.values(cols)
          : [];

    if (filters.length > 0) {
        filters.forEach((filter) => {
            if (filter && filter.model !== undefined && filter.model !== null && filter.model !== "") {
                if (queryString) {
                    queryString += "&";
                }

                if (filter.model.label) {
                    queryString += `${filter.name}=${encodeURIComponent(filter.model.value)}`;
                } else {
                    queryString += `${filter.name}=${encodeURIComponent(filter.model)}`;
                }
            }
        });

        if (queryString) {
            url += `?${queryString}`;
        }
    }

    return url
}

export { urlQueryBuilder }
