const express = require('express');
const router = express.Router();

const {
  getAllCompanies,
  getAllIndustries,
  getAllSectors,
  getCompaniesByIndustry,
  getCompaniesBySector,
  getCompany,
  getCompaniesByMarketcap
} = require('./../controllers/company');

router.get('/all', getAllCompanies);
router.get('/industries', getAllIndustries);
router.get('/sectors', getAllSectors);
router.get('/by/nameorsymbol', getCompany);
router.get('/by/industry', getCompaniesByIndustry);
router.get('/by/sector', getCompaniesBySector);
router.get('/by/marketcap', getCompaniesByMarketcap);

module.exports = router;