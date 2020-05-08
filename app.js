var Report = require('./reports/Reports.js')
var HelperReport = require('./reports/HelperReport.js')
const log = require('simple-node-logger').createSimpleLogger('project.log');
var UserId = 'xyz'
const VERSION = '2009-01-01';
var AWS_ACCESS_KEY_ID = 'arg1'
var AWS_SECRET_ACCESS_KEY = 'arg2'
var SellerId = 'arg3'
var MWSAuthToken = 'arg4'
var startDate;
var endDate;
var settlement = "No data found for settlement Reports";
var performance = "No data found for performance Reports";
var inventory = "No data found for inventory Reports";
var order = "No data found for order Reports";
var amazonpay = "No data found for amazonpay Reports";
exports.RequestReports = class RequestReports {
	constructor(aws_key, aws_secret_key, seller_id, mws_Auth_token, user_id, StartDate, EndDate) {
		AWS_ACCESS_KEY_ID = aws_key;
		AWS_SECRET_ACCESS_KEY = aws_secret_key;
		SellerId = seller_id;
		MWSAuthToken = mws_Auth_token;
		UserId = user_id;
		startDate = StartDate;
		endDate = EndDate;

		generateReports();
	}

}

/*Only the latest settlement report is fetched irrespective of the dates entered, as these are scheduled by amazon*/
const getReportList = async() => {
	try {
		HelperReport.helper[4].forEach(async report => {
			const getReportListResult = await Report.getReportList(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, VERSION, SellerId, MWSAuthToken, report);
			if (!getReportListResult.ReportInfo) {
				log.info("For userID: " + UserId + " NO SETTLEMENT REPORTS FOUND");
			} else {
				if (getReportListResult.ReportInfo[0].ReportId) {
					log.info("For userId: " + UserId + " SettlementReportId: " + getReportListResult.ReportInfo[0].ReportId);
					getReports(getReportListResult.ReportInfo[0].ReportId, 4);
				} else {
					log.info("For userId: " + UserId + " No settlements report found");
				}
			}
		})
	} catch (err) {
		log.Info("For userID: " + UserId + " Error occured!! " + err);
	}
}


const requestReports = async(reportType) => {

	HelperReport.helper[reportType].forEach(async report => {

		const requestReportResult = await Report.requestReport(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, VERSION, report, SellerId, MWSAuthToken, startDate, endDate);

		handleRequestReportResult(requestReportResult, reportType);

	});

};

const requestReportStatus = async(reportRequestId, reportType) => {
	const requestReportStatusResult = await Report.getReportRequestList(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, VERSION, SellerId, MWSAuthToken, reportRequestId);
	log.info("For userId: " + UserId + " requestReport is successful " + requestReportStatusResult);
	handleRequestReportStatus(requestReportStatusResult, reportType);

};


const getReports = async(reportRequestId, reportType) => {
	const reportRes = await Report.getReport(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, VERSION, SellerId, MWSAuthToken, reportRequestId);
	switch (reportType) {
		case 0:
			exports.inventory = reportRes.data ? reportRes.data : reportRes
			break;
		case 1:
			exports.order = reportRes.data ? reportRes.data : reportRes;
			break;
		case 2:
			exports.performance = reportRes.data ? reportRes.data : reportRes;
			break;
		case 3:
			exports.amazonpay = reportRes.data ? reportRes.data : reportRes;
			break;
		case 4:
			exports.settlement = reportRes.data ? reportRes.data : reportRes;
			break;
	}

};


const handleRequestReportResult = (requestReportResult, reportType) => {

	try {
		if (requestReportResult.ReportRequestInfo.ReportRequestId) {
			HelperReport.requestIds[reportType].push(requestReportResult.ReportRequestInfo.ReportRequestId);
			log.info("For userId: " + UserId + " ReportRequestId: " + requestReportResult.ReportRequestInfo.ReportRequestId);
			setTimeout(function () {
				requestReportStatus(requestReportResult.ReportRequestInfo.ReportRequestId, reportType);
			}, 60000);
		}
	} catch (err) {
		log.info("For userId: " + UserId + "ERROR OCCURED!!! " + err)
	}
};

const handleRequestReportStatus = (requestReportStatusResult, reportType) => {

	if (!requestReportStatusResult.ReportRequestInfo.GeneratedReportId) {
		log.info("For userId: " + UserId + " No data is available for " + requestReportStatusResult.ReportRequestInfo.ReportType)
	} else {
		log.info("For userId: " + UserId + " GeneratedReportId: " + requestReportStatusResult.ReportRequestInfo.GeneratedReportId)
		getReports(requestReportStatusResult.ReportRequestInfo.GeneratedReportId, reportType);
	}
};


const generateReports = () => {

	if (true) {
		requestReports(0);
		requestReports(1);
		requestReports(2);
		requestReports(3);
		getReportList();
	};


}
