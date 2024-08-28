from sedona.spark import *

config = SedonaContext.builder().config(
    "fs.s3a.aws.credentials.provider", 
    "org.apache.hadoop.fs.s3a.AnonymousAWSCredentialsProvider"
    ).getOrCreate()
sedona = SedonaContext.create(config)

df = sedona.read.format("geoparquet").load(
    "s3a://overturemaps-us-west-2/release/__OVERTURE_RELEASE/*"
)
