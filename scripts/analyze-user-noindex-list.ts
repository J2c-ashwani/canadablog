import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPseoPage, getAllPseoPages } from '../lib/pseo-data';
import { getAllPrograms } from '../lib/data/programs';
import { guidesDatabase } from '../lib/data/guides';
import { comparisonsDatabase } from '../lib/data/comparisons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Raw list provided by the user
const RAW_USER_DATA = `
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

async function main() {
  // Load redirects from next.config.mjs
  const configContent = fs.readFileSync(path.join(__dirname, '../next.config.mjs'), 'utf8');
  const redirects = new Set<string>();
  const redirectMatches = configContent.matchAll(/source:\s*['"]([^'"]+)['"]/g);
  for (const m of redirectMatches) {
    redirects.add(m[1].split('?')[0].replace(/\/$/, ''));
  }

  // Load blog metadata
  let blogSlugs = new Set<string>();
  const metadataPath = path.join(__dirname, '../lib/data/blogMetadata.json');
  if (fs.existsSync(metadataPath)) {
    const blogMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    blogSlugs = new Set(Object.keys(blogMeta.slugToPath || {}));
  }

  const lines = RAW_USER_DATA.trim().split('\n').filter(l => l.trim() && !l.startsWith('URL,'));

  const genuinePages: { url: string; path: string; lastCrawled: string; type: string }[] = [];
  const invalidOrExcludedPages: { url: string; path: string; lastCrawled: string; reason: string }[] = [];

  for (const line of lines) {
    const [rawUrl, lastCrawled] = line.split(',').map(s => s ? s.trim() : '');
    if (!rawUrl) continue;

    let pathName = '';
    try {
      const parsed = new URL(rawUrl);
      pathName = parsed.pathname.replace(/\/$/, '') || '/';
      if (parsed.search) {
        invalidOrExcludedPages.push({
          url: rawUrl,
          path: pathName + parsed.search,
          lastCrawled,
          reason: 'Query string parameter page (intentional noindex)'
        });
        continue;
      }
    } catch {
      invalidOrExcludedPages.push({
        url: rawUrl,
        path: rawUrl,
        lastCrawled,
        reason: 'Malformed or non-HTTP URL'
      });
      continue;
    }

    // Check intentional noindex paths (admin, checkout, booking, consultation, author)
    if (
      pathName.startsWith('/admin') ||
      pathName.includes('checkout') ||
      pathName.includes('success') ||
      pathName === '/booking' ||
      pathName === '/consultation' ||
      pathName === '/author' ||
      pathName.includes('/products/report')
    ) {
      invalidOrExcludedPages.push({
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: 'Intentional noindex system route (Admin / Checkout / Booking / Author / Internal)'
      });
      continue;
    }

    // Check redirects
    if (redirects.has(pathName)) {
      invalidOrExcludedPages.push({
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: 'Redirected legacy URL (301 Permanent Redirect in next.config.mjs)'
      });
      continue;
    }

    // Now validate if it's an actual active page in the application
    let isValid = false;
    let pageType = '';

    // 1. Check PSEO page: /grants/[province]/[city]/[industry]
    const pseoMatch = pathName.match(/^\/grants\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (pseoMatch) {
      const [, prov, city, ind] = pseoMatch;
      const page = getPseoPage(prov, city, ind);
      if (page && page.isPublished) {
        isValid = true;
        pageType = 'PSEO City+Industry Page';
      }
    }

    // 2. Check PSEO Hub / City page: /grants/[province]/[city]
    if (!isValid) {
      const pseoHubMatch = pathName.match(/^\/grants\/([^/]+)\/([^/]+)$/);
      if (pseoHubMatch) {
        const [, prov, city] = pseoHubMatch;
        const allPseo = getAllPseoPages();
        const exists = allPseo.some((p: any) => p.provinceSlug === prov && p.citySlug === city);
        if (exists) {
          isValid = true;
          pageType = 'PSEO City Hub Page';
        }
      }
    }

    // 3. Check Compare pages: /compare/[slug]
    if (!isValid && pathName.startsWith('/compare/')) {
      const slug = pathName.replace('/compare/', '');
      if ((comparisonsDatabase as Record<string, any>)[slug] || slug === 'sred-vs-rd-tax-credit-usa' || slug === 'mitacs-vs-nserc' || slug === 'ised-vs-bdc' || slug === 'canexport-vs-edc' || slug === 'nsf-sbir-vs-darpa') {
        isValid = true;
        pageType = 'Comparison Page';
      }
    }

    // 4. Check Programs: /programs/[slug]
    if (!isValid && pathName.startsWith('/programs/')) {
      const slug = pathName.replace('/programs/', '');
      const programs = getAllPrograms();
      if (programs.some((p: any) => p.slug === slug)) {
        isValid = true;
        pageType = 'Program Page';
      }
    }

    // 5. Check Blog posts: /blog/[slug]
    if (!isValid && pathName.startsWith('/blog/')) {
      const slug = pathName.replace('/blog/', '');
      if (blogSlugs.has(slug)) {
        isValid = true;
        pageType = 'Blog Post';
      }
    }

    // 6. Check Guides: /guides/[slug]
    if (!isValid && pathName.startsWith('/guides/')) {
      const slug = pathName.replace('/guides/', '');
      if (guidesDatabase.some((g: any) => g.slug === slug)) {
        isValid = true;
        pageType = 'Guide Page';
      }
    }

    // 7. Check USA state / city pages: /usa/...
    if (!isValid && pathName.startsWith('/usa/')) {
      const parts = pathName.split('/').filter(Boolean);
      if (parts.length === 2 || parts.length === 3) {
        isValid = true;
        pageType = 'USA Location Page';
      }
    }

    // 8. Editorial Policy / Static root pages
    if (!isValid && (pathName === '/editorial-policy' || pathName === '/grants')) {
      isValid = true;
      pageType = 'Static Core Page';
    }

    if (isValid) {
      genuinePages.push({
        url: rawUrl,
        path: pathName,
        lastCrawled,
        type: pageType
      });
    } else {
      invalidOrExcludedPages.push({
        url: rawUrl,
        path: pathName,
        lastCrawled,
        reason: '404 Non-existent page (Mismatch city slug or deleted route)'
      });
    }
  }

  console.log(`\n==================================================`);
  console.log(`📊 USER GSC NOINDEX LIST ANALYSIS REPORT`);
  console.log(`==================================================`);
  console.log(`Total URLs analyzed from GSC list: ${lines.length}`);
  console.log(`✅ GENUINE Active Pages found: ${genuinePages.length}`);
  console.log(`❌ Invalid / System Excluded / 404 Pages: ${invalidOrExcludedPages.length}\n`);

  // Group genuine pages by crawl timeframe
  const marchAprilCrawled = genuinePages.filter(p => p.lastCrawled.startsWith('2026-03') || p.lastCrawled.startsWith('2026-04'));
  const mayCrawled = genuinePages.filter(p => p.lastCrawled.startsWith('2026-05'));
  const juneCrawled = genuinePages.filter(p => p.lastCrawled.startsWith('2026-06'));
  const julyAugustCrawled = genuinePages.filter(p => p.lastCrawled.startsWith('2026-07') || p.lastCrawled.startsWith('2026-08'));

  console.log(`📅 GENUINE PAGES BREAKDOWN BY LAST CRAWL DATE:`);
  console.log(`   🗓️ March / April 2026 Crawled: ${marchAprilCrawled.length} pages`);
  console.log(`   🗓️ May 2026 Crawled: ${mayCrawled.length} pages`);
  console.log(`   🗓️ June 2026 Crawled: ${juneCrawled.length} pages`);
  console.log(`   🗓️ July / August 2026 Crawled: ${julyAugustCrawled.length} pages\n`);

  // Generate XML Sitemap for genuine pages
  const today = new Date().toISOString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of genuinePages) {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `</urlset>\n`;

  const sitemapOutputPath = path.join(__dirname, '../public/indexing-recovery-genuine-noindex.xml');
  fs.writeFileSync(sitemapOutputPath, xml, 'utf8');
  console.log(`✅ Generated Recovery Sitemap with ${genuinePages.length} Genuine Pages: ${sitemapOutputPath}`);

  // Write JSON report
  const reportData = {
    summary: {
      totalInput: lines.length,
      genuineActiveCount: genuinePages.length,
      invalidExcludedCount: invalidOrExcludedPages.length,
      marchAprilCrawled: marchAprilCrawled.length,
      mayCrawled: mayCrawled.length,
      juneCrawled: juneCrawled.length,
      julyAugustCrawled: julyAugustCrawled.length
    },
    genuinePages,
    invalidOrExcludedPages
  };
  const reportPath = path.join(__dirname, '../scripts/user-noindex-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
  console.log(`📁 Detailed JSON analysis saved to: ${reportPath}`);
}

main().catch(console.error);
