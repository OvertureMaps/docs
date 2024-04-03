SELECT TOP 10 *
FROM
    OPENROWSET(
        BULK 'https://overturemapswestus2.blob.core.windows.net/release/__OVERTURE_RELEASE/theme=places/type=place/',
        FORMAT = 'PARQUET'
    )
WITH
    (
        names VARCHAR(MAX),
        categories VARCHAR(MAX),
        websites VARCHAR(MAX),
        phones VARCHAR(MAX),
        bbox VARCHAR(200),
        geometry VARBINARY(MAX)
    )
    AS
        [result]
WHERE
        TRY_CONVERT(FLOAT, JSON_VALUE(bbox, '$.xmin')) > -122.4447744
    AND TRY_CONVERT(FLOAT, JSON_VALUE(bbox, '$.xmax')) < -122.2477071
    AND TRY_CONVERT(FLOAT, JSON_VALUE(bbox, '$.ymin')) > 47.5621587
    AND TRY_CONVERT(FLOAT, JSON_VALUE(bbox, '$.ymax')) < 47.7120663
