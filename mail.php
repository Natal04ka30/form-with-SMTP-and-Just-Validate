
<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';
require 'vendor/autoload.php';

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'natala@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '********'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('tatarbeevanatala@gmail.com', 'TEST SITE'); // от кого будет уходить письмо?
$mail->addAddress('smakotina.natasha@mail.ru');     // Кому будет уходить письмо 
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment($_FILES['image']['tmp_name'], $_FILES['image']['name']);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Subject = 'Заявка с SMTP тестового сайта';

//пол
$gender = "Женщина";
if($_POST['gender']=="Мужчина") {
	$gender = "Мужчина";
}
//тело письма
$body = '<h1> The best letter!</h1>';

if(trim(!empty($_POST['name']))){
	$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['phone']))) {
	$body.='<p><strong>Phone number:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['gender']))) {
	$body.='<p><strong>Пол:</strong> '. $gender .'</p>';
}
if(trim(!empty($_POST['date']))) {
	$body.='<p><strong>Data:</strong> '.$_POST['date'].'</p>';
}
if(trim(!empty($_POST['url']))) {
	$body.='<p><strong>Пример:</strong> '.$_POST['url'].'</p>';
}
if(trim(!empty($_POST['age']))) {
	$body.='<p><strong>Age:</strong> '.$_POST['age'].'</p>';
}
if(trim(!empty($_POST['message']))) {
$body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
}


//прикрепить файл
if(!empty($_FILES['image']['tmp_name'])) {
	//путь загрузки файла
	$filePath = __DIR__."/files/".$_FILES['image']['name'];
	// грузим файл
if(copy($_FILES['image']['tmp_name'], $filePath)) {
	$fileAttach =$filePath;
	$body.='<p><strong>Photo in apps:</strong></p>';
	$mail->addAttachment($fileAttach);
	}
};

$mail->Body=$body;
$mail->AltBody = '';

if(!$mail->send()) {
	echo 'Error';
} else {
	echo 'Success';
}

