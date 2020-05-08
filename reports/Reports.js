//import MwsApi from 'amazon-mws';
const log = require('simple-node-logger').createSimpleLogger('project.log');
const MwsApi = require('amazon-mws')
const amazonMws = new MwsApi();
const requestReport = async(accessKey, accessSecret, version, reportType, sellerId, mwsAuthToken, startDate, endDate) => {
	amazonMws.setApiKey(accessKey, accessSecret);
	amazonMws.setHost('mws.amazonservices.in');

	try {
		const response = await amazonMws.reports.submit({
			'Version': version,
			'Action': 'RequestReport',
			'SellerId': sellerId,
			'MWSAuthToken': mwsAuthToken,
			'ReportType': reportType,
			'StartDate': startDate,
			'EndDate': endDate

		});
		// console.log(response);
		return response;

	} catch (error) {
		log.info("ERROR!!" + error)
		return error;
	}
};

const getReportRequestList = async(accessKey, accessSecret, version, sellerId, mwsAuthToken, reportRequestId) => {
	amazonMws.setApiKey(accessKey, accessSecret);
	amazonMws.setHost('mws.amazonservices.in');

	try {
		const response = await amazonMws.reports.search({
			'Version': version,
			'Action': 'GetReportRequestList',
			'SellerId': sellerId,
			'MWSAuthToken': mwsAuthToken,
			'ReportRequestIdList.Id.1': reportRequestId
		});

		return response;

	} catch (error) {
		log.info("ERROR!!" + error)
		return error;
	}
};
const getReportList = async(accessKey, accessSecret, version, sellerId, mwsAuthToken, report) => {
	amazonMws.setApiKey(accessKey, accessSecret);
	amazonMws.setHost('mws.amazonservices.in');

	try {
		const response = await amazonMws.reports.search({
			'Version': version,
			'Action': 'GetReportList',
			'SellerId': sellerId,
			'MWSAuthToken': mwsAuthToken,
			'ReportTypeList.Type.1': report
		});

		return response;

	} catch (error) {
		log.info("ERROR!!" + error)
		return error;
	}
};


const getReport = async(accessKey, accessSecret, version, sellerId, mwsAuthToken, reportRequestId) => {
	amazonMws.setApiKey(accessKey, accessSecret);
	amazonMws.setHost('mws.amazonservices.in');

	try {
		const response = await amazonMws.reports.search({
			'Version': '2009-01-01',
			'Action': 'GetReport',
			'SellerId': sellerId,
			'MWSAuthToken': mwsAuthToken,
			'ReportId': reportRequestId,
		});
		return response;

	} catch (error) {
		log.info("ERROR!!" + error)
		return error;
	}
};

exports.getReport = getReport;
exports.getReportRequestList = getReportRequestList;
exports.requestReport = requestReport;
exports.getReportList = getReportList;