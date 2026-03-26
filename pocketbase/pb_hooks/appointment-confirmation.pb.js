/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "clinicafisioterapiaforma@gmail.com" }],
    subject: "New Appointment Request from " + e.record.get("fullName"),
    html: "<h2>New Appointment Request</h2>" +
          "<p><strong>Name:</strong> " + e.record.get("fullName") + "</p>" +
          "<p><strong>Email:</strong> " + e.record.get("email") + "</p>" +
          "<p><strong>Phone:</strong> " + e.record.get("phone") + "</p>" +
          "<p><strong>Service:</strong> " + e.record.get("service") + "</p>" +
          "<p><strong>Preferred Date:</strong> " + e.record.get("preferredDate") + "</p>" +
          (e.record.get("preferredTime") ? "<p><strong>Preferred Time:</strong> " + e.record.get("preferredTime") + "</p>" : "") +
          (e.record.get("message") ? "<p><strong>Message:</strong><br>" + e.record.get("message") + "</p>" : "") +
          "<p><strong>Appointment ID:</strong> " + e.record.id + "</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "appointments");