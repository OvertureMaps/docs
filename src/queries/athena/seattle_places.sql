SELECT
       CAST(names AS JSON),
       geometry -- WKB
FROM
       overture
WHERE
       theme = 'places'
   AND bbox.minX > -122.4447744
   AND bbox.maxX < -122.2477071
   AND bbox.minY > 47.5621587
   AND bbox.maxY < 47.7120663
