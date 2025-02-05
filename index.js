const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const Participant = require('./models/participant.model');
const Enrollment = require('./models/enrollment.model');
const Payment = require('./models/payment.model');
const Batch = require('./models/batch.model');
const cors = require("cors")
const moment = require('moment');


const app = express();
app.use(bodyParser.json());
app.use(cors())





const CompletePayment = (user, payment) => {
    return { status: 'success', transaction_id: 'txn123' };
};

async function insertDefaultBatches() {
    const batches = await Batch.findAll();
    if (batches.length === 0) {
        await Batch.bulkCreate([
            { batch_time: '6-7AM', capacity: 30 },
            { batch_time: '7-8AM', capacity: 30 },
            { batch_time: '8-9AM', capacity: 30 },
            { batch_time: '5-6PM', capacity: 30 },
        ]);
        console.log('Default batches inserted.');
    }
}

app.get('/', async (req, res) => {
    return res.send('Yoga Backend')
})

app.post('/enroll', async (req, res) => {
    const { name, date_of_birth, contact_number, email, batch_id, month } = req.body;


    try {
        if (!name || !date_of_birth || !contact_number || !email || !batch_id || !month) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const currentDate = moment();
        const dob = moment(date_of_birth, 'YYYY-MM-DD');
        const age = currentDate.diff(dob, 'years');

        if (age < 18 || age > 65) {
            return res.status(400).json({ error: 'Age must be between 18 and 65 to enroll.' });
        }

        const participant = await Participant.create({ name, date_of_birth, contact_number, email });

        const enrollment = await Enrollment.create({
            participant_id: participant.participant_id,
            batch_id,
            enrollment_month: month,
        });

        const payment = { participant_id: participant.participant_id, payment_for_month: month };
        const paymentResponse = CompletePayment(participant, payment);

        if (paymentResponse.status === 'success') {
            await Payment.create({
                participant_id: participant.participant_id,
                payment_date: new Date(),
                payment_for_month: month,
                payment_status: 'paid',
            });
            return res.status(200).json({ message: 'Enrollment and payment successful!' });
        } else {
            return res.status(400).json({ error: 'Payment failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


sequelize.sync({ force: true }).then(async () => {
    console.log('Database synced');
    await insertDefaultBatches();
    app.listen(5050, () => {
        console.log('Server is running on port 5050');
    });
});