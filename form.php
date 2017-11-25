<?php


    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $housing = $_POST['housing'];
    $room = $_POST['room'];
    $floor = $_POST['floor'];
    $comment = $_POST['comment'];
    $payment = $_POST['payment'];
    $callback = $_POST['callback'];
   $callback = isset($callback) ? 'Не перезванивать' : 'Перезвонить';

   $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ на доставку</h2>
            <ul>
                <li> Имя клиента: ' . $name . '</li>
                <li> Телефон: ' . $phone . '</li>
                <li> Улица: ' . $street . '</li>
                <li> Дом: ' . $house . '</li>
                <li> Строение: ' . $housing . '</li>
                <li> Квартира: ' . $room . '</li>
                <li> Этаж: ' . $floor . '</li>
                <li> Комментарий к заказу: ' . $comment . '</li>
                <li> Способ платежа: ' . $payment . '</li>
                <li> Обратный звонок: ' . $callback . '</li>
            </ul>
        </body>
    </html>
    ';

    $headers = "From: Администратор сайта <dmitry.gorelko@yandex.ru>\r\n".
    "MIME-Version: 1.0\r\n" .
    "Content-type: text/html; charset=UTF-8\r\n";

    $mail = mail("dmitry.gorelko@yandex.ru", "Заказ", $mail_message, $headers);

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "ERROR";
        $data['mes'] = "На сервере произошла ошибка";
    }

    echo json_encode($data);

?>