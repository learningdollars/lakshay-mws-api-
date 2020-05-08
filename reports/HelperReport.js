const log = require('simple-node-logger').createSimpleLogger('project.log');
//Reports
const inventoryReports = ['_GET_MERCHANT_LISTINGS_ALL_DATA_', ];
const orderReports = ['_GET_FLAT_FILE_ORDERS_DATA_'];
const performanceReports = ['_GET_V1_SELLER_PERFORMANCE_REPORT_'];
const amazonPayReports = ['_GET_FLAT_FILE_OFFAMAZONPAYMENTS_SANDBOX_SETTLEMENT_DATA_'];
const settlementReports = ['_GET_V2_SETTLEMENT_REPORT_DATA_XML_'];

//helper reports array
var helper = [];
helper[0] = inventoryReports
helper[1] = orderReports;
helper[2] = performanceReports;
helper[3] = amazonPayReports;
helper[4] = settlementReports;

//RequestIds
var inventoryRequestIds = [];
var orderRequestIds = [];
var performanceRequestIds = [];
var amazonPayRequestIds = [];

var requestIds = [inventoryRequestIds, orderRequestIds, performanceRequestIds, amazonPayRequestIds];
exports.helper = helper
exports.requestIds = requestIds