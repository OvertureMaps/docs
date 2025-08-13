

# Address

Addresses are geographic points used for locating businesses and individuals. The
rules, fields, and fieldnames of an address can vary extensively between locations.
We use a simplified schema to capture worldwide address points.  This initial schema
is largely based on the OpenAddresses (www.openaddresses.io) project.

The address schema allows up to 5 "admin levels". Rather than have field names that
apply across all countries, we provide an array called "address_levels" containing
the necessary administrative levels for an address.
