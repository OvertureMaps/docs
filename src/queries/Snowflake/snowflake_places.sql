// Identify places within the "Restaurant" category
/*
Retrieves the geographic IDs (geoid), phone numbers (phones), and primary names (names) of places categorized as "restaurant" from the specified table. Limited to 100 results.
*/
SELECT id, phones['list'][0]['element'] AS phone, names['primary'] AS name
FROM CARTO.PLACE
WHERE categories['primary'] = 'restaurant'
LIMIT 100;
