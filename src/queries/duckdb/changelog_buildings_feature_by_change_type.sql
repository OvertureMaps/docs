LOAD spatial;
LOAD httpfs;
SET s3_region='us-west-2';

SELECT count(*), change_type 
FROM read_parquet('s3://overturemaps-us-west-2/changelog/2024-06-13-beta.0/theme=buildings/type=*/change_type=*/*', filename=true, hive_partitioning=1) 
WHERE 
        bbox.xmin > 37.165914
        AND bbox.xmax < 37.902271
        AND bbox.ymin > 10.221917
        AND bbox.ymax < 10.751245
GROUP BY change_type;