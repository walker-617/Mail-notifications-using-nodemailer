const express = require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv=require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const config=require("./config");

const email=process.env.EMAIL;
const pass_key=process.env.PASS_CODE;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: email,
    pass: pass_key,
  },
  secure: true,
});

app.post("/faculty_slot_cancel_mail", (req, res) => {
  const t_name=req.query.t_name;
  const s_mail=req.query.s_email;
  const day=req.query.day;
  const t_email=req.query.t_email;
  const time=req.query.time;
  const t_img=req.query.t_img;
  const mailData = {
    from: email,
    to: s_mail,
    subject: "Appointment cancelled",
    text: ("Unfortunately, your appointment with "+t_name+" on "+day+", "+time+" has been cancelled. Please consider looking for other available slots with this teacher."),
    html: `<div align='center' style="color: black">
    <h1 style='background-color:  black; color: white; padding: 10px'>Schedule Me</h1>
    <table style="border-spacing: 20px">
      <tr>
        <td>
          <img src=${t_img} alt="teacher image" style="border-radius: 100px; height: 75px">
        </td>
        <td style="text-align: left;">
          <span style="font-size: 15px; font-weight: bold;">${t_name}</span><br>
          <span>${t_email}</span>
        </td>
      </tr>
    </table>
    
    <p>Unfortunately, your appointment with <b>${t_name}</b> on <b>${day}</b>, <b>${time}</b> has been <b style="color: red">cancelled</b>. Please consider looking for other available slots with this teacher.</p>
  </div>`};
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200);
    res.send("mail sent :)");
  });
});

app.post("/student_waiting_active_mail", (req, res) => {
  const t_name=req.query.t_name;
  const s_mail=req.query.s_email;
  const day=req.query.day;
  const t_email=req.query.t_email;
  const time=req.query.time;
  const t_img=req.query.t_img;
  const mailData = {
    from: "schedule.me.nitc@gmail.com",
    to: s_mail,
    subject: "Appointment is active",
    text: ("Your appointment with "+t_name+" on "+day+", "+time+" is now updated from waiting to active. You can now make appointment with the teacher."),
    html: `<div align='center' style="color: black">
    <h1 style='background-color:  black; color: white; padding: 10px'>Schedule Me</h1>
    <table style="border-spacing: 20px">
      <tr>
        <td>
          <img src=${t_img} alt="teacher image" style="border-radius: 100px; height: 75px">
        </td>
        <td style="text-align: left;">
          <span style="font-size: 15px; font-weight: bold;">${t_name}</span><br>
          <span>${t_email}</span>
        </td>
      </tr>
    </table>  
    <p>Your appointment with <b>${t_name}</b> on <b>${day}</b>, <b>${time}</b> is now updated from <b style="color: blue">waiting</b> to <b style="color: green">active</b>. You can now make appointment with the teacher.</p>
  </div>`};
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200);
    res.send("mail sent :)");
  });
});

app.listen(5000, () => {
  console.log("App is live at port 5000");
});
