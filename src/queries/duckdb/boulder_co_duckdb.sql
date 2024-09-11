COPY (
    SELECT *
    FROM read_parquet("s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=*/type=*/*", union_by_name = True)
    WHERE
        bbox.xmin >= -105.30
        AND bbox.ymin >= 39.98
        AND bbox.xmax <= -105.24
        AND bbox.ymax <= 40.07
) TO 'boulder_co_overture.parquet';
