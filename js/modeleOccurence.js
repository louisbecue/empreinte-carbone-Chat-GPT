/**
 * Analyzes JSON data and returns an object counting occurrences
 * of each value of 'default_model_slug'
 */
function countDefaultModelSlugs(jsonData) {
    const slugCounts = {};
    findAndCountSlugs(jsonData, slugCounts);
    return slugCounts;
}

/**
 * Recursively searches for 'default_model_slug' keys in a JSON object
 * and counts their occurrences
 */
function findAndCountSlugs(jsonObj, slugCounts) {
    if (jsonObj && typeof jsonObj === 'object' && !Array.isArray(jsonObj)) {
        if ('default_model_slug' in jsonObj) {
            const slug = jsonObj['default_model_slug'];
            slugCounts[slug] = (slugCounts[slug] || 0) + 1;
        }
        for (const key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                findAndCountSlugs(jsonObj[key], slugCounts);
            }
        }
    }
    else if (Array.isArray(jsonObj)) {
        for (const item of jsonObj) {
            findAndCountSlugs(item, slugCounts);
        }
    }
}
