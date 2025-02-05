const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const Participant = require('./models/participant.model');
const Enrollment = require('./models/enrollment.model');
const Payment = require('./models/payment.model');
const Batch = require('./models/batch.model');


const app = express();
app.use(bodyParser.json());





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

app.post('/enroll', async (req, res) => {
    const { name, date_of_birth, contact_number, email, batch_id, month } = req.body;

    if (!name || !date_of_birth || !contact_number || !email || !batch_id || !month) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
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
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});