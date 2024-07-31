LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
	*
FROM
	read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1)
WHERE
	sources[1].record_id = 'R3766655';