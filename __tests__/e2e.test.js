const app = require('../app')
const request = require('supertest')
require('dotenv').config()
const mongoose = require('mongoose')

let a1Cookie , a2Cookie, professorCookie, professorId, a1ChosenSlotId, a1AppointmentId, a2SlotId, a2AppointmentId

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI); 
}, 10000); // 

test('Student A1 authenticates to access the system', async () => {
    const res = await request(app)
        .post('/user/signin')
        .send({
            email: '1231231@gmail.com',
            password: '1231231'
        })

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBeDefined()
    expect(res.body.message.length).not.toBe(0)
    expect(res.body.message).toEqual('Sign in successful!')
    a1Cookie = res.headers['set-cookie'][0]
})

test('professor P1 authenticates to access the system', async () => {
    const res = await request(app)
        .post('/user/signin')
        .send({
            email: '123123@gmail.com',
            password: '123123'
        })

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBeDefined()
    expect(res.body.message.length).not.toBe(0)
    expect(res.body.message).toEqual('Sign in successful!')
    professorCookie = res.headers['set-cookie'][0]
})



test('Professor P1 specifies which time slots he is free for appointments', async () => {
    const res = await request(app)
                .post('/professor/slots')
                .set('cookie', professorCookie)
                .send({
                    date:'2025-07-11',
                    time: '15:30'
                })
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBeDefined()
    expect(res.body.message.length).not.toBe(0)
    expect(res.body.slot).toBeDefined()
    expect(res.body.slot.length).not.toBe(0)

    const res2 = await request(app)
                .post('/professor/slots')
                .set('cookie', professorCookie)
                .send({
                    date:'2025-07-11',
                    time: '16:00'
                })
    
    expect(res2.statusCode).toEqual(200)
    expect(res2.body.message).toBeDefined()
    expect(res2.body.message.length).not.toBe(0)
    expect(res2.body.slot).toBeDefined()
    expect(res2.body.slot.length).not.toBe(0)
    professorId = res2.body.slot.professorId
    // console.log(res2.body.slot.professorId)
})

test('Student A1 views available time slots for Professor P1', async () => {
    const res = await request(app)
                .get(`/student/professor/${professorId}/slots`)
                .set('cookie', a1Cookie)

    expect(res.statusCode).toEqual(200)
    expect(res.body.slots).toBeDefined()

    const slots = res.body.slots
    a1ChosenSlotId = slots[Math.floor(Math.random() * slots.length)]._id
})

test('Student A1 books an appointment with Professor P1 for time T1', async () => {
    const res  = await request(app)
                 .post(`/student/slots/${a1ChosenSlotId}/book`)
                 .set('cookie', a1Cookie)

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBeDefined()
    expect(res.body.message.length).not.toBe(0)
    expect(res.body.message).toEqual('Appointment booked successfully')
    expect(res.body.appointment).toBeDefined()
    expect(res.body.appointment.length).not.toBe(0)
    a1AppointmentId = res.body.appointment._id
})

test('Student A2 authenticates to access the system', async () => {
    const res = await request(app)
        .post('/user/signin')
        .send({
            email: '12312312@gmail.com',
            password: '12312312'
        })

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBeDefined()
    expect(res.body.message.length).not.toBe(0)
    expect(res.body.message).toEqual('Sign in successful!')
    a2Cookie = res.headers['set-cookie'][0]
})

test('Student A2 books an appointment with Professor P1 for time T2', async () => {
    const res = await request(app)
                .get(`/student/professor/${professorId}/slots`)
                .set('cookie', a2Cookie)

    expect(res.statusCode).toEqual(200)
    expect(res.body.slots).toBeDefined()

    const slots = res.body.slots
    a2ChosenSlotId = slots[Math.floor(Math.random() * slots.length)]._id

    const res2  = await request(app)
                 .post(`/student/slots/${a2ChosenSlotId}/book`)
                 .set('cookie', a2Cookie)

    expect(res2.statusCode).toEqual(200)
    expect(res2.body.message).toBeDefined()
    expect(res2.body.message.length).not.toBe(0)
    expect(res2.body.message).toEqual('Appointment booked successfully')
    expect(res2.body.appointment).toBeDefined()
    expect(res2.body.appointment.length).not.toBe(0)
    a2AppointmentId = res2.body.appointment._id
})

test('Professor P1 cancels the appointment with Student A1', async () => {
    const res = await request(app)
                .delete(`/professor/appointments/${a1AppointmentId}`)
                .set('cookie', professorCookie)

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBeDefined()
    expect(res.body.message.length).not.toBe(0)
    expect(res.body.message).toEqual('Appointment cancelled successfully')
    expect(res.body.deletedAppointment).toBeDefined()
    expect(res.body.deletedAppointment.length).not.toBe(0)
})

test('Student A1 checks their appointments and realizes they do not have any pending appointments', async () => {
    const res = await request(app)
                    .get('/student/appointments')
                    .set('Cookie', a1Cookie)

    expect(res.statusCode).toEqual(200)
    expect(res.body.appointments).toBeDefined()
    expect(res.body.appointments.length).toEqual(0)
})

afterAll(async () => {
    await mongoose.connection.close();
});


