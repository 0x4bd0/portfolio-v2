<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';
$toAddress = "abdoumjr@gmail.com"; //To whom you are sending the mail.
$message   = $_POST['name'] . ' <br> ' . $_POST['email'] . ' <br> ' .  $_POST['subject'] . ' <br> ' . $_POST['message'];
$mail = new PHPMailer();
$mail->IsSMTP();
//$mail->SMTPDebug = 3; //Alternative to above constant
$mail->SMTPAuth    = true;
$mail->Host        = "smtp.gmail.com";
$mail->Port        = 587;
$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail

$mail->IsHTML(true);
$mail->Username = "abdoumjr2@gmail.com"; // your gmail address
$mail->Password = "king150663"; // password
$mail->SetFrom( $_POST['subject'], $_POST['name'].'From portfolio');
$mail->Subject = "portfolio contact"; // Mail subject
$mail->Body    = $message;
$mail->AddAddress($toAddress);
if (!$mail->Send()) {
    echo "Failed to send mail";
    
} else {
    echo "Mail sent succesfully";
}
?>