<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // You can add validation and sanitization here if needed

    // Prepare the email message
    $to = "hamzarasheed89@gmail.com"; // Replace with the recipient's email address
    $subject = "New Message from $full_name";
    $message_body = "Full Name: $full_name\nEmail: $email\nMessage: $message";

    // Send the email
    $headers = "From: $email";

    if (mail($to, $subject, $message_body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Error sending the message. Please try again later.";
    }
}
?>