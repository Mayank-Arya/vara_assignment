# Overview

The **WhatsApp Water Usage Bot** is a Node.js application that leverages the Twilio API to interact with users via WhatsApp. The bot is designed to collect daily water consumption reports from users and store the data in an Excel file. It also sends periodic reminders to ensure users submit their reports.

# Features

- **WhatsApp Messaging**: Send and receive messages through WhatsApp using Twilio.
- **Data Storage**: Record water consumption data in an Excel spreadsheet.
- **Automated Reminders**: Send periodic reminders to users to submit their daily water usage.

# Application Details

### Purpose

The bot is intended to:
1. **Track Daily Water Consumption**: Allow users to report their daily water usage in litres via WhatsApp.
2. **Store Data**: Maintain a log of water consumption data in an Excel file for record-keeping and analysis.
3. **Engage Users**: Periodically remind users to report their water consumption, helping them stay on track with their hydration goals.

### How It Works

1. **Initialization**:
   - Upon startup, the application checks for the existence of an Excel file (\`water_usage_report.xlsx\`). If the file does not exist, it creates one with headers \`Date\` and \`Value\`.

2. **Receiving Messages**:
   - The application listens for incoming WhatsApp messages at the \`/webhooks\` endpoint.
   - When a message is received, it is processed to check if it contains water usage data.
   - If the message includes a valid water usage value (in litres), the data is appended to the Excel file along with the current date.
   - A confirmation message is sent back to the user.

   ![Receiving Messages](images/data%20received.jpeg)

3. **Prompting Users**:
   - If the incoming message does not contain valid data, the bot sends a prompt asking the user to provide their water consumption in the correct format.

   ![Prompting Users](images/pls%20provide.jpeg)

4. **Sending Reminders**:
   - The application sends periodic reminders (every 30 seconds for testing) to a predefined WhatsApp number to submit their daily water usage. This interval can be adjusted for production use.

   ![Sending Reminders](images/today%20usage.jpeg)

### Components

- **Server**: An Express.js server that handles incoming POST requests from Twilio and interacts with the Excel file.
- **Twilio Client**: Utilizes Twilio’s API to send and receive WhatsApp messages.
- **Excel Handling**: Uses the \`xlsx\` library to read and write data to an Excel file.
- **Environment Variables**: Configured using the \`dotenv\` library to securely manage sensitive information like Twilio credentials and port numbers.

# How to Use

1. **Initial Interaction**:
   - When a user first interacts with the bot, they will receive a prompt asking them to submit their daily water usage.

2. **Reporting Data**:
   - Users reply with their water consumption in litres (e.g., "200 litres").
   - The bot processes this data, logs it in the Excel file, and sends a confirmation message.

3. **Receiving Reminders**:
   - Users will receive periodic reminders to submit their water usage report. Adjust the reminder interval as needed for production.

# Contact

For any questions or issues, please contact [ma8183468@gmail.com](mailto:ma8183468@gmail.com)
