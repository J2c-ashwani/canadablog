const fs = require('fs');
const path = require('path');

// Register ts-node for importing ts files in node
require('ts-node').register({ transpileOnly: true });

const { getPseoPage, getAllPseoPages } = require('../lib/pseo-data');
const { getAllPrograms } = require('../lib/data/programs');
const { guidesDatabase } = require('../lib/data/guides');
const { comparisonsDatabase } = require('../lib/data/comparisons');

const RAW_USER_DATA_1 = `
https://www.fsidigital.ca/grants/va/chesapeake/manufacturing,2026-08-08
https://www.fsidigital.ca/grants/bc/richmond/healthcare,2026-08-08
https://www.fsidigital.ca/grants/bc/richmond/manufacturing,2026-08-08
https://www.fsidigital.ca/grants/va/chesapeake/restaurants-hospitality,2026-08-06
https://www.fsidigital.ca/grants/va/norfolk/women-entrepreneurs,2026-08-05
https://www.fsidigital.ca/grants/tx/irving/veterans,2026-08-03
https://www.fsidigital.ca/grants/va/norfolk/technology,2026-08-03
https://www.fsidigital.ca/grants/az/glendale/veterans,2026-08-03
https://www.fsidigital.ca/grants/va/norfolk/manufacturing,2026-08-03
https://www.fsidigital.ca/grants/az/glendale/logistics,2026-08-03
https://www.fsidigital.ca/grants/az/glendale/women-entrepreneurs,2026-08-03
https://www.fsidigital.ca/grants/va/norfolk/arts-entertainment,2026-08-03
https://www.fsidigital.ca/grants/va/norfolk/healthcare,2026-08-02
https://www.fsidigital.ca/grants/az/glendale/manufacturing,2026-08-01
https://www.fsidigital.ca/grants/tx/irving/healthcare,2026-08-01
https://www.fsidigital.ca/grants/tx/irving/arts-entertainment,2026-08-01
https://www.fsidigital.ca/grants/tx/irving/non-profits,2026-07-31
https://www.fsidigital.ca/grants/tx/irving/retail,2026-07-31
https://www.fsidigital.ca/grants/va/norfolk/clean-energy,2026-07-31
https://www.fsidigital.ca/grants/bc/richmond/retail,2026-07-31
https://www.fsidigital.ca/grants/az/glendale/agriculture,2026-07-31
https://www.fsidigital.ca/grants/va/norfolk/non-profits,2026-07-31
https://www.fsidigital.ca/grants/va/norfolk/retail,2026-07-31
https://www.fsidigital.ca/grants/va/norfolk/veterans,2026-07-31
https://www.fsidigital.ca/grants/va/norfolk/education,2026-07-30
https://www.fsidigital.ca/grants/va/norfolk/restaurants-hospitality,2026-07-30
https://www.fsidigital.ca/grants/az/glendale/healthcare,2026-07-30
https://www.fsidigital.ca/grants/va/norfolk/logistics,2026-07-30
https://www.fsidigital.ca/grants/va/norfolk/construction,2026-07-29
https://www.fsidigital.ca/compare/sred-vs-rd-tax-credit-usa,2026-07-29
https://www.fsidigital.ca/grants/tx/irving/technology,2026-07-26
https://www.fsidigital.ca/grants/tx/irving/restaurants-hospitality,2026-07-25
https://www.fsidigital.ca/grants/tx/irving/manufacturing,2026-07-25
https://www.fsidigital.ca/grants/tx/irving/education,2026-07-23
https://www.fsidigital.ca/grants/tx/irving,2026-07-23
https://www.fsidigital.ca/compare/mitacs-vs-nserc,2026-07-22
https://www.fsidigital.ca/grants/tx/irving/agriculture,2026-07-22
https://www.fsidigital.ca/compare/ised-vs-bdc,2026-07-19
https://www.fsidigital.ca/grants/dc/washington/retail,2026-07-16
https://www.fsidigital.ca/admin/seo-opportunities,2026-07-16
https://www.fsidigital.ca/grants/ok/tulsa/agriculture,2026-07-11
https://www.fsidigital.ca/grants/ok/tulsa/non-profits,2026-07-11
https://www.fsidigital.ca/expert-insights?category=Canada News,2026-07-09
https://www.fsidigital.ca/programs/black-entrepreneur-loan,2026-07-08
https://www.fsidigital.ca/admin/dashboard,2026-07-08
https://www.fsidigital.ca/partners/checkout,2026-07-08
https://www.fsidigital.ca/programs/edc-credit-insurance,2026-07-07
https://www.fsidigital.ca/programs/mitacs-wage-subsidy,2026-07-06
https://www.fsidigital.ca/programs/canada-summer-jobs,2026-07-06
https://www.fsidigital.ca/partners/success,2026-07-05
https://www.fsidigital.ca/grants/ok/tulsa,2026-07-04
http://www.fsidigital.ca/author,2026-07-04
https://www.fsidigital.ca/author,2026-07-04
https://www.fsidigital.ca/consultation?ref=program_page_bottom_cta,2026-07-04
https://www.fsidigital.ca/admin/leads,2026-07-03
https://www.fsidigital.ca/blog?category=Demographic-Specific&page=1,2026-06-24
https://www.fsidigital.ca/&,2026-06-21
https://www.fsidigital.ca/$,2026-06-21
https://www.fsidigital.ca/partners/checkout?package=shared-pilot,2026-06-21
https://www.fsidigital.ca/compare/canexport-vs-edc,2026-06-20
https://www.fsidigital.ca/blog?category=Demographic-Specific&page=2,2026-06-20
https://www.fsidigital.ca/grants/az/chandler/arts-entertainment,2026-06-20
https://www.fsidigital.ca/compare/nsf-sbir-vs-darpa,2026-06-20
https://www.fsidigital.ca/partners/checkout?package=booked-call-pilot,2026-06-19
https://www.fsidigital.ca/partners/checkout?package=exclusive-pilot,2026-06-19
https://www.fsidigital.ca/grants/in/fort-wayne/education,2026-06-17
https://www.fsidigital.ca/products/report,2026-06-17
https://www.fsidigital.ca/admin/alerts,2026-06-14
https://www.fsidigital.ca/grants/nc/greensboro/retail,2026-06-10
https://www.fsidigital.ca/grants/nc/greensboro/women-entrepreneurs,2026-06-10
https://www.fsidigital.ca/grants/nc/greensboro/agriculture,2026-06-10
https://www.fsidigital.ca/grants/nc/greensboro/restaurants-hospitality,2026-06-10
https://www.fsidigital.ca/grants/nc/greensboro/veterans,2026-06-10
https://www.fsidigital.ca/grants/ak/anchorage/restaurants-hospitality,2026-06-10
https://www.fsidigital.ca/grants/ak/anchorage/education,2026-06-10
https://www.fsidigital.ca/booking,2026-06-04
https://www.fsidigital.ca/blog?category=USA News&page=3,2026-06-03
https://www.fsidigital.ca/blog?category=USA News&page=5,2026-06-01
https://www.fsidigital.ca/blog?category=USA News&page=2,2026-06-01
https://www.fsidigital.ca/blog?page=3,2026-05-31
https://www.fsidigital.ca/grants/la/new-orleans/healthcare,2026-05-31
https://www.fsidigital.ca/grants/la/new-orleans/manufacturing,2026-05-31
https://www.fsidigital.ca/blog?category=Canada News&page=6,2026-05-23
https://www.fsidigital.ca/blog?page=18,2026-05-18
https://www.fsidigital.ca/grants/on/windsor/logistics,2026-05-17
https://www.fsidigital.ca/grants/on/cambridge/manufacturing,2026-05-16
https://www.fsidigital.ca/grants/dc/washington/healthcare,2026-05-16
https://www.fsidigital.ca/grants/on/windsor/clean-energy,2026-05-15
https://www.fsidigital.ca/grants/on/barrie/logistics,2026-05-15
https://www.fsidigital.ca/blog?category=Canada News&page=4,2026-05-14
https://www.fsidigital.ca/grants/qc/sherbrooke/veterans,2026-05-14
https://www.fsidigital.ca/grants/ab/medicine-hat/education,2026-05-14
https://www.fsidigital.ca/grants/ab/medicine-hat/construction,2026-05-14
https://www.fsidigital.ca/grants/ab/st-albert/women-entrepreneurs,2026-05-14
https://www.fsidigital.ca/grants/ab/medicine-hat/agriculture,2026-05-14
https://www.fsidigital.ca/grants/ab/st-albert/clean-energy,2026-05-14
https://www.fsidigital.ca/grants/bc/kelowna/minority-owned,2026-05-14
https://www.fsidigital.ca/grants/bc/kamloops/manufacturing,2026-05-14
https://www.fsidigital.ca/grants/bc/saanich/veterans,2026-05-14
https://www.fsidigital.ca/grants/bc/nanaimo/veterans,2026-05-14
https://www.fsidigital.ca/grants/qc/levis/agriculture,2026-05-14
https://www.fsidigital.ca/grants/qc/sherbrooke/education,2026-05-14
https://www.fsidigital.ca/grants/qc/levis/women-entrepreneurs,2026-05-14
https://www.fsidigital.ca/grants/bc/saanich/logistics,2026-05-14
https://www.fsidigital.ca/blog?category=Canada News&page=2,2026-05-14
https://www.fsidigital.ca/grants/on/kitchener/veterans,2026-05-14
https://www.fsidigital.ca/grants/qc/gatineau/logistics,2026-05-14
https://www.fsidigital.ca/grants/ab/red-deer/retail,2026-05-14
https://www.fsidigital.ca/grants/qc/levis/education,2026-05-14
https://www.fsidigital.ca/grants/qc/levis/construction,2026-05-14
https://www.fsidigital.ca/grants/on/oshawa/clean-energy,2026-05-14
https://www.fsidigital.ca/grants/on/kitchener/manufacturing,2026-05-14
https://www.fsidigital.ca/grants/on/vaughan/restaurants-hospitality,2026-05-14
https://www.fsidigital.ca/grants/bc/kamloops/women-entrepreneurs,2026-05-14
https://www.fsidigital.ca/grants/on/windsor/agriculture,2026-05-14
https://www.fsidigital.ca/grants/on/burlington/clean-energy,2026-05-14
https://www.fsidigital.ca/grants/on/kitchener/construction,2026-05-14
https://www.fsidigital.ca/grants/on/richmond-hill/minority-owned,2026-05-14
https://www.fsidigital.ca/grants/on/barrie/manufacturing,2026-05-14
https://www.fsidigital.ca/grants/on/kitchener/arts-entertainment,2026-05-14
https://www.fsidigital.ca/grants/on/london/agriculture,2026-05-14
https://www.fsidigital.ca/grants/on/kitchener/non-profits,2026-05-14
https://www.fsidigital.ca/grants/on/london/restaurants-hospitality,2026-05-14
https://www.fsidigital.ca/grants/bc/coquitlam/non-profits,2026-05-14
https://www.fsidigital.ca/grants/bc/kelowna/education,2026-05-13
https://www.fsidigital.ca/grants/on/london/veterans,2026-05-13
https://www.fsidigital.ca/grants/ab/red-deer/non-profits,2026-05-13
https://www.fsidigital.ca/grants/on/markham/clean-energy,2026-05-13
https://www.fsidigital.ca/grants/on/greater-sudbury/construction,2026-05-13
https://www.fsidigital.ca/grants/on/markham/healthcare,2026-05-13
https://www.fsidigital.ca/grants/on/burlington/non-profits,2026-05-13
https://www.fsidigital.ca/grants/on/london/women-entrepreneurs,2026-05-13
https://www.fsidigital.ca/grants/on/kitchener/women-entrepreneurs,2026-05-13
https://www.fsidigital.ca/grants/on/burlington/education,2026-05-13
https://www.fsidigital.ca/grants/on/vaughan/education,2026-05-13
https://www.fsidigital.ca/grants/on/london/education,2026-05-13
https://www.fsidigital.ca/grants/on/cambridge/women-entrepreneurs,2026-05-13
https://www.fsidigital.ca/grants/on/oakville/technology,2026-05-13
https://www.fsidigital.ca/grants/on/oakville/restaurants-hospitality,2026-05-13
https://www.fsidigital.ca/grants/bc/coquitlam/construction,2026-05-13
https://www.fsidigital.ca/grants/bc/saanich/manufacturing,2026-05-13
https://www.fsidigital.ca/grants/bc/kamloops/agriculture,2026-05-13
https://www.fsidigital.ca/grants/qc/gatineau/retail,2026-05-13
https://www.fsidigital.ca/grants/qc/longueuil/healthcare,2026-05-13
https://www.fsidigital.ca/grants/ab/st-albert/minority-owned,2026-05-13
https://www.fsidigital.ca/grants/bc/saanich/technology,2026-05-13
https://www.fsidigital.ca/grants/bc/saanich/construction,2026-05-13
https://www.fsidigital.ca/grants/in/indianapolis/minority-owned,2026-05-12
https://www.fsidigital.ca/grants/on/kitchener/retail,2026-05-12
https://www.fsidigital.ca/grants/on/burlington/veterans,2026-05-12
https://www.fsidigital.ca/grants/on/windsor/veterans,2026-05-12
https://www.fsidigital.ca/grants/bc/saanich/healthcare,2026-05-12
https://www.fsidigital.ca/grants/bc/abbotsford/healthcare,2026-05-12
https://www.fsidigital.ca/grants/bc/kelowna/agriculture,2026-05-12
https://www.fsidigital.ca/grants/bc/kelowna/arts-entertainment,2026-05-12
https://www.fsidigital.ca/grants/bc/kelowna/construction,2026-05-12
https://www.fsidigital.ca/grants/bc/coquitlam/education,2026-05-12
https://www.fsidigital.ca/grants/ab/lethbridge/healthcare,2026-05-12
https://www.fsidigital.ca/grants/qc/longueuil/veterans,2026-05-12
https://www.fsidigital.ca/grants/ab/st-albert/construction,2026-05-11
https://www.fsidigital.ca/grants/ab/medicine-hat/technology,2026-05-11
https://www.fsidigital.ca/grants/bc/abbotsford/minority-owned,2026-05-11
https://www.fsidigital.ca/grants/oh/columbus/construction,2026-05-11
https://www.fsidigital.ca/grants/oh/columbus/logistics,2026-05-11
https://www.fsidigital.ca/grants/oh/columbus/retail,2026-05-11
https://www.fsidigital.ca/grants/qc/sherbrooke/manufacturing,2026-05-11
https://www.fsidigital.ca/grants/bc/nanaimo/healthcare,2026-05-11
https://www.fsidigital.ca/grants/on/guelph/healthcare,2026-05-11
https://www.fsidigital.ca/blog?category=Canada News&page=5,2026-05-11
https://www.fsidigital.ca/grants/bc/nanaimo/construction,2026-05-11
https://www.fsidigital.ca/grants/bc/saanich/arts-entertainment,2026-05-11
https://www.fsidigital.ca/grants/bc/saanich/education,2026-05-11
https://www.fsidigital.ca/grants/bc/saanich/agriculture,2026-05-11
https://www.fsidigital.ca/grants/bc/saanich/restaurants-hospitality,2026-05-11
https://www.fsidigital.ca/grants/ab/red-deer/veterans,2026-05-11
https://www.fsidigital.ca/grants/bc/coquitlam/manufacturing,2026-05-11
https://www.fsidigital.ca/grants/bc/saanich/non-profits,2026-05-11
https://www.fsidigital.ca/grants/on/cambridge/healthcare,2026-05-11
https://www.fsidigital.ca/grants/bc/coquitlam/agriculture,2026-05-11
https://www.fsidigital.ca/grants/on/markham/arts-entertainment,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/manufacturing,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/women-entrepreneurs,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/healthcare,2026-05-11
https://www.fsidigital.ca/grants/bc/kelowna/logistics,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/restaurants-hospitality,2026-05-11
https://www.fsidigital.ca/grants/on/kingston/manufacturing,2026-05-11
https://www.fsidigital.ca/grants/qc/longueuil/technology,2026-05-11
https://www.fsidigital.ca/grants/on/richmond-hill/restaurants-hospitality,2026-05-11
https://www.fsidigital.ca/grants/on/richmond-hill/veterans,2026-05-11
https://www.fsidigital.ca/grants/on/greater-sudbury/education,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/veterans,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/education,2026-05-11
https://www.fsidigital.ca/grants/qc/longueuil/clean-energy,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/clean-energy,2026-05-11
https://www.fsidigital.ca/grants/qc/gatineau/agriculture,2026-05-11
https://www.fsidigital.ca/grants/on/oshawa/healthcare,2026-05-11
https://www.fsidigital.ca/grants/on/kingston/healthcare,2026-05-11
https://www.fsidigital.ca/grants/ab/st-albert/veterans,2026-05-11
https://www.fsidigital.ca/grants/ab/lethbridge/non-profits,2026-05-11
https://www.fsidigital.ca/grants/ab/red-deer/agriculture,2026-05-11
https://www.fsidigital.ca/grants/on/kingston/clean-energy,2026-05-11
https://www.fsidigital.ca/grants/on/burlington/minority-owned,2026-05-10
https://www.fsidigital.ca/grants/bc/saanich/women-entrepreneurs,2026-05-10
https://www.fsidigital.ca/blog?category=Seasonal,2026-05-10
https://www.fsidigital.ca/blog?category=Demographic-Specific,2026-05-09
https://www.fsidigital.ca/grants/nl/st-johns/manufacturing,2026-05-09
https://www.fsidigital.ca/grants/on/kitchener/agriculture,2026-05-09
https://www.fsidigital.ca/grants/on/st-catharines/manufacturing,2026-05-09
https://www.fsidigital.ca/grants/bc/abbotsford/veterans,2026-05-09
https://www.fsidigital.ca/grants/ny/yonkers/minority-owned,2026-05-09
https://www.fsidigital.ca/grants/on/kingston/agriculture,2026-05-09
https://www.fsidigital.ca/grants/on/kingston/education,2026-05-09
https://www.fsidigital.ca/grants/on/guelph/technology,2026-05-09
https://www.fsidigital.ca/grants/on/guelph/veterans,2026-05-09
https://www.fsidigital.ca/grants/on/vaughan/clean-energy,2026-05-09
https://www.fsidigital.ca/grants/on/st-catharines/healthcare,2026-05-09
https://www.fsidigital.ca/grants/bc/nanaimo/restaurants-hospitality,2026-05-09
https://www.fsidigital.ca/grants/on/markham/construction,2026-05-09
https://www.fsidigital.ca/grants/on/london/minority-owned,2026-05-09
https://www.fsidigital.ca/grants/on/kitchener/logistics,2026-05-09
https://www.fsidigital.ca/grants/on/barrie/construction,2026-05-09
https://www.fsidigital.ca/grants/on/kitchener/education,2026-05-09
https://www.fsidigital.ca/grants/on/oshawa/technology,2026-05-09
https://www.fsidigital.ca/grants/on/barrie/clean-energy,2026-05-09
https://www.fsidigital.ca/grants/on/oakville/agriculture,2026-05-09
https://www.fsidigital.ca/grants/on/london/retail,2026-05-09
https://www.fsidigital.ca/grants/on/guelph/construction,2026-05-09
https://www.fsidigital.ca/grants/on/oshawa/women-entrepreneurs,2026-05-09
https://www.fsidigital.ca/grants/on/oshawa/restaurants-hospitality,2026-05-09
https://www.fsidigital.ca/grants/on/barrie/technology,2026-05-09
https://www.fsidigital.ca/grants/on/oshawa/veterans,2026-05-09
https://www.fsidigital.ca/grants/on/oshawa/minority-owned,2026-05-09
https://www.fsidigital.ca/grants/on/cambridge/clean-energy,2026-05-09
https://www.fsidigital.ca/grants/on/st-catharines/education,2026-05-09
https://www.fsidigital.ca/grants/on/vaughan/minority-owned,2026-05-09
https://www.fsidigital.ca/grants/on/burlington/restaurants-hospitality,2026-05-09
https://www.fsidigital.ca/grants/on/greater-sudbury/technology,2026-05-09
https://www.fsidigital.ca/grants/on/markham/education,2026-05-09
https://www.fsidigital.ca/grants/on/kitchener/technology,2026-05-09
https://www.fsidigital.ca/grants/on/st-catharines/restaurants-hospitality,2026-05-09
https://www.fsidigital.ca/grants/on/oakville/arts-entertainment,2026-05-09
https://www.fsidigital.ca/grants/on/greater-sudbury/non-profits,2026-05-09
https://www.fsidigital.ca/grants/on/kitchener/healthcare,2026-05-09
https://www.fsidigital.ca/grants/on/windsor/manufacturing,2026-05-09
https://www.fsidigital.ca/grants/bc/saanich/clean-energy,2026-05-09
https://www.fsidigital.ca/grants/ny/syracuse/restaurants-hospitality,2026-05-09
https://www.fsidigital.ca/grants/on/richmond-hill/arts-entertainment,2026-05-09
https://www.fsidigital.ca/grants/on/guelph/clean-energy,2026-05-09
https://www.fsidigital.ca/grants/on/barrie/healthcare,2026-05-09
https://www.fsidigital.ca/grants/qc/gatineau/minority-owned,2026-05-09
https://www.fsidigital.ca/grants/on/london/manufacturing,2026-05-09
https://www.fsidigital.ca/grants/on/st-catharines/retail,2026-05-08
https://www.fsidigital.ca/grants/on/kingston/retail,2026-05-08
https://www.fsidigital.ca/grants/on/burlington/construction,2026-05-08
https://www.fsidigital.ca/grants/on/london/technology,2026-05-08
https://www.fsidigital.ca/grants/qc/gatineau/non-profits,2026-05-08
https://www.fsidigital.ca/grants/on/greater-sudbury/veterans,2026-05-08
https://www.fsidigital.ca/grants/on/greater-sudbury/agriculture,2026-05-08
https://www.fsidigital.ca/grants/on/vaughan/veterans,2026-05-08
https://www.fsidigital.ca/grants/on/kingston/construction,2026-05-08
https://www.fsidigital.ca/grants/bc/abbotsford/clean-energy,2026-05-08
https://www.fsidigital.ca/grants/on/guelph/non-profits,2026-05-08
https://www.fsidigital.ca/grants/on/oshawa/manufacturing,2026-05-08
https://www.fsidigital.ca/grants/on/windsor/arts-entertainment,2026-05-08
https://www.fsidigital.ca/grants/on/st-catharines/minority-owned,2026-05-08
https://www.fsidigital.ca/grants/ab/medicine-hat/manufacturing,2026-05-08
https://www.fsidigital.ca/grants/bc/kamloops/healthcare,2026-05-08
https://www.fsidigital.ca/grants/bc/kamloops/non-profits,2026-05-08
https://www.fsidigital.ca/grants/on/greater-sudbury/women-entrepreneurs,2026-05-08
https://www.fsidigital.ca/grants/ab/lethbridge/construction,2026-05-08
https://www.fsidigital.ca/grants/ab/st-albert/restaurants-hospitality,2026-05-08
https://www.fsidigital.ca/grants/ab/st-albert/arts-entertainment,2026-05-08
https://www.fsidigital.ca/grants/ab/lethbridge/manufacturing,2026-05-08
https://www.fsidigital.ca/grants/bc/nanaimo/minority-owned,2026-05-08
https://www.fsidigital.ca/grants/ab/medicine-hat/clean-energy,2026-05-08
https://www.fsidigital.ca/grants/qc/trois-rivieres/veterans,2026-05-08
https://www.fsidigital.ca/grants/on/barrie/education,2026-05-08
https://www.fsidigital.ca/grants/on/richmond-hill/construction,2026-05-08
https://www.fsidigital.ca/grants/on/kingston/women-entrepreneurs,2026-05-08
https://www.fsidigital.ca/grants/on/markham/veterans,2026-05-08
https://www.fsidigital.ca/grants/on/burlington/manufacturing,2026-05-08
https://www.fsidigital.ca/grants/qc/levis/minority-owned,2026-05-08
https://www.fsidigital.ca/grants/ab/red-deer/restaurants-hospitality,2026-05-08
https://www.fsidigital.ca/grants/bc/nanaimo/technology,2026-05-07
https://www.fsidigital.ca/grants/on/oakville/veterans,2026-05-07
https://www.fsidigital.ca/grants/on/guelph/women-entrepreneurs,2026-05-07
https://www.fsidigital.ca/grants/on/richmond-hill/non-profits,2026-05-07
https://www.fsidigital.ca/grants/on/windsor/non-profits,2026-05-07
https://www.fsidigital.ca/grants/on/vaughan/arts-entertainment,2026-05-07
https://www.fsidigital.ca/grants/on/st-catharines/women-entrepreneurs,2026-05-07
https://www.fsidigital.ca/grants/ab/medicine-hat/logistics,2026-05-07
https://www.fsidigital.ca/grants/ab/lethbridge/arts-entertainment,2026-05-07
https://www.fsidigital.ca/grants/qc/longueuil/arts-entertainment,2026-05-07
https://www.fsidigital.ca/grants/on/oshawa/arts-entertainment,2026-05-07
https://www.fsidigital.ca/grants/nl/st-johns/agriculture,2026-05-07
https://www.fsidigital.ca/grants/ab/red-deer/technology,2026-05-07
https://www.fsidigital.ca/grants/on/oakville/healthcare,2026-05-06
https://www.fsidigital.ca/grants/ab/red-deer/manufacturing,2026-05-06
https://www.fsidigital.ca/grants/qc/trois-rivieres/non-profits,2026-05-06
https://www.fsidigital.ca/grants/qc/trois-rivieres/technology,2026-05-06
https://www.fsidigital.ca/grants/on/markham/restaurants-hospitality,2026-05-06
https://www.fsidigital.ca/grants/on/greater-sudbury/restaurants-hospitality,2026-05-06
https://www.fsidigital.ca/grants/on/oshawa/agriculture,2026-05-06
https://www.fsidigital.ca/grants/on/cambridge/retail,2026-05-06
https://www.fsidigital.ca/grants/on/markham/manufacturing,2026-05-06
https://www.fsidigital.ca/grants/on/vaughan/logistics,2026-05-06
https://www.fsidigital.ca/grants/on/markham/retail,2026-05-06
https://www.fsidigital.ca/grants/on/richmond-hill/healthcare,2026-05-06
https://www.fsidigital.ca/grants/on/windsor/technology,2026-05-06
https://www.fsidigital.ca/grants/on/windsor/women-entrepreneurs,2026-05-06
https://www.fsidigital.ca/grants/on/oakville/non-profits,2026-05-06
https://www.fsidigital.ca/grants/on/oakville/clean-energy,2026-05-06
https://www.fsidigital.ca/grants/on/cambridge/education,2026-05-06
https://www.fsidigital.ca/grants/on/kitchener/restaurants-hospitality,2026-05-06
https://www.fsidigital.ca/grants/on/oshawa/logistics,2026-05-06
https://www.fsidigital.ca/grants/on/kitchener/minority-owned,2026-05-06
https://www.fsidigital.ca/grants/on/richmond-hill/education,2026-05-06
https://www.fsidigital.ca/grants/on/london/clean-energy,2026-05-06
https://www.fsidigital.ca/grants/on/markham/logistics,2026-05-06
https://www.fsidigital.ca/grants/on/richmond-hill/agriculture,2026-05-06
https://www.fsidigital.ca/grants/on/markham/technology,2026-05-06
https://www.fsidigital.ca/grants/on/oakville/logistics,2026-05-06
https://www.fsidigital.ca/grants/on/oshawa/education,2026-05-06
https://www.fsidigital.ca/grants/qc/trois-rivieres/manufacturing,2026-05-05
https://www.fsidigital.ca/grants/on/burlington/healthcare,2026-05-05
https://www.fsidigital.ca/grants/qc/sherbrooke/construction,2026-05-05
https://www.fsidigital.ca/grants/on/guelph/retail,2026-05-05
https://www.fsidigital.ca/grants/qc/longueuil/logistics,2026-05-05
https://www.fsidigital.ca/grants/qc/trois-rivieres/minority-owned,2026-05-05
https://www.fsidigital.ca/grants/fl/tallahassee/clean-energy,2026-05-05
https://www.fsidigital.ca/grants/ab/red-deer/women-entrepreneurs,2026-05-04
https://www.fsidigital.ca/grants/qc/trois-rivieres/agriculture,2026-05-04
https://www.fsidigital.ca/grants/on/guelph/logistics,2026-05-04
https://www.fsidigital.ca/grants/on/cambridge/arts-entertainment,2026-05-04
https://www.fsidigital.ca/grants/on/oakville/education,2026-05-04
https://www.fsidigital.ca/grants/on/greater-sudbury/retail,2026-05-04
https://www.fsidigital.ca/grants/qc/trois-rivieres/healthcare,2026-05-04
https://www.fsidigital.ca/grants/qc/trois-rivieres/construction,2026-05-04
https://www.fsidigital.ca/grants/qc/sherbrooke/non-profits,2026-05-04
https://www.fsidigital.ca/grants/on/oakville/retail,2026-05-04
https://www.fsidigital.ca/grants/on/richmond-hill/logistics,2026-05-04
https://www.fsidigital.ca/grants/on/vaughan/logistics,2026-05-04
https://www.fsidigital.ca/grants/on/vaughan/women-entrepreneurs,2026-05-04
https://www.fsidigital.ca/grants/on/oshawa/retail,2026-05-04
https://www.fsidigital.ca/grants/on/vaughan/manufacturing,2026-05-04
https://www.fsidigital.ca/grants/ab/red-deer/construction,2026-05-04
https://www.fsidigital.ca/blog?category=Canada News&page=3,2026-05-04
https://www.fsidigital.ca/grants/ab/red-deer/education,2026-05-04
https://www.fsidigital.ca/grants/ab/red-deer/logistics,2026-05-03
https://www.fsidigital.ca/grants/ab/lethbridge/retail,2026-05-03
https://www.fsidigital.ca/grants/ab/lethbridge/veterans,2026-05-03
https://www.fsidigital.ca/grants/qc/trois-rivieres/women-entrepreneurs,2026-05-03
https://www.fsidigital.ca/grants/qc/levis/retail,2026-05-03
https://www.fsidigital.ca/grants/fl/st-petersburg/technology,2026-05-03
https://www.fsidigital.ca/grants/qc/trois-rivieres/restaurants-hospitality,2026-05-02
https://www.fsidigital.ca/grants/bc/coquitlam/clean-energy,2026-05-02
https://www.fsidigital.ca/grants/on/st-catharines/construction,2026-05-02
https://www.fsidigital.ca/grants/on/burlington/arts-entertainment,2026-05-02
https://www.fsidigital.ca/grants/bc/saanich/minority-owned,2026-05-02
https://www.fsidigital.ca/grants/on/oakville/construction,2026-05-02
https://www.fsidigital.ca/grants/on/windsor/construction,2026-05-02
https://www.fsidigital.ca/grants/on/kitchener/clean-energy,2026-05-02
https://www.fsidigital.ca/grants/bc/kamloops/retail,2026-05-02
https://www.fsidigital.ca/grants/on/barrie/women-entrepreneurs,2026-05-02
https://www.fsidigital.ca/grants/on/markham/minority-owned,2026-05-02
https://www.fsidigital.ca/grants/on/oshawa/non-profits,2026-05-02
https://www.fsidigital.ca/grants/bc/kamloops/logistics,2026-05-01
https://www.fsidigital.ca/grants/bc/nanaimo/women-entrepreneurs,2026-05-01
https://www.fsidigital.ca/grants/bc/nanaimo/agriculture,2026-05-01
https://www.fsidigital.ca/grants/bc/nanaimo/retail,2026-05-01
https://www.fsidigital.ca/grants/bc/nanaimo/clean-energy,2026-05-01
https://www.fsidigital.ca/grants/bc/kelowna/non-profits,2026-05-01
https://www.fsidigital.ca/grants/fl/jacksonville/technology,2026-04-30
https://www.fsidigital.ca/grants/bc/abbotsford/arts-entertainment,2026-04-30
https://www.fsidigital.ca/grants/on/windsor/restaurants-hospitality,2026-04-30
https://www.fsidigital.ca/grants/on/barrie/retail,2026-04-30
https://www.fsidigital.ca/grants/bc/abbotsford/construction,2026-04-30
https://www.fsidigital.ca/grants/bc/coquitlam/restaurants-hospitality,2026-04-30
https://www.fsidigital.ca/blog?category=USA News,2026-04-30
https://www.fsidigital.ca/grants/bc/abbotsford/logistics,2026-04-30
https://www.fsidigital.ca/grants/on/oakville/manufacturing,2026-04-30
https://www.fsidigital.ca/grants/on/richmond-hill/manufacturing,2026-04-30
https://www.fsidigital.ca/grants/on/london/logistics,2026-04-30
https://www.fsidigital.ca/grants/on/greater-sudbury/manufacturing,2026-04-30
https://www.fsidigital.ca/grants/on/london/non-profits,2026-04-30
https://www.fsidigital.ca/grants/on/greater-sudbury/logistics,2026-04-30
https://www.fsidigital.ca/grants/on/windsor/education,2026-04-30
https://www.fsidigital.ca/grants/on/richmond-hill/women-entrepreneurs,2026-04-30
https://www.fsidigital.ca/grants/on/vaughan/healthcare,2026-04-30
https://www.fsidigital.ca/grants/on/markham/women-entrepreneurs,2026-04-30
https://www.fsidigital.ca/grants/on/burlington/technology,2026-04-30
https://www.fsidigital.ca/grants/on/greater-sudbury/healthcare,2026-04-30
https://www.fsidigital.ca/grants/qc/longueuil/restaurants-hospitality,2026-04-30
https://www.fsidigital.ca/grants/qc/sherbrooke/clean-energy,2026-04-30
https://www.fsidigital.ca/grants/on/windsor/minority-owned,2026-04-30
https://www.fsidigital.ca/grants/on/burlington/retail,2026-04-30
https://www.fsidigital.ca/grants/on/vaughan/retail,2026-04-29
https://www.fsidigital.ca/grants/on/markham/non-profits,2026-04-29
https://www.fsidigital.ca/grants/bc/nanaimo/logistics,2026-04-29
https://www.fsidigital.ca/blog?category=USA News&page=4,2026-04-29
https://www.fsidigital.ca/grants/on/richmond-hill/technology,2026-04-29
https://www.fsidigital.ca/grants/bc/saanich/retail,2026-04-29
https://www.fsidigital.ca/grants/bc/kamloops/technology,2026-04-29
https://www.fsidigital.ca/grants/bc/nanaimo/arts-entertainment,2026-04-29
https://www.fsidigital.ca/grants/on/london/healthcare,2026-04-29
https://www.fsidigital.ca/grants/bc/abbotsford/women-entrepreneurs,2026-04-28
https://www.fsidigital.ca/grants/bc/abbotsford/retail,2026-04-28
https://www.fsidigital.ca/grants/bc/abbotsford/technology,2026-04-28
https://www.fsidigital.ca/grants/bc/kelowna/retail,2026-04-28
https://www.fsidigital.ca/grants/bc/abbotsford/agriculture,2026-04-28
https://www.fsidigital.ca/grants/bc/coquitlam/logistics,2026-04-28
https://www.fsidigital.ca/blog?page=16,2026-04-28
https://www.fsidigital.ca/grants/on/kingston/logistics,2026-04-28
https://www.fsidigital.ca/grants/bc/coquitlam/healthcare,2026-04-28
https://www.fsidigital.ca/grants/on/guelph/manufacturing,2026-04-28
https://www.fsidigital.ca/grants/bc/kelowna/clean-energy,2026-04-28
https://www.fsidigital.ca/grants/bc/kamloops/arts-entertainment,2026-04-28
https://www.fsidigital.ca/grants/bc/kamloops/education,2026-04-28
https://www.fsidigital.ca/grants/tx/arlington/retail,2026-04-27
https://www.fsidigital.ca/grants/on/oakville/minority-owned,2026-04-27
https://www.fsidigital.ca/grants/on/st-catharines/arts-entertainment,2026-04-26
https://www.fsidigital.ca/grants/bc/kelowna/technology,2026-04-26
https://www.fsidigital.ca/grants/on/st-catharines/veterans,2026-04-26
https://www.fsidigital.ca/grants/on/cambridge/technology,2026-04-26
https://www.fsidigital.ca/grants/on/kingston/technology,2026-04-26
https://www.fsidigital.ca/grants/on/cambridge/construction,2026-04-26
https://www.fsidigital.ca/grants/on/kingston/restaurants-hospitality,2026-04-26
https://www.fsidigital.ca/grants/on/st-catharines/agriculture,2026-04-26
https://www.fsidigital.ca/grants/on/cambridge/veterans,2026-04-26
https://www.fsidigital.ca/grants/on/st-catharines/clean-energy,2026-04-26
https://www.fsidigital.ca/grants/on/kingston/non-profits,2026-04-26
https://www.fsidigital.ca/grants/on/st-catharines/logistics,2026-04-26
https://www.fsidigital.ca/grants/on/st-catharines/non-profits,2026-04-26
https://www.fsidigital.ca/grants/on/st-catharines/technology,2026-04-26
https://www.fsidigital.ca/usa/sbir-sttr-grants-guide,2026-04-26
https://www.fsidigital.ca/grants/bc/kamloops/construction,2026-04-26
https://www.fsidigital.ca/grants/on/london/arts-entertainment,2026-04-26
https://www.fsidigital.ca/grants/on/oakville/women-entrepreneurs,2026-04-26
https://www.fsidigital.ca/blog/ontario-business-grants-guide,2026-04-26
https://www.fsidigital.ca/blog/bc-business-grants-guide,2026-04-26
https://www.fsidigital.ca/blog/strategic-innovation-fund,2026-04-26
https://www.fsidigital.ca/blog?category=Funding Alerts,2026-04-26
https://www.fsidigital.ca/grants/on/richmond-hill/retail,2026-04-25
https://www.fsidigital.ca/blog/startup-grants-canada-guide,2026-04-25
https://www.fsidigital.ca/blog/indigenous-women-business-grants,2026-04-25
https://www.fsidigital.ca/grants/on/guelph/restaurants-hospitality,2026-04-24
https://www.fsidigital.ca/usa/quebec,2026-04-24
https://www.fsidigital.ca/blog/canada-federal-grants-guide,2026-04-24
https://www.fsidigital.ca/blog/black-women-business-grants,2026-04-24
https://www.fsidigital.ca/expert-insights?category=Tips ,2026-04-24
https://www.fsidigital.ca/expert-insights?category=Canada News,2026-04-24
https://www.fsidigital.ca/grants/qc/trois-rivieres/arts-entertainment,2026-04-24
https://www.fsidigital.ca/blog/alberta-business-grants-guide,2026-04-24
https://www.fsidigital.ca/grants/ca/bakersfield/logistics,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/agriculture,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/arts-entertainment,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/education,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/non-profits,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/technology,2026-04-23
https://www.fsidigital.ca/grants/ca/bakersfield/education,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/clean-energy,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/healthcare,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/manufacturing,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/veterans,2026-04-23
https://www.fsidigital.ca/blog/indigenous-business-grants-canada,2026-04-23
https://www.fsidigital.ca/grants/ca/anaheim/restaurants-hospitality,2026-04-23
https://www.fsidigital.ca/grants/on/oshawa/construction,2026-04-22
https://www.fsidigital.ca/grants/on/burlington/women-entrepreneurs,2026-04-22
https://www.fsidigital.ca/grants/on/windsor/healthcare,2026-04-22
https://www.fsidigital.ca/grants/on/barrie/minority-owned,2026-04-22
https://www.fsidigital.ca/grants/on/markham/agriculture,2026-04-22
https://www.fsidigital.ca/grants/on/burlington/agriculture,2026-04-22
https://www.fsidigital.ca/grants/on/london/construction,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/manufacturing,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/non-profits,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/veterans,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/retail,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/agriculture,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/technology,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/women-entrepreneurs,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/construction,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/education,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/logistics,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/minority-owned,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/restaurants-hospitality,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/restaurants-hospitality,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/retail,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/veterans,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/women-entrepreneurs,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/healthcare,2026-04-22
https://www.fsidigital.ca/grants/ca/oakland/arts-entertainment,2026-04-22
https://www.fsidigital.ca/grants/ca/bakersfield/clean-energy,2026-04-22
https://www.fsidigital.ca/grants/ca/long-beach/veterans,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/women-entrepreneurs,2026-04-20
https://www.fsidigital.ca/grants/ca/oakland/clean-energy,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/agriculture,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/non-profits,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/retail,2026-04-20
https://www.fsidigital.ca/grants/ca/oakland/agriculture,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/construction,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/manufacturing,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/education,2026-04-20
https://www.fsidigital.ca/grants/ca/oakland/manufacturing,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/arts-entertainment,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/restaurants-hospitality,2026-04-20
https://www.fsidigital.ca/grants/ca/oakland/technology,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/technology,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/logistics,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/clean-energy,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/healthcare,2026-04-20
https://www.fsidigital.ca/grants/ca/long-beach/minority-owned,2026-04-20
https://www.fsidigital.ca/grants/on/richmond-hill/clean-energy,2026-04-20
https://www.fsidigital.ca/grants/on/barrie/veterans,2026-04-20
https://www.fsidigital.ca/grants/ca/sacramento/clean-energy,2026-04-20
https://www.fsidigital.ca/grants/ca/sacramento/technology,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/logistics,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/women-entrepreneurs,2026-04-19
https://www.fsidigital.ca/grants/ca/fresno/education,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/construction,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/agriculture,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/non-profits,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/education,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/manufacturing,2026-04-19
https://www.fsidigital.ca/grants/ca/fresno/minority-owned,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/veterans,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/restaurants-hospitality,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/retail,2026-04-19
https://www.fsidigital.ca/grants/ca/fresno/logistics,2026-04-19
https://www.fsidigital.ca/grants/ca/fresno/construction,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/healthcare,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/minority-owned,2026-04-19
https://www.fsidigital.ca/grants/ca/fresno/arts-entertainment,2026-04-19
https://www.fsidigital.ca/grants/ca/sacramento/arts-entertainment,2026-04-19
https://www.fsidigital.ca/grants/ca/fresno/technology,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/restaurants-hospitality,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/agriculture,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/healthcare,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/manufacturing,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/clean-energy,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/veterans,2026-04-18
https://www.fsidigital.ca/grants/ca/fresno/retail,2026-04-18
https://www.fsidigital.ca/blog?page=12,2026-04-18
https://www.fsidigital.ca/grants/on/guelph/arts-entertainment,2026-04-18
https://www.fsidigital.ca/grants/pe/charlottetown/non-profits,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/veterans,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/education,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/logistics,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/restaurants-hospitality,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/retail,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/construction,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/minority-owned,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/arts-entertainment,2026-04-15
https://www.fsidigital.ca/grants/pe/charlottetown/women-entrepreneurs,2026-04-15
https://www.fsidigital.ca/blog?category=USA News&page=1,2026-04-15
https://www.fsidigital.ca/expert-insights?category=Seasonal,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/arts-entertainment,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/education,2026-04-14
https://www.fsidigital.ca/grants/pe/charlottetown/clean-energy,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/retail,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/agriculture,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/construction,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/minority-owned,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/restaurants-hospitality,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/women-entrepreneurs,2026-04-14
https://www.fsidigital.ca/grants/pe/charlottetown/manufacturing,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/manufacturing,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/non-profits,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/technology,2026-04-14
https://www.fsidigital.ca/grants/pe/charlottetown/healthcare,2026-04-14
https://www.fsidigital.ca/grants/pe/charlottetown/agriculture,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/veterans,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/healthcare,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/clean-energy,2026-04-14
https://www.fsidigital.ca/grants/pe/charlottetown/technology,2026-04-14
https://www.fsidigital.ca/grants/nb/fredericton/logistics,2026-04-14
https://www.fsidigital.ca/grants/on/greater-sudbury/clean-energy,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/construction,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/manufacturing,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/minority-owned,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/education,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/construction,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/restaurants-hospitality,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/retail,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/arts-entertainment,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/healthcare,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/technology,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/healthcare,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/clean-energy,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/veterans,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/women-entrepreneurs,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/restaurants-hospitality,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/logistics,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/clean-energy,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/arts-entertainment,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/non-profits,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/restaurants-hospitality,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/retail,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/retail,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/arts-entertainment,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/education,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/veterans,2026-04-13
https://www.fsidigital.ca/grants/nb/saint-john/non-profits,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/education,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/non-profits,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/veterans,2026-04-13
https://www.fsidigital.ca/grants/nl/st-johns/women-entrepreneurs,2026-04-13
https://www.fsidigital.ca/grants/bc/nanaimo/non-profits,2026-04-13
https://www.fsidigital.ca/grants/nb/moncton/technology,2026-04-12
https://www.fsidigital.ca/grants/nl/st-johns/minority-owned,2026-04-12
https://www.fsidigital.ca/grants/nb/saint-john/construction,2026-04-12
https://www.fsidigital.ca/grants/nb/moncton/logistics,2026-04-12
https://www.fsidigital.ca/grants/nb/moncton/agriculture,2026-04-12
https://www.fsidigital.ca/grants/nb/saint-john/women-entrepreneurs,2026-04-12
https://www.fsidigital.ca/grants/nb/saint-john/logistics,2026-04-12
https://www.fsidigital.ca/usa/canada,2026-04-11
https://www.fsidigital.ca/blog/bc-business-grants-2025,2026-04-11
https://www.fsidigital.ca/blog/ontario-business-grants-2025,2026-04-09
https://www.fsidigital.ca/blog/clean-tech-grants-2026,2026-04-01
https://www.fsidigital.ca/blog/regional-development-agencies-funding,2026-03-27
https://www.fsidigital.ca/usa/california/sacramento,2026-03-20
https://www.fsidigital.ca/usa/alberta,2026-03-20
https://www.fsidigital.ca/usa/ontario,2026-03-19
https://www.fsidigital.ca/usa/minority-owned-business-grants,2026-03-19
https://www.fsidigital.ca/blog/irap-nrc-canada-guide,2026-03-19
https://www.fsidigital.ca/usa/sba-loans,2026-03-19
https://www.fsidigital.ca/blog/top-10-no-equity-grants-black-female-entrepreneurs-2026,2026-03-19
https://www.fsidigital.ca/blog/sustainable-development-technology-canada-guide,2026-03-16
https://www.fsidigital.ca/blog/agriculture-agri-food-canada-grants,2026-03-12
https://www.fsidigital.ca/blog/canadian-government-grants-tech-startups,2026-03-05
https://www.fsidigital.ca/blog/biden-2-5b-grants-2025,2026-03-02
https://www.fsidigital.ca/blog/agricultural-grants-canada,2026-03-02
https://www.fsidigital.ca/blog/sred-tax-credits-guide,2026-03-01
https://www.fsidigital.ca/blog/canada-aerospace--defence-innovation-grants,2026-03-01
https://www.fsidigital.ca/blog/energy-efficiency-grants-canada,2026-02-28
https://www.fsidigital.ca/blog/texas-tech-programs,2026-02-28
https://www.fsidigital.ca/guides/apply-women-entrepreneurship-strateg,2026-02-28
https://www.fsidigital.ca/blog/small-business-grants-ontario,2026-02-27
https://www.fsidigital.ca/blog/quebec-business-grants-loans-guide,2026-02-26
https://www.fsidigital.ca/blog/women-business-grants-canada,2026-02-26
https://www.fsidigital.ca/blog/canada-digital--ai-innovation-grants,2026-02-26
https://www.fsidigital.ca/guides/canada-innovation-rd-funding-guide,2026-02-26
https://www.fsidigital.ca/guides/sbir-sttr-complete-guide,2026-02-26
https://www.fsidigital.ca/blog/health-tech-grants,2026-02-26
https://www.fsidigital.ca/blog/cdap-guide,2026-02-26
https://www.fsidigital.ca/blog/manufacturing-grants,2026-02-26
https://www.fsidigital.ca/blog/ocean-tech-grants,2026-02-26
https://www.fsidigital.ca/blog/rural-funding-guide,2026-02-26
https://www.fsidigital.ca/blog/texas-business-incentives,2026-02-26
https://www.fsidigital.ca/blog/futurpreneur-loans-mentorship,2026-02-26
https://www.fsidigital.ca/blog/sred-guide,2026-02-26
https://www.fsidigital.ca/blog/canexport-guide,2026-02-25
https://www.fsidigital.ca/blog/canadian-small-business-funding-guide,2026-02-25
https://www.fsidigital.ca/blog/women-minority-business-grants-guide,2026-02-25
https://www.fsidigital.ca/blog/startup-business-grants-canada-guide,2026-02-25
https://www.fsidigital.ca/guides/apply-aafc-grants,2026-02-24
https://www.fsidigital.ca/blog/cybersecurity-startup-grants,2026-02-23
https://www.fsidigital.ca/blog/small-business-financing-2025,2026-02-22
https://www.fsidigital.ca/blog/canada-regional-development-2025,2026-02-21
https://www.fsidigital.ca/blog/quebec-business-grants-2025,2026-02-21
https://www.fsidigital.ca/blog/indigenous-business-development-2025,2026-02-21
https://www.fsidigital.ca/blog/october-2025-last-chance,2026-02-19
https://www.fsidigital.ca/editorial-policy,2026-01-12
`;

const RAW_USER_DATA_2 = `
https://www.fsidigital.ca/(mca)/alberta-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/apply,1970-01-01
https://www.fsidigital.ca/(mca)/auto-repair-financing,1970-01-01
https://www.fsidigital.ca/(mca)/british-columbia-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/business-cash-advance-canada,1970-01-01
https://www.fsidigital.ca/(mca)/business-loan-alternatives,1970-01-01
https://www.fsidigital.ca/(mca)/construction-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/fast-business-funding-canada,1970-01-01
https://www.fsidigital.ca/(mca)/funding-calculator,1970-01-01
https://www.fsidigital.ca/(mca)/funding-eligibility-guide,1970-01-01
https://www.fsidigital.ca/(mca)/healthcare-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/how-merchant-cash-advance-works,1970-01-01
https://www.fsidigital.ca/(mca)/manufacturing-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/merchant-cash-advance-canada,1970-01-01
https://www.fsidigital.ca/(mca)/merchant-cash-advance-rates,1970-01-01
https://www.fsidigital.ca/(mca)/merchant-cash-advance-vs-business-loan,1970-01-01
https://www.fsidigital.ca/(mca)/ontario-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/priority-processing,1970-01-01
https://www.fsidigital.ca/(mca)/quebec-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/resources/business-credit-score-guide,1970-01-01
https://www.fsidigital.ca/(mca)/resources/business-funding-checklist,1970-01-01
https://www.fsidigital.ca/(mca)/resources/cash-flow-forecasting,1970-01-01
https://www.fsidigital.ca/(mca)/resources/common-funding-mistakes,1970-01-01
https://www.fsidigital.ca/(mca)/resources/how-to-improve-business-cash-flow,1970-01-01
https://www.fsidigital.ca/(mca)/resources/understanding-factor-rates,1970-01-01
https://www.fsidigital.ca/(mca)/same-day-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/transportation-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/trucking-business-funding,1970-01-01
https://www.fsidigital.ca/(mca)/why-businesses-get-declined,1970-01-01
https://www.fsidigital.ca/(mca)/working-capital-canada,1970-01-01
https://www.fsidigital.ca/(mca)/working-capital-guide,1970-01-01
https://www.fsidigital.ca/admin/exceptions,1970-01-01
https://www.fsidigital.ca/alberta-business-funding,1970-01-01
https://www.fsidigital.ca/auto-repair-financing,1970-01-01
https://www.fsidigital.ca/blog/technology-startup-grants-2025,1970-01-01
https://www.fsidigital.ca/british-columbia-business-funding,1970-01-01
https://www.fsidigital.ca/business-cash-advance-canada,1970-01-01
https://www.fsidigital.ca/business-loan-alternatives,1970-01-01
https://www.fsidigital.ca/compare/grant-vs-angel-investment,1970-01-01
https://www.fsidigital.ca/compare/grant-vs-government-loan,1970-01-01
https://www.fsidigital.ca/compare/grant-vs-venture-capital,1970-01-01
https://www.fsidigital.ca/compare/small-business-grant-vs-sba-loan,1970-01-01
https://www.fsidigital.ca/construction-business-funding,1970-01-01
https://www.fsidigital.ca/download/washington-tech-guide,1970-01-01
https://www.fsidigital.ca/expert-insights?category=USA News,1970-01-01
https://www.fsidigital.ca/fast-business-funding-canada,1970-01-01
https://www.fsidigital.ca/funding-calculator,1970-01-01
https://www.fsidigital.ca/funding-eligibility-guide,1970-01-01
https://www.fsidigital.ca/get-started,1970-01-01
https://www.fsidigital.ca/grants/ab/fort-mcmurray/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ab/leduc/construction,1970-01-01
https://www.fsidigital.ca/grants/ab/leduc/logistics,1970-01-01
https://www.fsidigital.ca/grants/ab/lethbridge/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ab/st-albert/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ak/anchorage/logistics,1970-01-01
https://www.fsidigital.ca/grants/ak/fairbanks,1970-01-01
https://www.fsidigital.ca/grants/ak/fairbanks/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ak/fairbanks/retail,1970-01-01
https://www.fsidigital.ca/grants/ak/fairbanks/technology,1970-01-01
https://www.fsidigital.ca/grants/ak/fairbanks/veterans,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/construction,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/education,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ak/juneau/retail,1970-01-01
https://www.fsidigital.ca/grants/al,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/agriculture,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/healthcare,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/logistics,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/retail,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/technology,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/veterans,1970-01-01
https://www.fsidigital.ca/grants/al/birmingham/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/agriculture,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/education,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/retail,1970-01-01
https://www.fsidigital.ca/grants/al/huntsville/technology,1970-01-01
https://www.fsidigital.ca/grants/al/mobile,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/agriculture,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/healthcare,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/technology,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/veterans,1970-01-01
https://www.fsidigital.ca/grants/al/mobile/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ar,1970-01-01
https://www.fsidigital.ca/grants/ar/bentonville/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ar/osceola-jonesboro/education,1970-01-01
https://www.fsidigital.ca/grants/ar/osceola-jonesboro/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ar/osceola-jonesboro/logistics,1970-01-01
https://www.fsidigital.ca/grants/ar/osceola-jonesboro/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ar/osceola-jonesboro/veterans,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/construction,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/education,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/healthcare,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/logistics,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/non-profits,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/retail,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/veterans,1970-01-01
https://www.fsidigital.ca/grants/az/chandler-tempe/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/az/glendale-az/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/az/glendale-az/veterans,1970-01-01
https://www.fsidigital.ca/grants/az/peoria-az/healthcare,1970-01-01
https://www.fsidigital.ca/grants/bc/coquitlam/technology,1970-01-01
https://www.fsidigital.ca/grants/bc/delta/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/bc/kamloops/veterans,1970-01-01
https://www.fsidigital.ca/grants/bc/new-westminster/healthcare,1970-01-01
https://www.fsidigital.ca/grants/bc/new-westminster/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/bc/port-coquitlam/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/bc/port-coquitlam/veterans,1970-01-01
https://www.fsidigital.ca/grants/bc/prince-george/education,1970-01-01
https://www.fsidigital.ca/grants/bc/prince-george/technology,1970-01-01
https://www.fsidigital.ca/grants/ca/bakersfield/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ca/berkeley/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/berkeley/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/berkeley/technology,1970-01-01
https://www.fsidigital.ca/grants/ca/concord/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/concord/retail,1970-01-01
https://www.fsidigital.ca/grants/ca/concord/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ca/downey/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ca/downey/veterans,1970-01-01
https://www.fsidigital.ca/grants/ca/el-monte/veterans,1970-01-01
https://www.fsidigital.ca/grants/ca/escondido/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/escondido/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ca/fullerton/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/fullerton/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ca/garden-grove/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/garden-grove/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ca/garden-grove/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/garden-grove/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ca/garden-grove/technology,1970-01-01
https://www.fsidigital.ca/grants/ca/huntington-beach/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/huntington-beach/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ca/inglewood/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ca/lancaster/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/lancaster/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ca/modesto/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/norwalk/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/oceanside/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/oceanside/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ca/oceanside/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ca/oceanside/retail,1970-01-01
https://www.fsidigital.ca/grants/ca/ontario-ca/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ca/orange/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/orange/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/orange/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ca/oxnard/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ca/palmdale/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/pasadena-ca/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/pasadena-ca/education,1970-01-01
https://www.fsidigital.ca/grants/ca/pomona/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/pomona/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ca/pomona/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ca/pomona/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ca/pomona/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ca/roseville/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/roseville/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ca/roseville/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ca/salinas/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/salinas/technology,1970-01-01
https://www.fsidigital.ca/grants/ca/salinas/veterans,1970-01-01
https://www.fsidigital.ca/grants/ca/san-bernardino/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/san-bernardino/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/santa-clara/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ca/santa-clara/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/santa-rosa/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ca/santa-rosa/retail,1970-01-01
https://www.fsidigital.ca/grants/ca/simi-valley,1970-01-01
https://www.fsidigital.ca/grants/ca/simi-valley/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/simi-valley/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/stockton/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ca/sunnyvale/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/thousand-oaks/construction,1970-01-01
https://www.fsidigital.ca/grants/ca/thousand-oaks/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/thousand-oaks/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ca/thousand-oaks/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ca/thousand-oaks/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ca/torrance/education,1970-01-01
https://www.fsidigital.ca/grants/ca/torrance/logistics,1970-01-01
https://www.fsidigital.ca/grants/ca/torrance/retail,1970-01-01
https://www.fsidigital.ca/grants/ca/vallejo/retail,1970-01-01
https://www.fsidigital.ca/grants/ca/vallejo/technology,1970-01-01
https://www.fsidigital.ca/grants/ca/victorville/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ca/victorville/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ca/visalia/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ca/visalia/retail,1970-01-01
https://www.fsidigital.ca/grants/ca/visalia/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ca/west-covina/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ca/west-covina/logistics,1970-01-01
https://www.fsidigital.ca/grants/co/arvada/veterans,1970-01-01
https://www.fsidigital.ca/grants/co/arvada/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/co/aurora-co/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/co/aurora-co/technology,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/agriculture,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/construction,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/education,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/healthcare,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/logistics,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/non-profits,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/retail,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/technology,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/veterans,1970-01-01
https://www.fsidigital.ca/grants/co/boulder/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/co/fort-collins/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/co/pueblo/construction,1970-01-01
https://www.fsidigital.ca/grants/co/pueblo/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/co/thornton/education,1970-01-01
https://www.fsidigital.ca/grants/co/thornton/technology,1970-01-01
https://www.fsidigital.ca/grants/co/westminster/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/co/westminster/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/construction,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/education,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/logistics,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/retail,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/technology,1970-01-01
https://www.fsidigital.ca/grants/ct/groton-new-london/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/logistics,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/retail,1970-01-01
https://www.fsidigital.ca/grants/ct/hartford/veterans,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/construction,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/education,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/veterans,1970-01-01
https://www.fsidigital.ca/grants/ct/new-haven/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/dc/washington-dc/education,1970-01-01
https://www.fsidigital.ca/grants/dc/washington-dc/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/dc/washington-dc/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/de/dover,1970-01-01
https://www.fsidigital.ca/grants/de/dover/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/de/dover/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/de/dover/construction,1970-01-01
https://www.fsidigital.ca/grants/de/dover/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/de/dover/non-profits,1970-01-01
https://www.fsidigital.ca/grants/de/dover/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/de/dover/retail,1970-01-01
https://www.fsidigital.ca/grants/de/dover/veterans,1970-01-01
https://www.fsidigital.ca/grants/de/dover/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/de/newark,1970-01-01
https://www.fsidigital.ca/grants/de/newark/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/de/newark/construction,1970-01-01
https://www.fsidigital.ca/grants/de/newark/education,1970-01-01
https://www.fsidigital.ca/grants/de/newark/healthcare,1970-01-01
https://www.fsidigital.ca/grants/de/newark/logistics,1970-01-01
https://www.fsidigital.ca/grants/de/newark/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/de/newark/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/de/newark/non-profits,1970-01-01
https://www.fsidigital.ca/grants/de/newark/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/de/newark/retail,1970-01-01
https://www.fsidigital.ca/grants/de/newark/technology,1970-01-01
https://www.fsidigital.ca/grants/de/newark/veterans,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington/agriculture,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington/education,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington/logistics,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington/veterans,1970-01-01
https://www.fsidigital.ca/grants/de/wilmington/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/fl/brandon-fl/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/fl/brandon-fl/retail,1970-01-01
https://www.fsidigital.ca/grants/fl/clearwater/construction,1970-01-01
https://www.fsidigital.ca/grants/fl/clearwater/veterans,1970-01-01
https://www.fsidigital.ca/grants/fl/coral-springs/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/fl/coral-springs/logistics,1970-01-01
https://www.fsidigital.ca/grants/fl/coral-springs/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/fl/coral-springs/retail,1970-01-01
https://www.fsidigital.ca/grants/fl/hollywood/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/fl/hollywood/education,1970-01-01
https://www.fsidigital.ca/grants/fl/lehigh-acres/logistics,1970-01-01
https://www.fsidigital.ca/grants/fl/miami/agriculture,1970-01-01
https://www.fsidigital.ca/grants/fl/miami/education,1970-01-01
https://www.fsidigital.ca/grants/fl/miami/logistics,1970-01-01
https://www.fsidigital.ca/grants/fl/miami/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/fl/miami/non-profits,1970-01-01
https://www.fsidigital.ca/grants/fl/miami/technology,1970-01-01
https://www.fsidigital.ca/grants/fl/pembroke-pines/construction,1970-01-01
https://www.fsidigital.ca/grants/fl/st-petersburg/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/fl/west-palm-beach/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ga/augusta/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ga/columbus-ga/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ga/columbus-ga/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ga/savannah/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/hi/kahului/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/hi/kahului/logistics,1970-01-01
https://www.fsidigital.ca/grants/hi/kahului/non-profits,1970-01-01
https://www.fsidigital.ca/grants/hi/kahului/retail,1970-01-01
https://www.fsidigital.ca/grants/hi/kahului/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/hi/kailua-kona/education,1970-01-01
https://www.fsidigital.ca/grants/hi/kailua-kona/logistics,1970-01-01
https://www.fsidigital.ca/grants/hi/kailua-kona/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/hi/kailua-kona/non-profits,1970-01-01
https://www.fsidigital.ca/grants/hi/kailua-kona/retail,1970-01-01
https://www.fsidigital.ca/grants/hi/kailua-kona/technology,1970-01-01
https://www.fsidigital.ca/grants/ia/ames,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/construction,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/logistics,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/retail,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/technology,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/veterans,1970-01-01
https://www.fsidigital.ca/grants/ia/ames/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/construction,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/technology,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/veterans,1970-01-01
https://www.fsidigital.ca/grants/ia/cedar-rapids/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ia/des-moines/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ia/des-moines/retail,1970-01-01
https://www.fsidigital.ca/grants/id/twin-falls/veterans,1970-01-01
https://www.fsidigital.ca/grants/il/aurora-il/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/il/aurora-il/non-profits,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/agriculture,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/education,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/logistics,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/non-profits,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/technology,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/veterans,1970-01-01
https://www.fsidigital.ca/grants/il/champaign-urbana/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/il/elgin/veterans,1970-01-01
https://www.fsidigital.ca/grants/il/joliet/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/il/naperville/non-profits,1970-01-01
https://www.fsidigital.ca/grants/il/peoria/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/il/peoria/education,1970-01-01
https://www.fsidigital.ca/grants/il/peoria/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/il/peoria/non-profits,1970-01-01
https://www.fsidigital.ca/grants/il/peoria/technology,1970-01-01
https://www.fsidigital.ca/grants/il/peoria/veterans,1970-01-01
https://www.fsidigital.ca/grants/in/carmel,1970-01-01
https://www.fsidigital.ca/grants/in/carmel/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/in/carmel/non-profits,1970-01-01
https://www.fsidigital.ca/grants/in/evansville/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/in/lafayette-west-lafayette/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/in/lafayette-west-lafayette/non-profits,1970-01-01
https://www.fsidigital.ca/grants/in/south-bend/agriculture,1970-01-01
https://www.fsidigital.ca/grants/in/south-bend/healthcare,1970-01-01
https://www.fsidigital.ca/grants/in/south-bend/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/in/south-bend/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/industry/prairie-farming,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/construction,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/logistics,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/retail,1970-01-01
https://www.fsidigital.ca/grants/ks/kansas-city-ks/technology,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/logistics,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/technology,1970-01-01
https://www.fsidigital.ca/grants/ks/manhattan-junction-city/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/construction,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ky/bowling-green/retail,1970-01-01
https://www.fsidigital.ca/grants/ky/louisville/construction,1970-01-01
https://www.fsidigital.ca/grants/la/baton-rouge/healthcare,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/construction,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/logistics,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/non-profits,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/retail,1970-01-01
https://www.fsidigital.ca/grants/la/lafayette/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/education,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/logistics,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/technology,1970-01-01
https://www.fsidigital.ca/grants/ma/boston-cambridge/veterans,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell/veterans,1970-01-01
https://www.fsidigital.ca/grants/ma/lowell/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ma/worcester/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ma/worcester/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ma/worcester/education,1970-01-01
https://www.fsidigital.ca/grants/ma/worcester/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ma/worcester/technology,1970-01-01
https://www.fsidigital.ca/grants/mb/brandon-mb/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/mb/steinbach/healthcare,1970-01-01
https://www.fsidigital.ca/grants/mb/steinbach/veterans,1970-01-01
https://www.fsidigital.ca/grants/mb/winnipeg/construction,1970-01-01
https://www.fsidigital.ca/grants/md/columbia,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/construction,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/education,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/healthcare,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/retail,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/technology,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/veterans,1970-01-01
https://www.fsidigital.ca/grants/md/columbia/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/md/rockville-bethesda/agriculture,1970-01-01
https://www.fsidigital.ca/grants/md/rockville-bethesda/construction,1970-01-01
https://www.fsidigital.ca/grants/md/rockville-bethesda/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/md/rockville-bethesda/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/md/rockville-bethesda/veterans,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/construction,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/education,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/non-profits,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/technology,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/veterans,1970-01-01
https://www.fsidigital.ca/grants/me/bangor/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/me/lewistonauburn/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/me/lewistonauburn/construction,1970-01-01
https://www.fsidigital.ca/grants/me/lewistonauburn/education,1970-01-01
https://www.fsidigital.ca/grants/me/lewistonauburn/non-profits,1970-01-01
https://www.fsidigital.ca/grants/me/lewistonauburn/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/me/portland,1970-01-01
https://www.fsidigital.ca/grants/me/portland/agriculture,1970-01-01
https://www.fsidigital.ca/grants/me/portland/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/me/portland/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/me/portland/construction,1970-01-01
https://www.fsidigital.ca/grants/me/portland/education,1970-01-01
https://www.fsidigital.ca/grants/me/portland/healthcare,1970-01-01
https://www.fsidigital.ca/grants/me/portland/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/me/portland/technology,1970-01-01
https://www.fsidigital.ca/grants/me/portland/veterans,1970-01-01
https://www.fsidigital.ca/grants/mi,1970-01-01
https://www.fsidigital.ca/grants/mi/ann-arbor/logistics,1970-01-01
https://www.fsidigital.ca/grants/mi/ann-arbor/veterans,1970-01-01
https://www.fsidigital.ca/grants/mi/lansing/logistics,1970-01-01
https://www.fsidigital.ca/grants/mn/duluth/retail,1970-01-01
https://www.fsidigital.ca/grants/mn/duluth/technology,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/agriculture,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/education,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/healthcare,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/non-profits,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/veterans,1970-01-01
https://www.fsidigital.ca/grants/mn/rochester/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/construction,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/logistics,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/non-profits,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/retail,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/technology,1970-01-01
https://www.fsidigital.ca/grants/mo/columbia/veterans,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/agriculture,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/construction,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/healthcare,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/logistics,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/non-profits,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/retail,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/technology,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/veterans,1970-01-01
https://www.fsidigital.ca/grants/mo/kansas-city/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/agriculture,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/construction,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/technology,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/veterans,1970-01-01
https://www.fsidigital.ca/grants/mo/st-louis/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ms,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/technology,1970-01-01
https://www.fsidigital.ca/grants/ms/biloxi-gulfport/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/construction,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/logistics,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/retail,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/technology,1970-01-01
https://www.fsidigital.ca/grants/ms/jackson/veterans,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/construction,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/logistics,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ms/starkville-columbus/retail,1970-01-01
https://www.fsidigital.ca/grants/mt/billings/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/mt/billings/education,1970-01-01
https://www.fsidigital.ca/grants/mt/billings/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/mt/billings/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/mt/bozeman/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/mt/bozeman/construction,1970-01-01
https://www.fsidigital.ca/grants/mt/bozeman/education,1970-01-01
https://www.fsidigital.ca/grants/mt/bozeman/logistics,1970-01-01
https://www.fsidigital.ca/grants/mt/bozeman/retail,1970-01-01
https://www.fsidigital.ca/grants/mt/missoula/education,1970-01-01
https://www.fsidigital.ca/grants/mt/missoula/logistics,1970-01-01
https://www.fsidigital.ca/grants/mt/missoula/non-profits,1970-01-01
https://www.fsidigital.ca/grants/mt/missoula/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/nb/saint-john/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/agriculture,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/construction,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/healthcare,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/logistics,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/non-profits,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/nc/asheville/veterans,1970-01-01
https://www.fsidigital.ca/grants/nc/fayetteville/logistics,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/education,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/logistics,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/nc/raleigh-durham/technology,1970-01-01
https://www.fsidigital.ca/grants/nc/wilmington/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nc/winston-salem/education,1970-01-01
https://www.fsidigital.ca/grants/nc/winston-salem/logistics,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/agriculture,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/education,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/logistics,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/technology,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/veterans,1970-01-01
https://www.fsidigital.ca/grants/nd/bismarck/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/education,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/non-profits,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/retail,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/technology,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/veterans,1970-01-01
https://www.fsidigital.ca/grants/nd/fargo/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/agriculture,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/education,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/healthcare,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/logistics,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/retail,1970-01-01
https://www.fsidigital.ca/grants/nd/grand-forks/technology,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/construction,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/logistics,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/retail,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/technology,1970-01-01
https://www.fsidigital.ca/grants/ne/grand-island/veterans,1970-01-01
https://www.fsidigital.ca/grants/ne/omaha/education,1970-01-01
https://www.fsidigital.ca/grants/ne/omaha/veterans,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/education,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/logistics,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/non-profits,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/retail,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/technology,1970-01-01
https://www.fsidigital.ca/grants/nh/manchester/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/nh/nashua/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nh/nashua/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nh/nashua/logistics,1970-01-01
https://www.fsidigital.ca/grants/nh/nashua/retail,1970-01-01
https://www.fsidigital.ca/grants/nh/nashua/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/agriculture,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/construction,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/education,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/non-profits,1970-01-01
https://www.fsidigital.ca/grants/nh/portsmouth/technology,1970-01-01
https://www.fsidigital.ca/grants/nj/princeton,1970-01-01
https://www.fsidigital.ca/grants/nj/princeton/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nj/princeton/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nj/princeton/construction,1970-01-01
https://www.fsidigital.ca/grants/nj/princeton/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nj/princeton/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/nl/corner-brook/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nl/mount-pearl/agriculture,1970-01-01
https://www.fsidigital.ca/grants/nl/mount-pearl/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nl/mount-pearl/healthcare,1970-01-01
https://www.fsidigital.ca/grants/nl/mount-pearl/logistics,1970-01-01
https://www.fsidigital.ca/grants/nl/mount-pearl/technology,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/construction,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/healthcare,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/logistics,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/non-profits,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/nm/las-cruces/technology,1970-01-01
https://www.fsidigital.ca/grants/nm/santa-fe/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/nm/santa-fe/construction,1970-01-01
https://www.fsidigital.ca/grants/nm/santa-fe/education,1970-01-01
https://www.fsidigital.ca/grants/nm/santa-fe/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/nm/santa-fe/retail,1970-01-01
https://www.fsidigital.ca/grants/nm/santa-fe/technology,1970-01-01
https://www.fsidigital.ca/grants/ns/sydney,1970-01-01
https://www.fsidigital.ca/grants/ns/sydney/construction,1970-01-01
https://www.fsidigital.ca/grants/ns/sydney/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ns/sydney/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ns/truro/logistics,1970-01-01
https://www.fsidigital.ca/grants/ns/truro/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ns/truro/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ns/truro/veterans,1970-01-01
https://www.fsidigital.ca/grants/nv/reno/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ny/albany/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ny/new-rochelle/logistics,1970-01-01
https://www.fsidigital.ca/grants/ny/new-rochelle/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ny/schenectady/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ny/utica/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ny/utica/healthcare,1970-01-01
https://www.fsidigital.ca/grants/oh/dayton/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/construction,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/education,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/logistics,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ok/pryor-creek/technology,1970-01-01
https://www.fsidigital.ca/grants/on/barrie/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/on/belleville/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/on/cornwall/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/on/cornwall/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/on/cornwall/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/on/cornwall/technology,1970-01-01
https://www.fsidigital.ca/grants/on/north-bay/retail,1970-01-01
https://www.fsidigital.ca/grants/on/orillia/construction,1970-01-01
https://www.fsidigital.ca/grants/on/sarnia/agriculture,1970-01-01
https://www.fsidigital.ca/grants/on/st-thomas/construction,1970-01-01
https://www.fsidigital.ca/grants/on/st-thomas/education,1970-01-01
https://www.fsidigital.ca/grants/on/st-thomas/non-profits,1970-01-01
https://www.fsidigital.ca/grants/on/st-thomas/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/on/stratford/agriculture,1970-01-01
https://www.fsidigital.ca/grants/on/stratford/logistics,1970-01-01
https://www.fsidigital.ca/grants/on/thunder-bay/construction,1970-01-01
https://www.fsidigital.ca/grants/on/thunder-bay/non-profits,1970-01-01
https://www.fsidigital.ca/grants/on/thunder-bay/retail,1970-01-01
https://www.fsidigital.ca/grants/on/thunder-bay/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/on/welland/education,1970-01-01
https://www.fsidigital.ca/grants/on/welland/technology,1970-01-01
https://www.fsidigital.ca/grants/on/welland/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/on/woodstock/agriculture,1970-01-01
https://www.fsidigital.ca/grants/on/woodstock/education,1970-01-01
https://www.fsidigital.ca/grants/on/woodstock/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/on/woodstock/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/or/beaverton/healthcare,1970-01-01
https://www.fsidigital.ca/grants/or/bend/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/or/bend/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/or/bend/construction,1970-01-01
https://www.fsidigital.ca/grants/or/bend/healthcare,1970-01-01
https://www.fsidigital.ca/grants/or/bend/logistics,1970-01-01
https://www.fsidigital.ca/grants/or/bend/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/or/bend/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/or/bend/retail,1970-01-01
https://www.fsidigital.ca/grants/or/eugene/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro-washington-county,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro-washington-county/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro-washington-county/construction,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro-washington-county/healthcare,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro-washington-county/veterans,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro-washington-county/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/or/hillsboro/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/or/salem/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley/agriculture,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley/education,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley/healthcare,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley/non-profits,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown-lehigh-valley/veterans,1970-01-01
https://www.fsidigital.ca/grants/pa/allentown/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/pa/erie/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/pa/erie/logistics,1970-01-01
https://www.fsidigital.ca/grants/pa/pittsburgh/healthcare,1970-01-01
https://www.fsidigital.ca/grants/pa/reading/construction,1970-01-01
https://www.fsidigital.ca/grants/pa/reading/healthcare,1970-01-01
https://www.fsidigital.ca/grants/pa/reading/veterans,1970-01-01
https://www.fsidigital.ca/grants/pe/summerside/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/qc/drummondville/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/qc/granby/construction,1970-01-01
https://www.fsidigital.ca/grants/qc/saint-hyacinthe/education,1970-01-01
https://www.fsidigital.ca/grants/qc/saint-jean-sur-richelieu/construction,1970-01-01
https://www.fsidigital.ca/grants/qc/saint-jean-sur-richelieu/education,1970-01-01
https://www.fsidigital.ca/grants/qc/saint-jean-sur-richelieu/veterans,1970-01-01
https://www.fsidigital.ca/grants/qc/shawinigan/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/qc/shawinigan/healthcare,1970-01-01
https://www.fsidigital.ca/grants/qc/trois-rivieres/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/education,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/logistics,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/veterans,1970-01-01
https://www.fsidigital.ca/grants/ri/newport/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ri/pawtucket/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ri/pawtucket/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ri/pawtucket/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ri/providence/logistics,1970-01-01
https://www.fsidigital.ca/grants/ri/providence/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/ri/providence/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ri/providence/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/agriculture,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/construction,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/healthcare,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/sc/charleston/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/sc/columbia/construction,1970-01-01
https://www.fsidigital.ca/grants/sc/columbia/education,1970-01-01
https://www.fsidigital.ca/grants/sc/columbia/healthcare,1970-01-01
https://www.fsidigital.ca/grants/sc/columbia/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/sc/columbia/retail,1970-01-01
https://www.fsidigital.ca/grants/sc/columbia/veterans,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/agriculture,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/education,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/healthcare,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/logistics,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/retail,1970-01-01
https://www.fsidigital.ca/grants/sc/greenville/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/sk/moose-jaw/technology,1970-01-01
https://www.fsidigital.ca/grants/sk/prince-albert/agriculture,1970-01-01
https://www.fsidigital.ca/grants/sk/prince-albert/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/tn/chattanooga/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/tn/clarksville/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/tn/clarksville/retail,1970-01-01
https://www.fsidigital.ca/grants/tn/clarksville/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/tn/knoxville/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/tn/knoxville/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/tn/knoxville/retail,1970-01-01
https://www.fsidigital.ca/grants/tn/memphis/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/tn/memphis/construction,1970-01-01
https://www.fsidigital.ca/grants/tn/memphis/education,1970-01-01
https://www.fsidigital.ca/grants/tn/memphis/logistics,1970-01-01
https://www.fsidigital.ca/grants/tn/memphis/non-profits,1970-01-01
https://www.fsidigital.ca/grants/tn/memphis/retail,1970-01-01
https://www.fsidigital.ca/grants/tx/abilene/healthcare,1970-01-01
https://www.fsidigital.ca/grants/tx/abilene/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/tx/abilene/veterans,1970-01-01
https://www.fsidigital.ca/grants/tx/amarillo/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/amarillo/logistics,1970-01-01
https://www.fsidigital.ca/grants/tx/brownsville/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/brownsville/logistics,1970-01-01
https://www.fsidigital.ca/grants/tx/brownsville/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/tx/brownsville/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/tx/carrollton/healthcare,1970-01-01
https://www.fsidigital.ca/grants/tx/carrollton/technology,1970-01-01
https://www.fsidigital.ca/grants/tx/college-station/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/tx/grand-prairie/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/grand-prairie/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/tx/grand-prairie/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/tx/mcallen/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/mckinney,1970-01-01
https://www.fsidigital.ca/grants/tx/mckinney/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/mckinney/logistics,1970-01-01
https://www.fsidigital.ca/grants/tx/mckinney/technology,1970-01-01
https://www.fsidigital.ca/grants/tx/mckinney/veterans,1970-01-01
https://www.fsidigital.ca/grants/tx/mckinney/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/tx/mesquite/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/pasadena-tx/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/tx/pearland/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/pearland/healthcare,1970-01-01
https://www.fsidigital.ca/grants/tx/pearland/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/tx/richardson/logistics,1970-01-01
https://www.fsidigital.ca/grants/tx/richardson/technology,1970-01-01
https://www.fsidigital.ca/grants/tx/round-rock/healthcare,1970-01-01
https://www.fsidigital.ca/grants/tx/round-rock/veterans,1970-01-01
https://www.fsidigital.ca/grants/tx/the-woodlands/agriculture,1970-01-01
https://www.fsidigital.ca/grants/tx/tyler/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/tx/tyler/logistics,1970-01-01
https://www.fsidigital.ca/grants/tx/tyler/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/tx/waco/education,1970-01-01
https://www.fsidigital.ca/grants/tx/waco/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/tx/waco/retail,1970-01-01
https://www.fsidigital.ca/grants/ut,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/logistics,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/technology,1970-01-01
https://www.fsidigital.ca/grants/ut/lehi/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/agriculture,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/education,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/logistics,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/technology,1970-01-01
https://www.fsidigital.ca/grants/ut/salt-lake-city/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/healthcare,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/logistics,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/non-profits,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/technology,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/veterans,1970-01-01
https://www.fsidigital.ca/grants/ut/st-george/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/va/arlington-alexandria/education,1970-01-01
https://www.fsidigital.ca/grants/va/arlington-alexandria/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/va/norfolk-virginia-beach/construction,1970-01-01
https://www.fsidigital.ca/grants/vt/brattleboro/agriculture,1970-01-01
https://www.fsidigital.ca/grants/vt/brattleboro/education,1970-01-01
https://www.fsidigital.ca/grants/vt/burlington/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/vt/burlington/non-profits,1970-01-01
https://www.fsidigital.ca/grants/vt/montpelierbarre/retail,1970-01-01
https://www.fsidigital.ca/grants/wa/everett/veterans,1970-01-01
https://www.fsidigital.ca/grants/wa/federal-way/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/wa/renton,1970-01-01
https://www.fsidigital.ca/grants/wa/tacoma/veterans,1970-01-01
https://www.fsidigital.ca/grants/wa/yakima/logistics,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/agriculture,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/logistics,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/retail,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/technology,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay-appleton/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/wi/green-bay/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wi/madison/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wi/madison/construction,1970-01-01
https://www.fsidigital.ca/grants/wi/madison/logistics,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/agriculture,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/construction,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/education,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/logistics,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/non-profits,1970-01-01
https://www.fsidigital.ca/grants/wv/charleston/veterans,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/agriculture,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/construction,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/education,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/logistics,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/non-profits,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/veterans,1970-01-01
https://www.fsidigital.ca/grants/wv/martinsburg/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/construction,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/education,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/logistics,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/minority-owned,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/retail,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/technology,1970-01-01
https://www.fsidigital.ca/grants/wv/morgantown/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/grants/wy/cheyenne,1970-01-01
https://www.fsidigital.ca/grants/wy/cheyenne/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wy/cheyenne/clean-energy,1970-01-01
https://www.fsidigital.ca/grants/wy/cheyenne/construction,1970-01-01
https://www.fsidigital.ca/grants/wy/cheyenne/logistics,1970-01-01
https://www.fsidigital.ca/grants/wy/cheyenne/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/agriculture,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/arts-entertainment,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/education,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/logistics,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/non-profits,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/retail,1970-01-01
https://www.fsidigital.ca/grants/wy/jackson/technology,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/agriculture,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/education,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/logistics,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/manufacturing,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/non-profits,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/restaurants-hospitality,1970-01-01
https://www.fsidigital.ca/grants/wy/laramie/women-entrepreneurs,1970-01-01
https://www.fsidigital.ca/healthcare-business-funding,1970-01-01
https://www.fsidigital.ca/membership/dashboard,1970-01-01
https://www.fsidigital.ca/merchant-cash-advance-canada,1970-01-01
https://www.fsidigital.ca/merchant-cash-advance-rates,1970-01-01
https://www.fsidigital.ca/merchant-cash-advance-vs-business-loan,1970-01-01
https://www.fsidigital.ca/ontario-business-funding,1970-01-01
https://www.fsidigital.ca/partners/agriculture-funding-leads,1970-01-01
https://www.fsidigital.ca/partners/asset-based-lending-leads,1970-01-01
https://www.fsidigital.ca/partners/bridge-loan-leads,1970-01-01
https://www.fsidigital.ca/partners/business-line-of-credit-leads,1970-01-01
https://www.fsidigital.ca/partners/export-funding-leads,1970-01-01
https://www.fsidigital.ca/partners/franchise-financing-leads,1970-01-01
https://www.fsidigital.ca/partners/invoice-financing-leads,1970-01-01
https://www.fsidigital.ca/partners/minority-owned-business-leads,1970-01-01
https://www.fsidigital.ca/partners/purchase-order-financing-leads,1970-01-01
https://www.fsidigital.ca/partners/sba-loan-leads,1970-01-01
https://www.fsidigital.ca/partners/unsecured-business-loan-leads,1970-01-01
https://www.fsidigital.ca/priority-processing,1970-01-01
https://www.fsidigital.ca/quebec-business-funding,1970-01-01
https://www.fsidigital.ca/resources/business-credit-score-guide,1970-01-01
https://www.fsidigital.ca/resources/business-funding-checklist,1970-01-01
https://www.fsidigital.ca/resources/cash-flow-forecasting,1970-01-01
https://www.fsidigital.ca/resources/how-to-improve-business-cash-flow,1970-01-01
https://www.fsidigital.ca/resources/how-to-prepare-financial-documents,1970-01-01
https://www.fsidigital.ca/resources/understanding-factor-rates,1970-01-01
https://www.fsidigital.ca/restaurant-business-funding,1970-01-01
https://www.fsidigital.ca/retail-business-funding,1970-01-01
https://www.fsidigital.ca/trucking-business-funding,1970-01-01
https://www.fsidigital.ca/usa/iowa/cedar-rapids,1970-01-01
https://www.fsidigital.ca/usa/michigan,1970-01-01
https://www.fsidigital.ca/usa/montana,1970-01-01
https://www.fsidigital.ca/why-businesses-get-declined,1970-01-01
`;

// Validation logic for MCA, Downloads, PSEO, Partners, Static routes, etc.
async function main() {
  const configContent = fs.readFileSync(path.join(__dirname, '../next.config.mjs'), 'utf8');
  const redirects = new Set();
  const redirectMatches = configContent.matchAll(/source:\s*['"]([^'"]+)['"]/g);
  for (const m of redirectMatches) {
    redirects.add(m[1].split('?')[0].replace(/\/$/, ''));
  }

  let blogSlugs = new Set();
  const metadataPath = path.join(__dirname, '../lib/data/blogMetadata.json');
  if (fs.existsSync(metadataPath)) {
    const blogMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    blogSlugs = new Set(Object.keys(blogMeta.slugToPath || {}));
  }

  // Load MCA directory routes
  const mcaDir = path.join(__dirname, '../app/(mca)');
  const mcaRoutes = new Set();
  if (fs.existsSync(mcaDir)) {
    const entries = fs.readdirSync(mcaDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        mcaRoutes.add(`/${entry.name}`);
      }
    }
  }

  // Load MCA sub-resources
  const mcaResDir = path.join(__dirname, '../app/(mca)/resources');
  if (fs.existsSync(mcaResDir)) {
    const entries = fs.readdirSync(mcaResDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        mcaRoutes.add(`/resources/${entry.name}`);
      }
    }
  }

  // Load Downloads directory routes
  const downloadDir = path.join(__dirname, '../app/download');
  const downloadRoutes = new Set();
  if (fs.existsSync(downloadDir)) {
    const entries = fs.readdirSync(downloadDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'thank-you') {
        downloadRoutes.add(`/download/${entry.name}`);
      }
    }
  }

  // Load Partners routes
  const partnerRoutes = new Set([
    '/partners/business-loan-leads',
    '/partners/government-grant-leads',
    '/partners/startup-funding-leads',
    '/partners/tax-credit-leads',
    '/partners/sred-leads',
    '/partners/canada-funding-leads',
    '/partners/usa-funding-leads',
    '/partners/merchant-cash-advance-leads',
    '/partners/equipment-financing-leads',
    '/partners/working-capital-leads',
    '/partners/commercial-real-estate-leads',
    '/partners/sbir-grant-leads',
    '/partners/usda-grant-leads',
    '/partners/clean-energy-grant-leads',
    '/partners/women-owned-business-leads',
    '/partners/nonprofit-grant-leads',
    '/partners/invoice-financing-leads',
    '/partners/purchase-order-financing-leads',
    '/partners/asset-based-lending-leads',
    '/partners/sba-loan-leads',
    '/partners/agriculture-funding-leads',
    '/partners/franchise-financing-leads',
    '/partners/accounts-receivable-factoring-leads',
    '/partners/bridge-loan-leads',
    '/partners/rd-tax-credit-leads',
    '/partners/export-funding-leads',
    '/partners/venture-debt-leads',
    '/partners/business-line-of-credit-leads',
    '/partners/unsecured-business-loan-leads',
    '/partners/minority-owned-business-leads',
  ]);

  const rawLines1 = RAW_USER_DATA_1.trim().split('\n').filter(l => l.trim() && !l.startsWith('URL,'));
  const rawLines2 = RAW_USER_DATA_2.trim().split('\n').filter(l => l.trim() && !l.startsWith('URL,'));
  const dataset3Path = path.join(__dirname, 'dataset3.csv');
  const rawLines3 = fs.existsSync(dataset3Path)
    ? fs.readFileSync(dataset3Path, 'utf8').trim().split('\n').filter(l => l.trim() && !l.startsWith('URL,'))
    : [];

  const allInputLines = [...rawLines1, ...rawLines2, ...rawLines3];

  const genuineMap = new Map(); // key: pathName -> { url, path, lastCrawled, type }
  const invalidOrExcludedMap = new Map();

  for (const line of allInputLines) {
    const [rawUrl, lastCrawled] = line.split(',').map(s => s ? s.trim() : '');
    if (!rawUrl) continue;

    let pathName = '';
    try {
      const parsed = new URL(rawUrl);
      pathName = parsed.pathname.replace(/\/$/, '') || '/';
      if (parsed.search) {
        invalidOrExcludedMap.set(rawUrl, {
          url: rawUrl,
          path: pathName + parsed.search,
          lastCrawled,
          reason: 'Query string parameter page (intentional noindex)'
        });
        continue;
      }
    } catch {
      invalidOrExcludedMap.set(rawUrl, {
        url: rawUrl,
        path: rawUrl,
        lastCrawled,
        reason: 'Malformed or non-HTTP URL'
      });
      continue;
    }

    // Check parenthetical route group paths like /(mca)/...
    if (pathName.includes('(') || pathName.includes(')')) {
      invalidOrExcludedMap.set(rawUrl, {
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: '404 Internal Route Group path with parentheses (e.g. /(mca)/...)'
      });
      continue;
    }

    // Check intentional noindex paths (admin, checkout, booking, consultation, author, membership)
    if (
      pathName.startsWith('/admin') ||
      pathName.includes('checkout') ||
      pathName.includes('success') ||
      pathName === '/booking' ||
      pathName === '/consultation' ||
      pathName === '/author' ||
      pathName.startsWith('/membership') ||
      pathName.includes('/products/report')
    ) {
      invalidOrExcludedMap.set(rawUrl, {
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: 'Intentional noindex system route (Admin / Checkout / Booking / Author / Membership)'
      });
      continue;
    }

    // Check redirects
    if (redirects.has(pathName)) {
      invalidOrExcludedMap.set(rawUrl, {
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: 'Redirected legacy URL (301 Permanent Redirect in next.config.mjs)'
      });
      continue;
    }

    // Validate active page
    let isValid = false;
    let pageType = '';

    // 1. Check MCA routes
    if (mcaRoutes.has(pathName)) {
      isValid = true;
      pageType = 'MCA Business Funding Page';
    }

    // 2. Check Download Guides
    if (!isValid && downloadRoutes.has(pathName)) {
      isValid = true;
      pageType = 'Downloadable Guide Page';
    }

    // 3. Check Partner Lead pages
    if (!isValid && partnerRoutes.has(pathName)) {
      isValid = true;
      pageType = 'Partner Lead Page';
    }

    // 4. Check PSEO leaf page: /grants/[province]/[city]/[industry]
    if (!isValid) {
      const pseoMatch = pathName.match(/^\/grants\/([^/]+)\/([^/]+)\/([^/]+)$/);
      if (pseoMatch) {
        const [, prov, city, ind] = pseoMatch;
        const page = getPseoPage(prov, city, ind);
        if (page && page.isPublished) {
          isValid = true;
          pageType = 'PSEO City+Industry Page';
        }
      }
    }

    // 5. Check PSEO Hub / City / Province page: /grants/[province] or /grants/[province]/[city]
    if (!isValid) {
      const pseoHubMatch = pathName.match(/^\/grants\/([^/]+)(?:\/([^/]+))?$/);
      if (pseoHubMatch) {
        const [, prov, city] = pseoHubMatch;
        const allPseo = getAllPseoPages();
        if (city) {
          const exists = allPseo.some((p) => p.provinceSlug === prov && p.citySlug === city);
          if (exists) {
            isValid = true;
            pageType = 'PSEO City Hub Page';
          }
        } else {
          const exists = allPseo.some((p) => p.provinceSlug === prov);
          if (exists) {
            isValid = true;
            pageType = 'PSEO Province Hub Page';
          }
        }
      }
    }

    // 6. Check Compare pages: /compare/[slug]
    if (!isValid && pathName.startsWith('/compare/')) {
      const slug = pathName.replace('/compare/', '');
      if (comparisonsDatabase[slug] || slug === 'sred-vs-rd-tax-credit-usa' || slug === 'mitacs-vs-nserc' || slug === 'ised-vs-bdc' || slug === 'canexport-vs-edc' || slug === 'nsf-sbir-vs-darpa' || slug === 'grant-vs-angel-investment' || slug === 'grant-vs-government-loan' || slug === 'grant-vs-venture-capital' || slug === 'small-business-grant-vs-sba-loan') {
        isValid = true;
        pageType = 'Comparison Page';
      }
    }

    // 7. Check Programs: /programs/[slug]
    if (!isValid && pathName.startsWith('/programs/')) {
      const slug = pathName.replace('/programs/', '');
      const programs = getAllPrograms();
      if (programs.some((p) => p.slug === slug)) {
        isValid = true;
        pageType = 'Program Page';
      }
    }

    // 8. Check Blog posts: /blog/[slug]
    if (!isValid && pathName.startsWith('/blog/')) {
      const slug = pathName.replace('/blog/', '');
      if (blogSlugs.has(slug)) {
        isValid = true;
        pageType = 'Blog Post';
      }
    }

    // 9. Check Guides: /guides/[slug]
    if (!isValid && pathName.startsWith('/guides/')) {
      const slug = pathName.replace('/guides/', '');
      if (guidesDatabase.some((g) => g.slug === slug)) {
        isValid = true;
        pageType = 'Guide Page';
      }
    }

    // 10. Check USA state / city pages: /usa/...
    if (!isValid && pathName.startsWith('/usa/')) {
      const parts = pathName.split('/').filter(Boolean);
      if (parts.length >= 2) {
        isValid = true;
        pageType = 'USA Location Page';
      }
    }

    // 11. Check Canada province / topic pages: /canada/...
    if (!isValid && pathName.startsWith('/canada/')) {
      const parts = pathName.split('/').filter(Boolean);
      if (parts.length >= 2) {
        isValid = true;
        pageType = 'Canada Location / Topic Page';
      }
    }

    // 12. Static core & consultation pages
    const staticCorePages = new Set([
      '/editorial-policy', '/grants', '/get-started', '/services', '/database', '/calendar',
      '/newsletter', '/refund-cancellation', '/faq', '/about', '/contact', '/grant-finder',
      '/expert-insights', '/disclaimer', '/terms', '/privacy', '/florida-business-grants-consultation',
      '/veteran-business-consultation', '/healthcare-grants-consultation',
      '/canada-regional-development-consultation', '/sred-tax-credit-consultation',
      '/free-grant-consultation', '/rural-business-development-consultation',
      '/canada-supercluster-consultation', '/environmental-justice-consultation',
      '/nsf-sbir-masterclass', '/grant-application-review', '/about-founder', '/audit',
      '/case-studies', '/customer-success', '/data-sources', '/deadline-calendar',
      '/faq-usa', '/funding-map', '/how-to-apply-usa', '/methodology', '/news',
      '/portfolio', '/prescription', '/program-updates', '/quarterly-report', '/research',
      '/sample-report', '/search', '/subscribe', '/testimonials', '/tools', '/topics'
    ]);

    if (!isValid && staticCorePages.has(pathName)) {
      isValid = true;
      pageType = 'Static Core Page';
    }

    const cleanCanonicalUrl = `https://www.fsidigital.ca${pathName}`;

    if (isValid) {
      genuineMap.set(cleanCanonicalUrl, {
        url: cleanCanonicalUrl,
        path: pathName,
        lastCrawled,
        type: pageType
      });
    } else {
      invalidOrExcludedMap.set(rawUrl, {
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: '404 Non-existent page (Mismatch city slug, (mca) route group, or deleted route)'
      });
    }
  }

  const genuinePages = Array.from(genuineMap.values());
  const invalidOrExcludedPages = Array.from(invalidOrExcludedMap.values());

  console.log(`\n==================================================`);
  console.log(`📊 COMBINED GSC NOINDEX LIST ANALYSIS REPORT (TABLE 1 + TABLE 2)`);
  console.log(`==================================================`);
  console.log(`Total URLs analyzed from GSC exports: ${allInputLines.length}`);
  console.log(`✅ UNIQUE GENUINE Active Pages found: ${genuinePages.length}`);
  console.log(`❌ Invalid / System Excluded / 404 Pages: ${invalidOrExcludedPages.length}\n`);

  // Breakdown by page type
  const typeCounts = {};
  for (const page of genuinePages) {
    typeCounts[page.type] = (typeCounts[page.type] || 0) + 1;
  }
  console.log(`📌 GENUINE ACTIVE PAGES BY TYPE:`);
  for (const [type, count] of Object.entries(typeCounts)) {
    console.log(`   • ${type}: ${count} pages`);
  }

  // Generate XML Recovery Sitemap
  const todayISO = new Date().toISOString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of genuinePages) {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${todayISO}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `</urlset>\n`;

  const sitemapOutputPath = path.join(__dirname, '../public/indexing-recovery-genuine-noindex.xml');
  fs.writeFileSync(sitemapOutputPath, xml, 'utf8');
  console.log(`\n✅ Generated Updated Recovery Sitemap with ${genuinePages.length} Genuine Pages: ${sitemapOutputPath}`);

  // Save JSON Summary Report
  const reportData = {
    summary: {
      totalInput: allInputLines.length,
      uniqueGenuineActiveCount: genuinePages.length,
      invalidOrExcludedCount: invalidOrExcludedPages.length,
      typeCounts
    },
    genuinePages,
    invalidOrExcludedPages
  };
  const reportPath = path.join(__dirname, '../scripts/user-noindex-combined-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
  console.log(`📁 Saved combined JSON report to: ${reportPath}`);
}

main().catch(console.error);
