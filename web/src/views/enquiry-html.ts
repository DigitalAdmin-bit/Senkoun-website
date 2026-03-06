
const enquiryHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New General Enquiry</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #ffffff;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
        }
        .header {
            background-color: #4a6f52;
            padding: 30px;
            border-bottom: 3px solid #B8853A;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: normal;
            letter-spacing: 0.5px;
        }
        .content {
            padding: 40px 30px;
            background-color: #ffffff;
        }
        .notification-label {
            background-color: #4a6f52;
            color: #ffffff;
            padding: 6px 16px;
            display: inline-block;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 25px;
        }
        .message {
            color: #64565A;
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 30px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background-color: #ffffff;
            border: 2px solid #B8853A;
        }
        .details-table td {
            padding: 15px 20px;
            border-bottom: 1px solid #e0e0e0;
        }
        .details-table tr:last-child td {
            border-bottom: none;
        }
        .detail-label {
            color: #4a6f52;
            font-weight: bold;
            font-size: 13px;
            width: 140px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .detail-value {
            color: #64565A;
            font-size: 14px;
        }
        .detail-value a {
            color: #4a6f52;
            text-decoration: underline;
        }
        .message-box {
            background-color: #f5f0e6;
            border: 1px solid #B8853A;
            padding: 20px;
            margin: 30px 0;
        }
        .message-box-label {
            color: #4a6f52;
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }
        .message-box-content {
            color: #64565A;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .action-section {
            background-color: #f5f0e6;
            border: 1px solid #B8853A;
            border-left: 4px solid #B8853A;
            padding: 20px 25px;
            margin: 30px 0;
        }
        .action-section p {
            margin: 0;
            color: #64565A;
            font-size: 13px;
            line-height: 1.6;
        }
        .action-section strong {
            color: #4a6f52;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
        .footer {
            background-color: #f5f0e6;
            padding: 25px 30px;
            text-align: center;
            border-top: 3px solid #B8853A;
        }
        .footer p {
            color: #64565A;
            font-size: 12px;
            margin: 8px 0;
            line-height: 1.6;
        }
        .footer-brand {
            font-weight: bold;
            font-size: 14px;
            color: #4a6f52;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        .timestamp {
            color: #9ca3af;
            font-size: 11px;
            margin-top: 20px;
            font-style: italic;
        }
        hr {
            border: none;
            border-top: 1px solid #e0e0e0;
            margin: 25px 0;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            .header {
                padding: 25px 20px;
            }
            .header h1 {
                font-size: 20px;
            }
            .details-table td {
                display: block;
                width: 100%;
            }
            .detail-label {
                width: 100%;
                padding-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>New General Enquiry</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="notification-label">New Enquiry Notification</div>
            
            <p class="message">
                A new general enquiry has been submitted through your website. 
                Please review the contact details below and respond to the client accordingly.
            </p>

            <!-- Details Table -->
            <table class="details-table">
                <tr>
                    <td class="detail-label">Enquiry Type:</td>
                    <td class="detail-value">{type}</td>
                </tr>
                <tr>
                    <td class="detail-label">Home:</td>
                    <td class="detail-value">{home}</td>
                </tr>
                <tr>
                    <td class="detail-label">First Name:</td>
                    <td class="detail-value">{first_name}</td>
                </tr>
                <tr>
                    <td class="detail-label">Last Name:</td>
                    <td class="detail-value">{last_name}</td>
                </tr>
                <tr>
                    <td class="detail-label">Email Address:</td>
                    <td class="detail-value">
                        <a href="mailto:{email}">{email}</a>
                    </td>
                </tr>
                <tr>
                    <td class="detail-label">Phone Number:</td>
                    <td class="detail-value">
                        <a href="tel:{phone}">{phone}</a>
                    </td>
                </tr>
            </table>

            <!-- Message Box -->
            <div class="message-box">
                <div class="message-box-label">Message:</div>
                <div class="message-box-content">{message}</div>
            </div>

            <!-- Action Section -->
            <div class="action-section">
                <p>
                    <strong>Recommended Action:</strong><br>
                    It is recommended to contact this potential client within 24 hours to address their enquiry 
                    and provide the information they have requested.
                </p>
            </div>

            <hr>

            <p class="timestamp">
                This is an automated notification from your Senkoun Healthcare website system.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-brand">Senkoun Healthcare</p>
            <p>Providing Excellence in Care</p>
            <p style="margin-top: 15px;">
                This email was automatically generated in response to an enquiry form 
                submitted on your website.
            </p>
        </div>
    </div>
</body>
</html>
`

export default enquiryHTML

