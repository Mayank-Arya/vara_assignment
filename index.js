const express = require('express');
const app = express();
const twilio = require('twilio');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTHTOKEN);
const whatsappNum = process.env.TWILIO_WHATSAPP_NUM;

const filePath = path.join(__dirname, 'water_usage_report.xlsx');

if (!fs.existsSync(filePath)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([['Date', 'Value']]);

    xlsx.utils.book_append_sheet(wb, ws, 'Data');
    xlsx.writeFile(wb, filePath);
}

app.post('/webhooks', (req, res) => {
    const incomingMsg = req.body.Body;
    const from = req.body.From;
    const date = new Date().toLocaleString();  

    if (incomingMsg.toLowerCase().includes('litres')) {
        const waterUsage = incomingMsg.match(/\d+/)[0];  

        const wb = xlsx.readFile(filePath);
        const ws = wb.Sheets['Data'];
        const new_row = { Date: date, Value: `${waterUsage} litres` };

        const new_row_data = [new_row.Date, new_row.Value];
        const ws_data = xlsx.utils.sheet_to_json(ws, { header: 1 });
        ws_data.push(new_row_data);
        const new_ws = xlsx.utils.aoa_to_sheet(ws_data);
        wb.Sheets['Data'] = new_ws;
        xlsx.writeFile(wb, filePath);

        client.messages.create({
            body: `Data received: ${waterUsage} litres on ${date}`,
            from: whatsappNum,
            to: from
        });
    } else {
        client.messages.create({
            body: `Please provide the water usage in litres (e.g., 200 litres).`,
            from: whatsappNum,
            to: from
        });
    }
    res.status(200).send('Success!');
});

setInterval(() => {
    client.messages.create({
        body: `Hello there, please send today's water usage report.`,
        from: whatsappNum,
        to: `whatsapp:+919389327562`  
    });
}, 300000); 

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
