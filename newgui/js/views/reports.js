/**
 * Reports View
 * Displays various reports and analytics with export capabilities
 */

const ReportsView = {
    name: 'reports',
    
    render() {
        return `
            <div class="view-header">
                <div>
                    <h1>Reports & Analytics</h1>
                    <p class="text-secondary">Generate and view business reports</p>
                </div>
                <button class="btn btn-primary" onclick="ReportsView.scheduleReport()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    Schedule Report
                </button>
            </div>
            
            <div class="card" style="margin-bottom: 2rem;">
                <div class="card-header">
                    <h3>Quick Reports</h3>
                </div>
                <div class="card-body">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                        <div class="report-card" onclick="ReportsView.generateReport('transaction-summary')">
                            <div class="report-icon" style="background: var(--color-primary-light);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--color-primary)">
                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                                </svg>
                            </div>
                            <div>
                                <h4>Transaction Summary</h4>
                                <p class="text-secondary">Daily transaction volume and trends</p>
                            </div>
                        </div>
                        
                        <div class="report-card" onclick="ReportsView.generateReport('account-balances')">
                            <div class="report-icon" style="background: var(--color-success-light);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--color-success)">
                                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                                </svg>
                            </div>
                            <div>
                                <h4>Account Balances</h4>
                                <p class="text-secondary">Current balances across all accounts</p>
                            </div>
                        </div>
                        
                        <div class="report-card" onclick="ReportsView.generateReport('card-usage')">
                            <div class="report-icon" style="background: var(--color-warning-light);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--color-warning)">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                </svg>
                            </div>
                            <div>
                                <h4>Card Usage Report</h4>
                                <p class="text-secondary">Card transaction patterns and statistics</p>
                            </div>
                        </div>
                        
                        <div class="report-card" onclick="ReportsView.generateReport('customer-activity')">
                            <div class="report-icon" style="background: var(--color-info-light);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--color-info)">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                </svg>
                            </div>
                            <div>
                                <h4>Customer Activity</h4>
                                <p class="text-secondary">Customer engagement and behavior</p>
                            </div>
                        </div>
                        
                        <div class="report-card" onclick="ReportsView.generateReport('monthly-statement')">
                            <div class="report-icon" style="background: var(--color-danger-light);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--color-danger)">
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                    <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                                </svg>
                            </div>
                            <div>
                                <h4>Monthly Statement</h4>
                                <p class="text-secondary">Comprehensive monthly account statements</p>
                            </div>
                        </div>
                        
                        <div class="report-card" onclick="ReportsView.generateReport('fraud-detection')">
                            <div class="report-icon" style="background: #fee;">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="#c00">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                </svg>
                            </div>
                            <div>
                                <h4>Fraud Detection</h4>
                                <p class="text-secondary">Suspicious activity and fraud alerts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>Recent Reports</h3>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Type</th>
                                <th>Generated</th>
                                <th>Generated By</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Transaction Summary - May 2026</strong></td>
                                <td><span class="badge badge-primary">Transaction</span></td>
                                <td>2026-05-13 10:30 AM</td>
                                <td>Demo User</td>
                                <td><span class="badge badge-success">Completed</span></td>
                                <td>
                                    <button class="btn-icon" onclick="ReportsView.downloadReport('trans-may-2026')" title="Download">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </button>
                                    <button class="btn-icon" onclick="ReportsView.viewReport('trans-may-2026')" title="View">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Account Balances - Q2 2026</strong></td>
                                <td><span class="badge badge-success">Financial</span></td>
                                <td>2026-05-12 03:00 PM</td>
                                <td>System</td>
                                <td><span class="badge badge-success">Completed</span></td>
                                <td>
                                    <button class="btn-icon" onclick="ReportsView.downloadReport('bal-q2-2026')" title="Download">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </button>
                                    <button class="btn-icon" onclick="ReportsView.viewReport('bal-q2-2026')" title="View">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Card Usage Analysis - April 2026</strong></td>
                                <td><span class="badge badge-warning">Analytics</span></td>
                                <td>2026-05-01 09:00 AM</td>
                                <td>Admin User</td>
                                <td><span class="badge badge-success">Completed</span></td>
                                <td>
                                    <button class="btn-icon" onclick="ReportsView.downloadReport('card-apr-2026')" title="Download">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </button>
                                    <button class="btn-icon" onclick="ReportsView.viewReport('card-apr-2026')" title="View">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    generateReport(reportType) {
        Toast.show(`Generating ${reportType} report...`, 'info');
        setTimeout(() => {
            Toast.show('Report generated successfully!', 'success');
        }, 2000);
    },
    
    downloadReport(reportId) {
        Toast.show(`Downloading report ${reportId}...`, 'success');
    },
    
    viewReport(reportId) {
        Toast.show(`Opening report ${reportId}...`, 'info');
    },
    
    scheduleReport() {
        Toast.show('Schedule report form would open here', 'info');
    }
};

// Register the view
if (typeof window.Views !== 'undefined') {
    window.Views.reports = ReportsView;
}

// Made with Bob
